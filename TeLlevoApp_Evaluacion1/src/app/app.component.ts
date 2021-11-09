import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx'; //NO FUNCIONA
//import { StatusBar } from '@ionic-native/status-bar/ngx'; // NO FUNCIONA
import { SQLiteObject , SQLite } from '@ionic-native/sqlite/ngx'; // TOMA LA LIBRERIA PERO NO MUESTRA LA PAGINA

import { DbtaskService } from './services/dbtask.service';
import { AuthenticationService } from '../app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform, 
    //private splashScreen: SplashScreen, // NO FUNCIONA
    //private statusBar: StatusBar, // NO FUNCIONA
    public DbtaskService: DbtaskService, 
    //public sqlite: SQLite, // NO FUNCIONA
    //public authenticationService:AuthenticationService, 
    public router: Router

  ) {}

  
}
