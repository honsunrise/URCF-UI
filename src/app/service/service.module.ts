import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentService} from './content/content.service';
import {AccountService} from './account/account.service';
import {EmbedVideoService} from './embed-video/embed-video.service';
import {MessageService} from './message/message.service';
import {CopierService} from './copier/copier.service';
import {SplashScreenService} from './splash/splash-screen.service';
import {UploadService} from './upload/upload.service';
import {UserService} from './user/user.service';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth.guard.service';

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => localStorage.getItem('auth_token'),
    whitelistedDomains: ['127.0.0.1:8080', '127.0.0.1:8081', '127.0.0.1:8085',
      '69.30.199.90:8080', '69.30.199.90:8081', '69.30.199.90:8085'],
  };
}

@NgModule({
  imports: [
    CommonModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      }
    })
  ],
  providers: [
    ContentService,
    AccountService,
    EmbedVideoService,
    MessageService,
    CopierService,
    SplashScreenService,
    UploadService,
    UserService,
    AuthGuard,
    AuthService
  ],
  declarations: []
})
export class ServiceModule {
}
