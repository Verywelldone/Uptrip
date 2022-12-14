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
import { User } from './user';

export interface UserInfo { 
    address?: string;
    city?: string;
    firstName?: string;
    id?: number;
    lastName?: string;
    phoneNumber?: string;
    user?: User;
}