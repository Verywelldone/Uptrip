package uptrip.model.order;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import uptrip.model.user.User;

import javax.persistence.*;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Order {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @Transient
    private UUID uuid = UUID.randomUUID();

    @Column
    private String dateCreated;

    @Enumerated(EnumType.STRING)
    private EOrderStatus orderStatus;

    @Valid
    @OneToMany(mappedBy = "pk.order")
    private List<OrderProduct> orderProducts = new ArrayList<>();

    @Column
    private String totalPrice;

    @Column
    private String lastStatusUpdate;

    @ManyToOne
    @JsonIgnore
    private User user;


}
