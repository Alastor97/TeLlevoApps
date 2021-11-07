import { Component, OnInit, ViewChild} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { stringify } from 'querystring';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {
    // rescato desde el html el input #username
    @ViewChild ('username') user;
    // rescato desde el html el input #password
    @ViewChild ('password1') password1;
    // rescato desde el html el input #password
    @ViewChild ('password2') password2;

    usuario: string;
    password: string;

  constructor(private router: Router, private route: ActivatedRoute, public alertController: AlertController){
    this.route.queryParams.subscribe(data => {
      this.usuario = data.usuario
    })
  }

  async datosNoCoincidentes(){

    const alert = await this.alertController.create({
      header: 'ERROR',
      message: 'Las contaseñas no coinciden',
      buttons: ['OK']
    });

    await alert.present();
  }

  async usuarioNoExiste(){

    const alert = await this.alertController.create({
      header: 'ERROR',
      message: 'El usuario no existe',
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

  restablecer(){

    if(this.user.value == '' || this.password1.value == ''|| this.password2.value == ''){

      this.datosEnBlanco();

    } else if(this.user.value != this.usuario){

      this.usuarioNoExiste();

    } else if(this.password1.value != this.password2.value){

      this.datosNoCoincidentes();

    } else {

      this.router.navigate(['../login'],{
        queryParams:{
          password: this.password1.value,
          pass: true
        }
      });
    }
  }

  ngOnInit() {
  }
}
