package uptrip.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import uptrip.model.user.*;
import uptrip.repository.RoleRepository;
import uptrip.repository.UserInfoRepository;
import uptrip.repository.UserProfileImageRepository;
import uptrip.repository.UserRepository;
import uptrip.security.UserDetailsImpl;
import uptrip.security.jwt.JwtUtils;
import uptrip.security.jwt.request.LoginRequest;
import uptrip.security.jwt.request.SignupRequest;
import uptrip.security.jwt.response.JwtResponse;
import uptrip.security.jwt.response.MessageResponse;

import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
@Slf4j
public class AuthController {
    AuthenticationManager authenticationManager;
    UserRepository userRepository;
    RoleRepository roleRepository;
    PasswordEncoder encoder;
    JwtUtils jwtUtils;
    UserInfoRepository userInfoRepository;
    UserProfileImageRepository userProfileImageRepository;

    @NotNull
    private static String getFormattedCurrentDate() {
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy hh:mm");
        return format.format(new Date());
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        log.info("Login request: {}", loginRequest);

        var authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        log.info("Authentication: {}", authentication);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();

        User user = userRepository.findUserById(userDetails.getId());

        if (user.getUserMetadata().getIsBanned()) {
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
                        roles,
                        user.getUserInfo(),
                        user.getUserMetadata()
                )
        );

    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        log.info("Register request: {}", signUpRequest);

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            log.info("Username is already taken");
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            log.info("Email is already in use");
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
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
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                if ("admin".equals(role)) {
                    log.info("Role is admin, setting role to admin");
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(adminRole);
                } else {
                    log.info("Role is user, setting role to user");
                    Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);

        UserInfo userInfo = signUpRequest.getUserInfo();
        UserProfileImage userProfileImage = new UserProfileImage();

        userProfileImage.setUserInfo(userInfo);
        userInfo.setProfileImage(userProfileImage);


        userInfo.setUser(user);
        user.setUserInfo(userInfo);
        user.getUserMetadata().setUser(user);
        user.getUserMetadata().setIsBanned(false);
        user.getUserMetadata().setCreatedAt(getFormattedCurrentDate());
        user.getUserMetadata().setIsConfirmed(false);

        log.info("Saving user");
        userProfileImageRepository.save(userProfileImage);
        userInfoRepository.save(userInfo);
        userRepository.save(user);

        log.info("User registered successfully");
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
