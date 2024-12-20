import { Directive, HostBinding, inject } from '@angular/core';
import { PageTitle } from '@core/enums/page-title.enum';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Directive()
export abstract class PageComponent {
  protected route = inject(ActivatedRoute);
  private titleService = inject(Title);

  @HostBinding('class') className = 'page';
  pageTitle!: PageTitle;

  constructor() {
    this.setPageTitle();
  }

  private setPageTitle(): void {
    const title = this.route.snapshot.routeConfig?.title as PageTitle;
    this.pageTitle = title;
    this.titleService.setTitle(title);
  }
}
