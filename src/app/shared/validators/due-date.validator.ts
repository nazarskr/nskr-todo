import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dueDateValidator(): (
  control: AbstractControl,
) => ValidationErrors | null {
  return (control: AbstractControl) => {
    const value = control.value;
    if (value && new Date(value) < new Date()) {
      return { pastDate: true }; // Дата не може бути раніше, ніж сьогодні
    }
    return null;
  };
}
