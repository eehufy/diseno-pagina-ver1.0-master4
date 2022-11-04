import { Component, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {
  qrCodeString = 'mensaje secreto de QR';
  scannedResult: any;
  constructor(private alertController: AlertController ) {}
  
  async asistencia() {
    const alert = await this.alertController.create({
      header: 'Atencion',
      subHeader: ' Mensaje importante ',
      message: 'Se abrira la camara para leer el QR ',
      buttons: ['entendido'],
    });

    await alert.present();
  }




  async checkPermission() {
  try{

    const status = await BarcodeScanner.checkPermission({ force: true });
    if (status.granted){

      return true;
    }
    return false;
  } catch(e) {
    console.log(e)
  }
}





async startScan(){
  try{
    const permission = await this.checkPermission();
    if(!permission){
      return;
    }
    await BarcodeScanner.hideBackground();
    document.querySelector('body').classList.add('scanner-active');
    const result = await BarcodeScanner.startScan();
    console.log(result);
    if(result?.hasContent){
      this.scannedResult = result.content;
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      console.log(this.scannedResult);
    }
  } catch(e){
    console.log(e);
    this.stopScan();
  }
}



  stopScan(){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
  } 



  ngOnDestroy(): void {
    this.stopScan();
  }

}
