import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './components/nav/nav';
import { initFlowbite } from 'flowbite';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  // encapsulation: ViewEncapsulation.None,
})
export class App implements OnInit {
  protected title = 'frontend';

  ngOnInit(): void {
    initFlowbite();
  }
}
