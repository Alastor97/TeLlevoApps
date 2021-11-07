import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { TouchSequence } from 'selenium-webdriver';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // rescato desde el html el input #username
  @ViewChild ('username') user;
  // rescato desde el html el input #password
  @ViewChild ('password') password;

  nuevaPass: boolean;
  passNueva: string;
  /*
  data = [
    {user: 'juancarlos0000', password: '123456'},
    {user: 'joserivas', password: 'megu'}
  ]*/
  
  data: any = {
    user: 'juancarlos00',
    password: '123456'
  };
  

  constructor(private router: Router, private route: ActivatedRoute, public alertController: AlertController) {
    
    this.route.queryParams.subscribe(data => {
      this.nuevaPass = data.pass
      this.passNueva = String(data.password)
    });
    if(this.nuevaPass){
      this.data.password = this.passNueva;
      this.nuevaPass = false;
      //console.log("this.data.password");
    } 
  }

  async datosIncorrectos(){

    const alert = await this.alertController.create({
      header: 'ERROR',
      message: 'Los datos ingresados son incorrectos',
      buttons: ['OK']
    });

    await alert.present();
  }

  async datosEnBlanco(){

    const alert = await this.alertController.create({
      header: 'ERROR',
      message: 'Algunos datos están en blanco',
      buttons: ['OK']
    });

    await alert.present();
  }
  
  login(){
    if(this.user.value==this.data.user && (this.password.value==this.data.password || this.passNueva==this.password.value)){
      // ingreso de usuario y pasar parametros de usuario
      this.router.navigate(['../perfil-user'],{queryParams:{
        usuario:this.user.value
      }});
    }else if(this.user.value == '' || this.password.value == ''){
      this.datosEnBlanco();
    } else {
      this.datosIncorrectos();
    }
    console.log(this.nuevaPass)
    console.log(this.passNueva);
    console.log(this.data.password);
  }
  
  restablecer() {
    
    this.router.navigate(['../restablecer'],{
      queryParams:{
        usuario: this.data.user,
        password: this.data.password
      }
    });
  }

  ngOnInit() {
   
  }

}

