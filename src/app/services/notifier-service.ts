import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
  })
export class NotifierService{
    constructor(private snackBar: MatSnackBar){}

    showNotification(message: string, action: string){
        this.snackBar.open(message, action, {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
        });
    }
}