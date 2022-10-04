export * from './authController.service';
import { AuthControllerService } from './authController.service';
export * from './basicErrorController.service';
import { BasicErrorControllerService } from './basicErrorController.service';
export * from './orderController.service';
import { OrderControllerService } from './orderController.service';
export * from './resourceController.service';
import { ResourceControllerService } from './resourceController.service';
export const APIS = [AuthControllerService, BasicErrorControllerService, OrderControllerService, ResourceControllerService];
