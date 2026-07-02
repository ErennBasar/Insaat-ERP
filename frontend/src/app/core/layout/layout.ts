import { Component } from '@angular/core';
import {Sidebar} from './sidebar/sidebar';
import {Topbar} from './topbar/topbar';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    Sidebar,
    Topbar,
    RouterModule
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

}
