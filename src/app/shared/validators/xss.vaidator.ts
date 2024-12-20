import { AbstractControl, ValidationErrors } from '@angular/forms';

export function xssValidator(): (
  control: AbstractControl,
) => ValidationErrors | null {
  return (control: AbstractControl) => {
    const value = control.value || '';
    const isXSS = /<script.*?>.*?<\/script>|<.*?on\w+=.*?>/i.test(value); // Простий приклад перевірки XSS
    return isXSS ? { xssDetected: true } : null;
  };
}
