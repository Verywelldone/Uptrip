package uptrip.model.order;

public enum EOrderStatus {

    PENDING("Order is pending"),
    APPROVED("Order is approved"),
    CANCELED("Order is canceled"),
    DELIVERED("Order is delivered"),
    REFUNDED("Order is refunded");

    EOrderStatus(String s) {
    }
}

