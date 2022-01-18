import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public token;
  public identity;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.page_title = 'identificate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit(): void {
    this.logout();  //Se ejecuta siempre y cierrra sesion solo cuando le llega el parametro sure por la url
  }

  onSubmit(form){
    this._userService.singup(this.user).subscribe(
      response => {
        //TOKEN
        if (response.status != "error") {
          this.status = "success";  
          this.token = response;   //Tiene el valor del TOKEN
              //Obtengo el objeto del usuario identificado
              this._userService.singup(this.user, true).subscribe(
                response => {
                    this.identity = response;  //Tiene el objeto de USUARIO
                    
                    //Una vez que tengo el objeto de usuario lo persisto guardandolo en el local storage (almacenamiento local de la pagina)
                    localStorage.setItem('token', this.token);
                    localStorage.setItem('identity', JSON.stringify(this.identity)); //Convierte el obj de usuario en un json string
                    //Redireccion a la pagina principal
                    this._router.navigate(['inicio']);
                },
                error => {
                  this.status = "error";
                  console.log(<any>error);
                }
              )
        }else{
          this.status = "error";
        }
      },
      error => {
        this.status = "error";
        console.log(<any>error);
      }
    )
  }

  logout(){
    this._route.params.subscribe(params => {
      let logout = +params['sure']; //Poniendo el simbolo de + adelante lo convierto de un string a un entero

      if (logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this.identity = null;
        this.token = null;
        //Redireccion a la pagina principal
        this._router.navigate(['inicio']);
      }
    });
  }

}
