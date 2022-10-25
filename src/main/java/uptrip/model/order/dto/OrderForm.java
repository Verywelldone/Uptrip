package uptrip.model.order.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderForm {
    private List<OrderProductDto> orderProducts;
    private String totalPrice;

    private String email;
    private String firstName;
    private String lastName;
    private String address;
    private String address2;

    private String phoneNo;
    private String city;
    private String postalCode;

    private boolean saveAddress;
}
