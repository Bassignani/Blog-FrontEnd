import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';


@Component({
  selector: 'app-user-edi',
  templateUrl: './user-edi.component.html',
  styleUrls: ['./user-edi.component.css'],
  providers: [UserService]
})
export class UserEdiComponent implements OnInit {

  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status;
  public url;
  //Configuracion del FILE-UPLOAD
  public afuConfig = {
                        multiple: false,
                        formatsAllowed: ".jpg,.png,.gif, .jpeg",
                        maxSize: "50",
                        uploadAPI:  {
                          url: global.url+'user/upload',
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
                       // attachPinText: 'Sube tu avatar de usuario'
                        replaceTexts: {
                          selectFileBtn: 'Select Files',
                          resetBtn: 'Reset',
                          uploadBtn: 'Upload',
                          dragNDropBox: 'Drag N Drop',
                          attachPinBtn: 'Sube tu avatar de usuario',
                          afterUploadMsg_success: 'Successfully Uploaded !',
                          afterUploadMsg_error: 'Upload Failed !',
                          sizeLimit: 'Size Limit'
                        }   
                        };

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Ajustes de usuarios';
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
  }

  onSubmit(form){
    this._userService.update(this.token, this.user).subscribe(
      response => {
       if (response && response.status) {
        this.status = 'success';
        //Actualizar usuario en sesion
       if (response.change.name) {
          this.user.name = response.change.name
        }
        if (response.change.surname) {
          this.user.surname = response.change.surname
        }
        if (response.change.description) {
          this.user.description = response.change.description
        }
        if (response.change.image) {
          this.user.image = response.change.image
        }             
        this.identity = this.user;
        localStorage.setItem('identity', JSON.stringify(this.identity));
      } else {
        this.status = 'error';
      }
      },
      error => {
        this.status = "error";
        console.log(<any>error);
      }
    );
  }


  avatarUpload(datos){
    let data = (datos.body);
    this.user.image = data.image
  }

}

