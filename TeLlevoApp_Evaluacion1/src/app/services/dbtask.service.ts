import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})
export class DbtaskService {
  db: SQLiteObject = null;

  constructor() { }

  // PERIMITE GUARDAR UN OBJETOS SQLITEOBJECT EN LA VARIABLE DB
  setDatabase(db:SQLiteObject) {
    if(this.db===null)
    {
      this.db=db
    };
  } // termina setDataBase
  

  // CREAR TABLAS NECESARIAS PARA EL FUNCIONAMIENTO
  createTables():Promise<any>{
    let tables=`
    CREATE TABLE IF NOT EXISTS sesion_data
    (
      user_name TEXT PRIMARY KEY NOT NULL,
      password TEXT NOT NULL,
      active INTEGER(1) NOT NULL
    );`;
    return this.db.executeSql(tables);
  }

  // FUNCION QUE RETORNA SI HAY UN USUARIO ACTIVO
  sesionActive(){
    // DESARROLLAMOS LA CONSULTA
    let sql = `SELECT user_name,active FROM sesion_data WHERE active=1 LIMIT 1`;
    // AHORA SE EJECUTAREMOS LA CONSULTA
    return this.db.executeSql(sql,[])
    // CUANDO SE EJECUTA LA CONSULTA
    .then(response=>{ // TENEMOS QUE DEVOLVER LA CONSULTA
      return Promise.resolve(response.row.item(0)); // SE OBTIENE EL PRIMER ITEM DE LA CONSULTA Y LO RETORNA
    });
  } // TERMINA SESIONACTIVATE

  //FUNCION QUE VALIDA LA EXISTENCIA DEL USUARIO QUE ESTA INICIANDO SESION
  getSesionData(sesion:any){
    let sql= `SELECT user_name, active FROM sesion_data WHERE user_name=? AND password=? LIMIT 1`;
    return this.db.executeSql(sql,[sesion.Usuario, sesion.Password]).then(response=>{
      return Promise.resolve(response.row.item(0));

    });
  }// TERMINA GET SESION DATA
  
  //FUNCION PARA CREAR USUARIO
  createSesionData(sesion:any){
    let sql= `INSERT INTO sesion_data(user_name,password,active) VALUES(?,?,?)`;
    return this.db.executeSql(sql, [sesion.Usuario , sesion.Password, sesion.Active]).then(response=>{
      return Promise.resolve(response.row.item(0));
    });
  } // TERMINA CREATE SESION DATA

  // CAMBIAR EL ESTADO DE ACTIVIDAD DEL USUARIO
  updateSesionData(sesion:any){
    let sql = `UPDATE sesion_data SET active=? WHERE user_name=?`;
    return this.db.executeSql(sql, [sesion.activate, sesion.user_name]);
  } // TERMINA UPDATE SESION DATA
  
  

}// termina export class DbtaskService

   
    




