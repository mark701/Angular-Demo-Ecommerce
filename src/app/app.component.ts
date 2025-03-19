import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { FotterComponent } from "./Shared/fotter/fotter.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule, FotterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent implements AfterViewInit {
  title = 'your-app-name';


  ngAfterViewInit() {
    initFlowbite();
  } 





   
}

