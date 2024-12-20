import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { selectLoading } from '../../../pages/tasks/state/tasks.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'nskr-loading',
  imports: [MatProgressSpinner, AsyncPipe],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  private store: Store = inject(Store);
  loading$: Observable<boolean> = this.store.select(selectLoading);
}
