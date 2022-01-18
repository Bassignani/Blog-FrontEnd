import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service'; 
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, CategoryService]
})
export class AppComponent implements OnInit, DoCheck{
  title = 'blog-angular';
  public identity;
  public token;
  public url;
  public categories;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService,
  ){
    this.loadUser();
    this.url = global.url;
  }


  ngOnInit(){
    console.log('Webapp cargada correctamente: ');
    this.getCategories();
  }

  ngDoCheck(){  //Esta comprobando los cambios que se presenten en identity y token para que refresque solo la pantalla
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
          if(response.status== 'success'){
              this.categories = response.categories;
          }
      },
      error => {
        console.log(<any>error);
      }
    );
  }



}
