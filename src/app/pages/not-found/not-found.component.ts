import { Component } from '@angular/core';
import { PageComponent } from '@core/base/page';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'nskr-not-found',
  imports: [MatIcon],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent extends PageComponent {}
