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
import { ProductItem } from './productItem';

export interface ProductCategory { 
    description?: string;
    id?: number;
    name?: string;
    productItemList?: Array<ProductItem>;
}