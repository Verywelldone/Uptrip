package uptrip.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uptrip.exception.AuthorizationException;
import uptrip.model.user.ERole;
import uptrip.model.user.Role;
import uptrip.model.user.User;
import uptrip.model.user.UserInfo;
import uptrip.repository.RoleRepository;
import uptrip.repository.UserInfoRepository;
import uptrip.repository.UserRepository;
import uptrip.security.UserDetailsImpl;
import uptrip.security.jwt.JwtUtils;
import uptrip.security.jwt.request.LoginRequest;
import uptrip.security.jwt.request.SignupRequest;
import uptrip.security.jwt.response.JwtResponse;
import uptrip.security.jwt.response.MessageResponse;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static uptrip.exception.AuthorizationException.*;

@Service
@Slf4j
@AllArgsConstructor
public class AuthService {


    AuthenticationManager authenticationManager;
    UserRepository userRepository;
    RoleRepository roleRepository;
    PasswordEncoder encoder;
    JwtUtils jwtUtils;
    UserInfoRepository userInfoRepository;

    @NotNull
    private static String getFormattedCurrentDate() {
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy hh:mm");
        return format.format(new Date());
    }

    public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {

        var authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();

        User user = userRepository.findUserById(userDetails.getId());

        log.info("User metadata: {}", user.getUserMetadata().toString());

        if (user.getUserMetadata().isBanned()) {
            log.info("User is banned");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new MessageResponse("User is banned"));
        }

        user.getUserMetadata().setLastLogin(getFormattedCurrentDate());
        userRepository.save(user);

        log.info("User last login updated");
        return ResponseEntity.ok(
                new JwtResponse(
                        jwt,
                        userDetails.getId(),
                        userDetails.getUsername(),
                        userDetails.getEmail(),
                        roles
                )
        );
    }

    public ResponseEntity<?> registerUser(SignupRequest signUpRequest) {
        log.debug("Register request: {}", signUpRequest.toString());

        try {
            validateSignUpRequest(signUpRequest);
        } catch (AuthorizationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse(e.getMessage()));
        }

        log.info("Creating user account with username: {}", signUpRequest.getUsername());
        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();


        if (strRoles == null) {
            log.info("Role is null, setting role to user");
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException(ROLE_NOT_FOUND_MESSAGE + ": " + ERole.ROLE_USER));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                if ("admin".equals(role)) {
                    log.info("Role is admin, setting role to admin");
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException(ROLE_NOT_FOUND_MESSAGE + ": " + role));
                    roles.add(adminRole);
                } else {
                    log.info("Role is user, setting role to user");
                    Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException(ROLE_NOT_FOUND_MESSAGE + ": " + role));
                    roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);


        UserInfo userInfo = new UserInfo();
        user.setUserInfo(userInfo);
        userInfo.setUser(user);

        user.getUserMetadata().setUser(user);

        log.info("Saving user");
        userInfoRepository.save(userInfo);
        userRepository.save(user);

        log.info("User registered successfully");
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @Nullable
    private void validateSignUpRequest(SignupRequest signUpRequest) throws AuthorizationException {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            log.info("Username is already taken");
            throw new AuthorizationException(USERNAME_ALREADY_IN_USE_MESSAGE);
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            log.info("Email is already in use");
            throw new AuthorizationException(EMAIL_ALREADY_IN_USE_MESSAGE);
        }
    }
}
