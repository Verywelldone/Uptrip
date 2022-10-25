import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AuthControllerService } from './api/authController.service';
import { BasicErrorControllerService } from './api/basicErrorController.service';
import { OrderControllerService } from './api/orderController.service';
import { ProductControllerService } from './api/productController.service';
import { RatingSystemControllerService } from './api/ratingSystemController.service';
import { ResourceControllerService } from './api/resourceController.service';
import { ServertestService } from './api/servertest.service';
import { UserControllerService } from './api/userController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AuthControllerService,
    BasicErrorControllerService,
    OrderControllerService,
    ProductControllerService,
    RatingSystemControllerService,
    ResourceControllerService,
    ServertestService,
    UserControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
