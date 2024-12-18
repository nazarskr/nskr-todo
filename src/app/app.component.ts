import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeComponent } from '@shared/components/theme/theme.component';

@Component({
  selector: 'nskr-root',
  imports: [RouterOutlet, ThemeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'nskr-todo';
}
