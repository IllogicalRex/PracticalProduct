import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayedColumns: any[] = [];
  dataSource: any[] = [];

  @ViewChild('snackBarTemplate') snackBarTemplate!: TemplateRef<any>;
  public message!: string;

  constructor(public _productService: ProductService,
              public _router: Router,
              private _snackBar: AlertComponent
  ) {

  }

  ngOnInit(): void {
    this.displayedColumns = this.getColumns();
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe( res => {
      this.dataSource = res;
    });
  }

  getColumns():  any[] {
    return [
      { name: 'Id', dataKey: 'Id', isSortable: true },
      { name: 'Código', dataKey: 'CodeBar', isSortable: true },
      { name: 'Nombre', dataKey: 'Name', isSortable: true },
      { name: 'Categoría', dataKey: 'Category', isSortable: true }
    ];
  };

  sortData(event:any) {

  }
  
  action(event: any) {
    
    switch(event.action) {
      case 'delete':
        Swal.fire({
          title: 'Eliminar registro',
          text: '¿Esta seguro que desea eliminar el registro?',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonColor: '#4A7D9E',
          denyButtonText: `No`,
          confirmButtonText: 'Si',
          reverseButtons: true
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this._productService.deleteProductById(event.row.Id).subscribe(res => {
            this.openSnackBar('El producto se eliminó correctamente', 'success');
            this.getProducts();
        });
          } else if (result.isDenied) {
            
          }
        });
        
      break;
      case 'update':
        this._router.navigate([`/detail/${event.row.Id}`])
      break;
      case 'add':
        this._router.navigate([`/detail/${0}`])
      break;
    }
  }

  openSnackBar(message: string, action: string) {
    this.message = message;
    this._snackBar.openSnackBar(this.snackBarTemplate, action);
  }
}