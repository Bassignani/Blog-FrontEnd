import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user'; 
import { global } from './global';


@Injectable()
export class UserService {

    public url: string;
    public user: User;
    public identity;
    public token;
   

    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
    }

    test(){  
        return "Hola mundo desde un servicio probando";
    }

    register(user): Observable<any>{
        let json = JSON.stringify(user);      
        let params = 'json='+json;       
        let headers = new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded'); //Cabeceras
        return this._http.post(this.url+'register', params, { headers: headers }); //El segundo parametro de headres tambien llamado headres se refiere la variable del mismo nombre declarada arriba
    }

    singup(user, getToken = null): Observable<any>{
        if(getToken != null){
            user.getToken = 'true';
        }
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded');
        return this._http.post(this.url+'login', params, { headers:headers });
    }

    update(token, user): Observable<any>{
        user.description = global.htmlEntities(user.description); //limpia el campo de descripcion de los caracteres HTML entities llamando a la funcion que esta en global
        let json = JSON.stringify(user);
        let params = "json="+json;
        let headers = new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);
        return this._http.put(this.url+'user/update', params, { headers:headers });
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));  //El metodo PARSE convierte el json string en un obj de JS 
        if (identity && identity != 'undefined') {
            this.identity = identity; 
        } else {
            this.identity = null;
        }
        return this.identity
    }

    getToken(){
        let token = localStorage.getItem('token');
        if (token != undefined) {
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    }

    getPosts(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded');
        return this._http.get(this.url+'post/user/' + id, { headers: headers });
    }

    

}