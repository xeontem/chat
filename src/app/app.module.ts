import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AuthFormComponent } from './auth-form.component';
import { MainAppComponent } from './main-app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

// use asterisk to provide for angular ability to tree shake the dependencies
import * as All from '@angular/fire';
import * as AllFS from '@angular/fire/firestore';



import { environment } from '../environments/environment';
import { authReducer, metaReducers } from '../store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    AuthFormComponent,
    MainAppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    // material UI
    MatListModule,
    MatButtonModule,

    // firebase
    All.AngularFireModule.initializeApp(environment.firebase),
    AllFS.AngularFirestoreModule,

    // ngrx
    StoreModule.forRoot({
      authReducer,
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
