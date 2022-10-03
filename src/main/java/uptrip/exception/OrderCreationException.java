package uptrip.exception;


public class OrderCreationException extends Throwable {

    public static final String PRODUCT_NOT_FOUND_MESSAGE = "Product not found";
    public static final String PRODUCT_STOCK_NOT_AVAILABLE_MESSAGE = "Product quantity is not available";

    public OrderCreationException(String errorMessage) {
        super(errorMessage);
    }
}
