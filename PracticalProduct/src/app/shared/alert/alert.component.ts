import { Component, Injectable, Input, OnInit, TemplateRef } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  durationInSeconds = 5;
  @Input() msg!: string;
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(template: TemplateRef<any>, action: string) {
    switch(action) {
      case 'success':
        this.SnackBar(template, action);
        break;
      case 'warning':
        this.SnackBar(template, action);
        break;
      case 'error':
        this.SnackBar(template, action);
        break;
    }
  }
  CloseSnackBar() {
    this._snackBar.dismiss();
  }
 
  SnackBar(template: TemplateRef<any>, action: string) {
    this._snackBar.openFromTemplate(template, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: [action]
      }
    );
  }

}
