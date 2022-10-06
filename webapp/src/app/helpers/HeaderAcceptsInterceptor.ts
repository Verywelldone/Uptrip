import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthInterceptor} from "../services/auth/auth.interceptor";

@Injectable()
export class HeaderAcceptsInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Workaround for this bug in swagger generated code: https://github.com/swagger-api/swagger-codegen/issues/8399
    if (request.headers.get('Accept') === 'json' && request.responseType !== 'text') {
      // console.debug(`Changed responseType from '${request.responseType}' to 'text' for url ${request.url}`);
      request = request.clone({ responseType: 'text' });
    }

    return next.handle(request);
  }


}
export const headerAcceptInterceptor = [
  {provide: HTTP_INTERCEPTORS, useClass: HeaderAcceptsInterceptor, multi: true}
];
