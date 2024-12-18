import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private _snackBar = inject(MatSnackBar);
  private defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };

  showSuccessMessage(message: string) {
    this._showMessage(message, 'message-success');
  }

  showWarningMessage(message: string) {
    this._showMessage(message, 'message-warning');
  }

  showErrorMessage(message: string) {
    this._showMessage(message, 'message-error');
  }

  private _showMessage(message: string, panelClass: string) {
    this._snackBar.open(message, 'X', {
      ...this.defaultConfig,
      panelClass,
    });
  }
}
