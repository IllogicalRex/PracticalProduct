import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryModel } from 'src/app/models/category/category.model';
import { ProductModel } from 'src/app/models/products/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { first, map, startWith } from 'rxjs/operators';
import { ProductDetailService } from 'src/app/services/detail.service';
import { MatDialog } from '@angular/material/dialog';
import { CharacteristicsModalComponent } from '../characteristics-modal/characteristics-modal.component';
import { TableComponent } from 'src/app/shared/table/table.component';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @ViewChild('Table', {static: true}) table!: TableComponent;
  
  title = '';
  id = 0;
  @Input() error!: string | null;

  @ViewChild('snackBarTemplate') snackBarTemplate!: TemplateRef<any>;
  public message!: string;
  
  buttonText = 'Guardar';
  icon = 'done';

  product:ProductModel = new ProductModel();
  categories: Array<CategoryModel> = new Array<CategoryModel>();

  displayedColumns: any[] = [];
  dataSource: any[] = [];
  
  // Auto complete categoría
  categoryName?: string = '';
  selectedCategoryId!: number;
  categoryOptions: CategoryModel[] = [];
  categoryFilteredOptions!: Observable<CategoryModel[]>;
  
  formProduct: FormGroup = new FormGroup({
    id: new FormControl('0'),
    codeBar: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    creationDate: new FormControl(null, [Validators.required]),
    updateDate: new FormControl(null, [Validators.required])
  });

  @Output() submitEM = new EventEmitter();

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      public _productService: ProductService,
      public _categoryService: CategoryService,
      public _detailService: ProductDetailService,
      public dialog: MatDialog,
      private _snackBar: AlertComponent,
  ) {

    this.formProduct.controls['id'].disable();
    this.formProduct.controls['creationDate'].disable();
    this.formProduct.controls['updateDate'].disable();

  }

  ngOnInit(): void {
    this.id = Number(this._route.snapshot.paramMap.get('id'));
    this.getTitle();
    this.getCategories();
    this.displayedColumns = this.getColumns();
    if (this.id !== 0) {
      this.disabledFields();
      this.getProduct();
    } 
  }

  getProduct() {
    this._productService.getProductById(this.id).subscribe(res => {
      this.product = res;
      this.getDataSource(this.product.Id);
      this.setProductValues(res);
    });
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(res => {
      this.categories = res;
      this.categoryOptions = res;
      if(this.categoryName !== '') {
        this.formProduct.controls['category'].setValue(this.categoryName);
      }
      this.categoryFilteredOptions = this.formProduct.controls['category'].valueChanges.pipe(
        startWith(''),
        map(value => this._categoryFilter(value))
      );
    }); 
  }

  private _categoryFilter(name?: string): any[] {
    const filterValue = name?.toLowerCase();

    return this.categoryOptions.filter(option => option.Name.toLowerCase().includes(filterValue === undefined ? '' : filterValue));
  }

  onChangeCategory(cateogy: CategoryModel) {
    this.selectedCategoryId = cateogy.Id;
    this.categoryName = cateogy.Name;
    this.formProduct.controls['category'].setValue(this.categoryName); 
  }

  setProductValues(product: ProductModel) {
    this.formProduct.controls['id'].setValue( product.Id);
    this.formProduct.controls['codeBar'].setValue( product.CodeBar);
    this.formProduct.controls['name'].setValue( product.Name);
    this.formProduct.controls['brand'].setValue( product.Brand);
    this.formProduct.controls['creationDate'].setValue( product.CreationDate);
    this.formProduct.controls['updateDate'].setValue( product.UpdateDate);

    if (product.Category !== undefined) {
      this.categoryName = this.categories.find(x => x.Name === product.Category)?.Name;
      this.formProduct.controls['category'].setValue( this.categoryName);

    }
  }

  submit() {
    // Creating new product
    if (this.id === 0 ) {
      let codeBar = this.formProduct.controls['codeBar'].value;
      this._productService.getProductByfilter(codeBar).subscribe(res => {
        // Verifica si ya existe el código de barras ingresado
        if (res === null) {
          let product: any = {
            Name: this.formProduct.controls['name'].value,
            CodeBar: codeBar,
            Brand: this.formProduct.controls['brand'].value,
            Category: this.selectedCategoryId
          }

          this._productService.createProduct(product).subscribe(res => {
            if (res) {
              this.dataSource.forEach(elem => {
                elem.ProductId = res.Id;
              });
              this._detailService.addDetails(this.dataSource).subscribe(res => {
                this.openSnackBar('El producto se ha guardado con éxito', 'success');
                this._router.navigate(['/product'])
              });
            } 
          });
        } else {
          this.openSnackBar(`El producto con el código de barra ${codeBar}, ya se encuentra registrado`, 'warning');
        }
      });

    }  else {
      let category = this.categories.find(x => x.Name === this.categoryName)?.Id;
      let product: any = {
        Id: this.product.Id,
        Name: this.formProduct.controls['name'].value,
        CodeBar: this.formProduct.controls['codeBar'].value,
        Brand: this.formProduct.controls['brand'].value,
        Category: category,
        Status: this.product.Status
      }
    
      this._productService.updateProduct(this.id, product).subscribe(res => {
        if(res) {
          this.openSnackBar('Producto actualizado correctamente', 'success');
          this.getProduct();
        }
      });
    }
  }

  disabledFields() {
    if (this.id !== 0) {
      this.formProduct.controls['codeBar'].disable();
    }
  }

  getTitle() {
    if( this.id === 0 ) {
      this.title = 'Creación de productos';
    } else if (this.id !== 0) {
      this.title = 'Actualizar información de producto';
      this.buttonText = 'Actualizar';
      this.icon = 'update';
    }
  }

  getErrorMessageEmptyFieldProduct(field: string) {
    return this.formProduct.get(field)!.hasError('required') ? 'Campo requerido' :
      '';
  }

  getDataSource(productId: number) {
    this._detailService.getDetailByProductId(productId).subscribe(res => {
      this.dataSource = res;
    });
  }

  getColumns():  any[] {
    let column: any[] = [];

    if(this.id === 0) {
      column = [
        { name: 'Característica', dataKey: 'CharacteristicName', isSortable: true },
        { name: 'Descripción', dataKey: 'Description', isSortable: true }
      ];
    } else {
      column = [
        { name: 'Id', dataKey: 'Id', isSortable: true },
        { name: 'Característica', dataKey: 'CharacteristicName', isSortable: true },
        { name: 'Descripción', dataKey: 'Description', isSortable: true },
        { name: 'Fecha creación', dataKey: 'CreationDate', isSortable: true }
      ];
    }

    return column;
  };

  action(event: any) {
    
    switch(event.action) {
      case 'delete':
        if (this.id === 0) {
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
              this.dataSource = this.dataSource.filter(x => x.CharacteristicName !== event.row.CharacteristicName);
              this.table.tableData = this.dataSource;
            } else if (result.isDenied) {
              
            }
          });
        } else {
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
              this._detailService.deleteDetailById(event.row.Id).subscribe(res => {
                if (res) {
                  this.openSnackBar('La característica se eliminó con éxito','success');
                  this.getDataSource(this.id);
                }
              });
            } else if (result.isDenied) {
              
            }
          });
          
        }
      break;
      case 'update':
        // this._router.navigate([`/detail/${event.row.Id}`])
        
        this.openDialogCollaboratorsDetail(event.row, event.action);
      break;
      case 'add':
        this.openDialogCollaboratorsDetail(event.row, event.action);
        // this._router.navigate([`/detail/${0}`])
      break;
    }
  }


  openDialogCollaboratorsDetail(item: any, action: string) {
    let data = {
      value: item,
      action: action,
      productId: this.id,
      dataSource: this.dataSource
    }
    
    let index = this.dataSource.indexOf(item);
   
    const dialogRef = this.dialog.open(CharacteristicsModalComponent, {data: data});
    dialogRef.afterClosed().subscribe(result => {
      if(result.Characteristics.Id !== undefined && result.type === 'newCharacteristic') {
        this.openSnackBar('La característica se agregó con éxito','success');
        this.getDataSource(this.id);
      } else if(result.Characteristics.CharacteristicName !== undefined && result.type === 'newProduct'){
        this.openSnackBar('La característica se agregó con éxito','success');
        this.dataSource.push(result.Characteristics);
        this.table.tableData = this.dataSource;
      } else if(result.Characteristics.Id !== undefined && result.type === 'newCharacteristic'){ 
        this.openSnackBar('La característica se agregó con éxito','success');
        this.getDataSource(this.id);
      } else if(result.Characteristics.CharacteristicName !== undefined && result.type === 'deletedNoSavedCharacteristic'){ 
        if (index !== -1) {
          this.dataSource[index] = result.Characteristics;
          this.table.tableData = this.dataSource;
          this.openSnackBar('La característica se actualizó con éxito','success');
        }
      }
      
    });
  }

  confirDialog(title: string, text: string) {
    Swal.fire({
      title: title,
      text: text,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonColor: '#4A7D9E',
      denyButtonText: `No`,
      confirmButtonText: 'Si',
      reverseButtons: true
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
      } else if (result.isDenied) {
        
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.message = message;
    this._snackBar.openSnackBar(this.snackBarTemplate, action);
  }
}
