import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';
import { Post } from '../../models/post';


@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
  providers: [ UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {

  public page_title: string;
  public url;
  public identity;
  public token;
  public post: Post;
  public categories;
  public status: string;
  //Configuracion del FILE-UPLOAD
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif, .jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: global.url+'post/upload',
      method:"POST",
      headers: {
    "Authorization" : this._userService.getToken()
      },
    //  params: {
    //    'page': '1'
    //  },
    //  responseType: 'blob',
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
   // attachPinText: 'Sube tu imagen al post'
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu imagen al post',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }   
    };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService,
  ) { 
    this.page_title = "Editar una entrada";
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getCategories();
    this.getPost();
    this.post = new Post(1, this.identity.sub, 1, '', '', '', null );
  }

  getPost(){
    //Sacar el id del post de la url
    this._route.params.subscribe(params => {
      let id = +params['id']  //El + convierte el string en un entero
      //Peticion ajax para sacar los datos
      this._postService.getPost(id).subscribe(
        response =>{
          if (response.status == 'success') {
            this.post = response.post;
            if (this.post.user_id != this.identity.sub) {
              this._router.navigate(['inicio']);
            } 
          } else {
            this._router.navigate(['inicio']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['inicio']);
        }
      );
    });    
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response =>{
        if(response.status == "success"){
          this.categories = response.categories;
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

  imageUpload(datos){
    let image_data = (datos.body);
    this.post.image = image_data.image;
  }
 

  onSubmit(form){ 
   this._postService.update(this.token,this.post,this.post.id).subscribe(
      response =>{
        if (response.status == "success") {
          this.status = 'success';
          this.post = response.post;
          this._router.navigate(['/inicio']);
          //this._router.navigate(['/entrada', this.post.id]);
        }else{
          this.status = 'error';
        }
      },
      error =>{
        this.status = 'error';
        console.log(<any>error);
      }
    );   
  }


}
