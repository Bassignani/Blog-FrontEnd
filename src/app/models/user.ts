
export class User{   //Export para poder usar esta clase dentro de otro archivos del proyecto

    //Construyo el modelo
    constructor(   //Defino las propiedades que tiene un objeto de usuario(ta tabla de usuario de la BD)
        public id:          number,
        public name:        string,
        public surname:     string,
        public role:        string,
        public email:       string,
        public password:    string,
        public description: string,
        public image:       string
    ){}

}