import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeComponent } from '@shared/components/theme/theme.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'nskr-root',
  imports: [RouterOutlet, ThemeComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'nskr-todo';
}
