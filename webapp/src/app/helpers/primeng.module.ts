import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from "primeng/checkbox";
import {SharedModule} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";

import {SelectButtonModule} from 'primeng/selectbutton';

@NgModule({
  declarations: [],
  imports: [ToastModule, CommonModule, ButtonModule, RippleModule, InputTextModule, CheckboxModule, SharedModule,SelectButtonModule],
  exports: [
    SharedModule,
    CommonModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    CheckboxModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    SelectButtonModule
  ]
})
export class PrimengModule {
}
