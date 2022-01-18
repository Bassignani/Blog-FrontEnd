import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class CategoryDetailComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public category: Category;
  public posts: any;
  public status: string; 
  public url;

  constructor(

    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService,

  ) { 

    //this.page_title = "this.category.name";
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    //this.category = new Category(1,'');

  }

  ngOnInit(): void {
    this.getPostsByCategory();
  }

  getPostsByCategory(){
    this._route.params.subscribe(params => {
      let id = +params['id'];  //Obtengo el id de la categoria
      this._categoryService.getCategory(id).subscribe(
        response => {
          if (response.status == 'success') {
            this.status = response.status;
            this.category = response.category;
            //Listo los posts de esta categoria
            this.posts = null;
            this._categoryService.getPosts(this.category.id).subscribe(
              response => {
                if (response.status == 'success') {
                  this.status = response.status;
                  this.posts = response.posts;
                } else {
                  this.status = "error";
                  console.log(response.error);
                }
              },
              error => {
                this.status = "error";
                console.log(<any>error);
              }
            );
          } else {
            this.status = "error";
            console.log(response.error);    
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    });
  }

  deletePost(id){
    this._postService.delete(this.token,id).subscribe(
      response => {
        this.getPostsByCategory();  //Para volver a cargar los post desp de eliminar uno
      },
      error => {
        console.log(error);
      }
    );
  }

}
