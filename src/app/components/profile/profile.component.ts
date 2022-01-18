import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, PostService]
})
export class ProfileComponent implements OnInit {

  public page_title: string;
  public user: User;
  public post: Post;
  public posts: Array<Post>;
  public identity;
  public token;
  public status;
  public url;

  constructor(
    private _userService: UserService,
    private _postService: PostService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) { 

    this.page_title = 'Perfil de usuarios';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
    
    this.user = new User(this.identity.sub,   //this.identity.sub
                        this.identity.name,
                        this.identity.surname,
                        this.identity.role,
                        this.identity.emai,
                         '', //Password
                        this.identity.description,
                        this.identity.image); //De esta manera rrelleno el formulario con los datos que tengo del usuario identificado

  }

  ngOnInit(): void {
    //Sacar el id del post de la url
    this._route.params.subscribe(params => {
      let userId = +params['id']  //El + convierte el string en un entero
    this.getPosts(userId);
    });
  }

  getPosts(userId){
    this._userService.getPosts(userId).subscribe(
      response => {
        if (response.status == 'success') {
          this.posts = response.posts;
        } else {
          console.log(response.error);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deletePost(id,userId){
    this._postService.delete(this.token,id).subscribe(
      response => {
       //Sacar el id del post de la url
    this._route.params.subscribe(params => {
      let userId = +params['id']  //El + convierte el string en un entero 
       this.getPosts(userId);  //Para volver a cargar los post desp de eliminar uno
    });
      },
      error => {
        console.log(error);
      }
    );
  }

}
