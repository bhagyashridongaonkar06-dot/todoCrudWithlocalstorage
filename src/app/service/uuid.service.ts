import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class UuidService {


  getUUid(){
    return crypto.randomUUID()
  }


  snackbar(msg : string){
    this._snackBar.open(msg, 'close',{
      duration : 3000,
      horizontalPosition : 'left',
      verticalPosition : 'top'
    })
  }
  constructor(private _snackBar : MatSnackBar) { }
}
