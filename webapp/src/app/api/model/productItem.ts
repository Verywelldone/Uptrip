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
import { ProductCategory } from './productCategory';

export interface ProductItem { 
    description?: string;
    id?: number;
    image?: string;
    name?: string;
    price?: number;
    productCategory?: ProductCategory;
    quantity?: number;
    stock?: number;
}