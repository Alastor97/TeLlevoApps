import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import {DbtaskService} from '../services/dbtask.service' // SERVICIOS DE LA DBTASK


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false); // CREA UN SUJETO AL CUAL VAN A OBSERVAR Y ACTUALIZAR VALOR BOOLEANO

  constructor(
    private router: Router,
    private storage: Storage,
    public DbtaskService: DbtaskService,
    public toastController: ToastController
  ) {
    this.isLogged
  }
  
  isLogged(){
    this.storage.get("USER_DATA").then(response=>{
      console.log(response)
      if(response!=null){
        this.authState.next(true);
      }
    })
  }// TERMINA ISLLOGED

  // FUNCION QUE PERMITE CERRAR SESION ACTUAL
  logout(){
    // OBTENER LA INFORMACION ALMACENADA EN STORAGE MEDIANTE LA CLAVE "USER_DATA"
    this.storage.get("USER_DATA").then(data=>{
      data.active=0; // CUALQUIER SESION CERRADA CAMBIA A ESTADO 0
      this.DbtaskService.updateSesionData(data) //USAMOS LA SESION DATA PARA CAMBIAR EL ESTADO DEL USUARIO
      .then(response=>{
        if(response.rowsAffected>=1){ // SE VALIDA SI SE EFECTUO UNA MODIFICACION EN ALGUNA FILA
          this.storage.remove("USER_DATA"); // SE REMUEVE EL VALOR DE USER DATA
          this.router.navigate(['login']);
          this.authState.next(false);
        }
      })
      .catch(error => console.error(error))
    });
  }// FIN DEL LOGOUT

  //FUNCION INICIAR SESION
  login(login:any){
    this.DbtaskService.getSesionData(login) // SE OBTIENE SI EXISTE ALGUNA DATA DE SESION
    .then(data => {
      if(data===undefined){ //SI ES UNDEFINED  ES POR QUE NO SE RETORNO FIRMAS
        this.presentToast("Credenciales Incorrectas");
      }else{ // SI NO ES UNDEFINED ES POR QUE EL USUARIO Y LA PASSWORD COINCIDIERON CON ALGUN REGISTRO
        data.active=1; // SE ENCONTRO UN USUARIO
        this.DbtaskService.updateSesionData(data) //ACTUALIZAMOS LA SESION 
        .then(response=>{ // SI LA SENTENCIA SE EJECUTA SIN ERRORES
          this.storage.set("USER_DATA",data);
          this.authState.next(true);
          this.router.navigate(['perfil-user']);
        });
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }//FIN DEL LOGIN

  async presentToast(message:string, duration?:number){
    const toast = await this.toastController.create(
      {
        message:message,
        duration:duration?duration:2000
      }
    );
    toast.present();
  }
  isAuthenticated() {
    return this.authState.value;
  }
  

  
}// TERMINA AuthenticationService
