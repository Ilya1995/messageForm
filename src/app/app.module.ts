import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';
import { RecaptchaModule } from 'ng-recaptcha';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, TextMaskModule, RecaptchaModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
