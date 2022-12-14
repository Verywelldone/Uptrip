/**
 * MyApp Rest APIs
 * APIs for MyApp.
 *
 * OpenAPI spec version: 1.0
 * Contact: test@emaildomain.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { OrderProduct } from './orderProduct';

export interface Order { 
    dateCreated?: string;
    id?: number;
    orderProducts?: Array<OrderProduct>;
    orderStatus?: Order.OrderStatusEnum;
    totalPrice?: string;
}
export namespace Order {
    export type OrderStatusEnum = 'APPROVED' | 'CANCELED' | 'DELIVERED' | 'PENDING' | 'REFUNDED';
    export const OrderStatusEnum = {
        APPROVED: 'APPROVED' as OrderStatusEnum,
        CANCELED: 'CANCELED' as OrderStatusEnum,
        DELIVERED: 'DELIVERED' as OrderStatusEnum,
        PENDING: 'PENDING' as OrderStatusEnum,
        REFUNDED: 'REFUNDED' as OrderStatusEnum
    };
}