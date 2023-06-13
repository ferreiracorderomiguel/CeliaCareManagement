import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  /**
   * Constructs a new instance of the NotifierService.
   *
   * @param snackBar The MatSnackBar used to show notifications.
   */
  constructor(private snackBar: MatSnackBar) {}

  /**
   * Shows a notification message.
   *
   * @param message The message to display.
   * @param action The action text to show.
   */
  showNotification(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  /**
   * Shows a confirmation message with an action button.
   *
   * @param message The message to display.
   * @param actionYes The text for the action button.
   * @returns An Observable that resolves when the snackbar is dismissed.
   */
  showConfirmation(message: string, actionYes: string): Observable<any> {
    const snackBarRef = this.snackBar.open(message, actionYes, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
      panelClass: 'custom-snackbar',
    });

    return snackBarRef.afterDismissed();
  }
}
