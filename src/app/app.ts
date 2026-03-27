import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Wordle } from './wordle/wordle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Wordle],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('wordle-ota');
}
