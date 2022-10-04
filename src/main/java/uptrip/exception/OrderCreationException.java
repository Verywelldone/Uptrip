package uptrip.exception;


public class OrderCreationException extends Exception {

    public static final String PRODUCT_NOT_FOUND_MESSAGE = "Product not found. Please retry.";
    public static final String PRODUCT_STOCK_NOT_AVAILABLE_MESSAGE = "Product quantity is not available. Please refresh the page and try again";

    public OrderCreationException(String errorMessage) {
        super(errorMessage);
    }
}
