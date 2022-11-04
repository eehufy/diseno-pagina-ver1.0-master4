
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,FormControl,Validators,FormBuilder
} from '@angular/forms'
import { AlertController,NavController } from '@ionic/angular';
@Component({
  selector: 'app-cambiocontra',
  templateUrl: './cambiocontra.page.html',
  styleUrls: ['./cambiocontra.page.scss'],
})
export class CambiocontraPage implements OnInit {
  cambioContra: FormGroup
  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) {
    this.cambioContra = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'confirmacionNueva': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

  async guardar(){
    var f = this.cambioContra.value;

    if(this.cambioContra.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los Campos',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    }

    var usuario = {
      nombre: f.nombre,
      password: f.password
    }

    localStorage.setItem('usuario',JSON.stringify(usuario));

    localStorage.setItem('ingresado','true');
    this.navCtrl.navigateRoot('inicio');
  }

}