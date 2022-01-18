import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category'; 
import { global } from './global';


@Injectable()
export class CategoryService {

    public url: string;
    public category: Category;
    public identity;
    public token;
   

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }

//Crea categoria
create(token, category): Observable<any>{
    let json = JSON.stringify(category);      
    let params = 'json='+json;       
    let headers = new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded') //Cabeceras
                                    .set('Authorization', token);
    return this._http.post(this.url+'category', params, { headers:headers });
}

//Saca todas las categorias
getCategories(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded');
    return this._http.get(this.url+'category', { headers: headers });
}

//Saca el objeto en concreto de una categoria
getCategory(id): Observable<any>{   
    let headers = new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded');
    return this._http.get(this.url+'category/' + id, { headers: headers });
}
 
//Saca todos los posts dentro de una categoria en particular
getPosts(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded');
    return this._http.get(this.url+'post/category/' + id, { headers: headers });
}
    
}

