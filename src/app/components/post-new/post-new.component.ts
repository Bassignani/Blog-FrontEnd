import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';
import { Post } from '../../models/post';




@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [ UserService, CategoryService, PostService]

})
export class PostNewComponent implements OnInit {

  public page_title: string;
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
    this.page_title = "Crear una entrada";
    this.identity = this._userService.getIdentity();
   // this.token = this._categoryService.getCategories();
   this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.post = new Post(1, this.identity.sub, 1, '', '', '', null );
    this.getCategories();
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
    this._postService.create(this.token,this.post).subscribe(
      response =>{
        if (response.status == "success") {
          this.status = 'success';
          this.post = response.post;
          form.reset();
          this._router.navigate(['/inicio']);
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
