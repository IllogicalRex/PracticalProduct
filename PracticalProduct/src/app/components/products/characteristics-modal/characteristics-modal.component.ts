import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductDetailModel } from 'src/app/models/product-detail/detail.model';
import { ProductDetailService } from 'src/app/services/detail.service';

@Component({
  selector: 'app-characteristics-modal',
  templateUrl: './characteristics-modal.component.html',
  styleUrls: ['./characteristics-modal.component.css'],
  providers: [DatePipe]
})
export class CharacteristicsModalComponent implements OnInit {

  title = 'Agregar características';

  formCharacteristic: FormGroup = new FormGroup({
    id: new FormControl('0'),
    characteristicName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    creationDate: new FormControl(this.datePipe.transform(new Date(), 'medium'), [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<CharacteristicsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe,
    public _detailService: ProductDetailService
  ) {
    this.formCharacteristic.controls['id'].disable();
    this.formCharacteristic.controls['creationDate'].disable();
   }

  ngOnInit(): void {
    this.dialogRef.updateSize('70%');
    if (this.data.value !== undefined) {
      // Edit characteristic
      this.setValues();
    }
  }

  setValues() {
    this.formCharacteristic.controls['id'].setValue( this.data.value.Id);
    this.formCharacteristic.controls['characteristicName'].setValue( this.data.value.CharacteristicName);
    this.formCharacteristic.controls['description'].setValue( this.data.value.Description);
    this.formCharacteristic.controls['creationDate'].setValue( new Date(this.data.value.CreationDate));
  }

  getData(): any {
    let detail: ProductDetailModel = new ProductDetailModel();
    detail.ProductId = this.data.productId;
    detail.CharacteristicName = this.formCharacteristic.controls['characteristicName'].value;
    detail.Description = this.formCharacteristic.controls['description'].value;

    let data = {
      ProductId: detail.ProductId,
      CharacteristicName: detail.CharacteristicName,
      Description: detail.Description,
      CreationDate: null,
      UpdateDate: null,
      Id: this.data.value === undefined ? null : this.data.value.Id
    }
    
    return data;
  }

  close() {
    this.dialogRef.close(undefined);
  }

  acept() {
    // When exist product but not characteristics
    if (this.data.value === undefined && this.data.productId !== 0) {
      let characteristic = this.getData();
      let data = {
        Characteristics: characteristic,
        type: 'newCharacteristic'
      }
      this._detailService.addDetailById(data.Characteristics).subscribe(res => {
        data.Characteristics = res;
        this.dialogRef.close(data);
      });

      // When no exist product and no exist charecteristics 
    } else if (this.data.value === undefined && this.data.productId === 0) {
      let characteristic = this.getData();
      let data = {
        Characteristics: characteristic,
        type: 'newProduct'
      }
      this.dialogRef.close(data);
      // When exist products and characterisitcs
    } else if (this.data.value !== undefined && this.data.productId !== 0) {
      let characteristic = this.getData();
      let data = {
        Characteristics: characteristic,
        type: 'newCharacteristic'
      }
      
      this._detailService.updateDetail(data.Characteristics.Id, data.Characteristics).subscribe(res => {
        data.Characteristics = res;
        this.dialogRef.close(data);
      });
    } else if (this.data.value !== undefined && this.data.productId === 0) {
      let characteristic = this.getData();
      let data = {
        Characteristics: characteristic,
        type: 'deletedNoSavedCharacteristic'
      }
      this.dialogRef.close(data);
    }
  }

  getErrorMessageEmptyFieldCharacteristic(field: string) {
    return this.formCharacteristic.get(field)!.hasError('required') ? 'Campo requerido' :
      '';
  }

}
