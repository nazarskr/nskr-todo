import { Component } from '@angular/core';
import { PageComponent } from '@core/base/page';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nskr-not-found',
  imports: [MatIcon, MatButton, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent extends PageComponent {}
