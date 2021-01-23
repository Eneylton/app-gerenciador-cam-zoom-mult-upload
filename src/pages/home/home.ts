import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  log:any;
  nivel:string = "";

  id:                number;
  url:               string = "";
  imagens:           any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private serve: ServiceProvider,
              private storage: Storage
    ) {
    this.url = serve.serve;
    console.log(this.serve);
  }

  ionViewDidLoad() {

    this.storage.get('session_storage').then((res)=>{

      this.log = res;
      this.nivel = this.log.nivel;
      
      
    });

    this.id = this.navParams.get('id');
    this.imagens = [];
    this.listarDocumentos();
   
  }

  listarDocumentos() {

    return new Promise(resolve => {
      let body = {
        nota_id: this.id,
        crud: 'listar-documentos'
      };

      this.serve.postData(body, 'galeria.php').subscribe((data:any)=> {
       
        for (let i = 0; i < data.result.length; i++) {
  
          this.imagens.push({
                id:                     data.result[i]["id"],
                nota_id:                data.result[i]["nota_id"],
                foto:                   data.result[i]["foto"]
                
  
          });
  
        }
  
        })
  
        resolve(true);
  
      });
  
  }

  deleteImagem(index){

    this.imagens.splice(index,1);

  }



}
