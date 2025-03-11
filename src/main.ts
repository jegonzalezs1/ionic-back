import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

// Importar Ionicons y registrar los íconos necesarios
import { addIcons } from 'ionicons';
import { add, checkmark, chevronBack, closeOutline, exitOutline, personOutline, reorderFour, settingsOutline } from 'ionicons/icons';

addIcons({
  'add-circle': add, 
  'chevron-back': chevronBack,
  'reorder-four': reorderFour,
  'settings-outline': settingsOutline,
  'person-outline': personOutline,
  'exit-outline': exitOutline,
  'close-outline': closeOutline,
  'checkmark': checkmark
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient()
  ],
});
