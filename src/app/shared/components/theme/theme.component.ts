import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService } from '@shared/components/theme/theme.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'nskr-theme',
  imports: [MatButtonModule],
  template: `
    <button mat-raised-button (click)="toggleTheme()">
      {{ themeService.currentTheme ? 'Light Theme' : 'Dark Theme' }}
    </button>
  `,
  styles: [
    `
      button {
        position: fixed;
        top: 15px;
        left: 15px;
        z-index: 10;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeComponent {
  constructor(public themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
