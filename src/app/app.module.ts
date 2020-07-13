import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

// use asterisk to provide for angular ability to tree shake the dependencies
import * as All from '@angular/fire';
import * as AllFS from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';



import { AppComponent } from './app.component';
import { AuthFormComponent } from './auth-form.component';
import { MainAppComponent } from './main-app.component';
import { LeftContainerComponent } from './left-container.component';
import { RightContainerComponent } from './right-container.component';
import { TabsComponent } from './tabs.component';
import { RoomsComponent } from './rooms.component';
import { RoomInfoComponent } from './room-info.component';
import { ChatInfoComponent } from './chat-info.component';
import { MainChatComponent } from './main-chat.component';
import { ChatInputComponent } from './chat-input.component';
import { ChatsComponent } from './chats.component';



import { environment } from '../environments/environment';
import { authReducer } from '../store/reducers';
import { sideNavReducer } from '../store/reducers/side-nav.reducer';
import { userChatsReducer } from '../store/reducers/user-chats.reducer';

@NgModule({
  declarations: [
    AppComponent,
    AuthFormComponent,
    MainAppComponent,
    LeftContainerComponent,
    RightContainerComponent,
    TabsComponent,
    RoomsComponent,
    RoomInfoComponent,
    ChatInfoComponent,
    MainChatComponent,
    ChatInputComponent,
    ChatsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    // material UI
    MatListModule,
    MatButtonModule,
    MatTabsModule,
    MatSidenavModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,

    // firebase
    All.AngularFireModule.initializeApp(environment.firebase),
    AllFS.AngularFirestoreModule,

    // ngrx
    StoreModule.forRoot({
      authReducer,
      sideNavReducer,
      userChatsReducer,
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [AngularFireFunctions],
  bootstrap: [AppComponent]
})
export class AppModule { }
