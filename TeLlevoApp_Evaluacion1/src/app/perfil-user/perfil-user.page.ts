import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';


import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.page.html',
  styleUrls: ['./perfil-user.page.scss'],
})
export class PerfilUserPage implements OnInit {
  usuario: string;
  constructor(private router: Router ,private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(data => {
      this.usuario=data.usuario
    })
  }

  CerrarSesion(){
    this.router.navigate(['../login']);
  }
  ngOnInit() {
    
  }

}
