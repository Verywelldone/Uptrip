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
 *//* tslint:disable:no-unused-variable member-ordering */

import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs';

import {OrderForm} from '../model/orderForm';
import {OrderReq} from '../model/orderReq';
import {OrderRes} from '../model/orderRes';

import {BASE_PATH} from '../variables';
import {Configuration} from '../configuration';


@Injectable()
export class OrderControllerService {

  protected basePath = 'http://localhost:8080';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }


  /**
   * create
   *
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createUsingPOST(body?: OrderForm, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public createUsingPOST(body?: OrderForm, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public createUsingPOST(body?: OrderForm, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public createUsingPOST(body?: OrderForm, observe: any = 'body', reportProgress: boolean = false): Observable<any> {


    let headers = this.defaultHeaders;

    // authentication (Authorization) required
    if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
      headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<any>('post', `${this.basePath}/api/orders/create`,
      {
        body: body,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * delete
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteUsingDELETE(id: number, observe?: 'body', reportProgress?: boolean): Observable<string>;
  public deleteUsingDELETE(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
  public deleteUsingDELETE(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
  public deleteUsingDELETE(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling deleteUsingDELETE.');
    }

    let headers = this.defaultHeaders;

    // authentication (Authorization) required
    if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
      headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<string>('delete', `${this.basePath}/api/orders/delete/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * getAllByCustomerAndStatus
   *
   * @param id id
   * @param status status
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAllByCustomerAndStatusUsingGET(id: number, status: string, observe?: 'body', reportProgress?: boolean): Observable<Array<OrderRes>>;
  public getAllByCustomerAndStatusUsingGET(id: number, status: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<OrderRes>>>;
  public getAllByCustomerAndStatusUsingGET(id: number, status: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<OrderRes>>>;
  public getAllByCustomerAndStatusUsingGET(id: number, status: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getAllByCustomerAndStatusUsingGET.');
    }

    if (status === null || status === undefined) {
      throw new Error('Required parameter status was null or undefined when calling getAllByCustomerAndStatusUsingGET.');
    }

    let headers = this.defaultHeaders;

    // authentication (Authorization) required
    if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
      headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<Array<OrderRes>>('get', `${this.basePath}/api/orders/get/user/${encodeURIComponent(String(id))}/status/${encodeURIComponent(String(status))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * getAllByCustomer
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAllByCustomerUsingGET(id: number, observe?: 'body', reportProgress?: boolean): Observable<Array<OrderRes>>;
  public getAllByCustomerUsingGET(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<OrderRes>>>;
  public getAllByCustomerUsingGET(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<OrderRes>>>;
  public getAllByCustomerUsingGET(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getAllByCustomerUsingGET.');
    }

    let headers = this.defaultHeaders;

    // authentication (Authorization) required
    if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
      headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<Array<OrderRes>>('get', `${this.basePath}/api/orders/get/user/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * getAll
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAllUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<OrderRes>>;
  public getAllUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<OrderRes>>>;
  public getAllUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<OrderRes>>>;
  public getAllUsingGET(observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    let headers = this.defaultHeaders;

    // authentication (Authorization) required
    if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
      headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<Array<OrderRes>>('get', `${this.basePath}/api/orders/get`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * getOne
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getOneUsingGET(id: number, observe?: 'body', reportProgress?: boolean): Observable<OrderRes>;
  public getOneUsingGET(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrderRes>>;
  public getOneUsingGET(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrderRes>>;
  public getOneUsingGET(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getOneUsingGET.');
    }

    let headers = this.defaultHeaders;

    // authentication (Authorization) required
    if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
      headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<OrderRes>('get', `${this.basePath}/api/orders/get/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * update
   *
   * @param id id
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateUsingPUT(id: number, body?: OrderReq, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public updateUsingPUT(id: number, body?: OrderReq, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public updateUsingPUT(id: number, body?: OrderReq, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public updateUsingPUT(id: number, body?: OrderReq, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling updateUsingPUT.');
    }


    let headers = this.defaultHeaders;

    // authentication (Authorization) required
    if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
      headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<any>('put', `${this.basePath}/api/orders/update/${encodeURIComponent(String(id))}`,
      {
        body: body,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

}
