import 'zone.js/node';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { renderApplication, ServerModule } from '@angular/platform-server';
import { provideFileRouter } from '@analogjs/router';
import { withEnabledBlockingInitialNavigation } from '@angular/router';
import { IonicServerModule } from '@ionic/angular-server';

import { AppComponent } from './app/app.component';
import { mainProviders } from './main.providers';
import { LetModule } from '@rx-angular/template/let';

if (import.meta.env.PROD) {
  enableProdMode();
}

export default async function render(url: string, document: string) {
  const html = await renderApplication(AppComponent, {
    appId: 'analog-app',
    document,
    url,
    providers: [
      provideFileRouter(withEnabledBlockingInitialNavigation()),
      importProvidersFrom(ServerModule, LetModule),
      // importProvidersFrom(IonicServerModule, ServerModule),
      ...mainProviders,
    ],
  });

  return html;
}
