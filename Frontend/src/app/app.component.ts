import { Component } from '@angular/core';
import { IonApp, IonicModule, IonRouterOutlet } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, RouterModule ],
  templateUrl: './app.component.html'
})
export class AppComponent {}
