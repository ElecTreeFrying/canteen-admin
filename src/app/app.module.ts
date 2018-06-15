import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppProviderModule } from './app-provider.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    AppProviderModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
