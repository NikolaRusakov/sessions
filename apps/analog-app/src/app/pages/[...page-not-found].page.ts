import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'analog-app-page-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h2>Page Not Found</h2>

    <a routerLink="/">Go Back Home</a>
  `,
})
export default class PageNotFoundComponent {}
