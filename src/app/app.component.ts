import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedMaterialComponentsModule } from './shared-material-components/shared-material-components.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedMaterialComponentsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'mess-manager-client-app';

  constructor() {}


  ngOnInit(): void {
    
  }
}
