import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService, UserService],
})
export class HomeComponent implements OnInit {

  public page_title: string;
  public url;
  public post: Post;
  public posts: Array<Post>;
  public identity;
  public token;

  constructor(
    private _postService: PostService,
    private _userService: UserService,
  ) { 
    this.page_title = 'Inicio';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this._postService.getPosts().subscribe(
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

  deletePost(id){
    this._postService.delete(this.token,id).subscribe(
      response => {
       this.getPosts();  //Para volver a cargar los post desp de eliminar uno
      },
      error => {
        console.log(error);
      }
    );
  }

}
