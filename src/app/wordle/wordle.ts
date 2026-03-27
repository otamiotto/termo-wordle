import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { WordsService } from '../services/words';
import { CommonModule } from '@angular/common';

interface Letter {
  value: string;
  status: 'default' | 'present' | 'correct' | 'wrong';
}

interface Message {
  text: string;
  type: 'error' | 'success';
}

@Component({
  selector: 'app-wordle',
  imports: [CommonModule],
  templateUrl: './wordle.html',
  styleUrl: './wordle.css',
})
export class Wordle implements OnInit {
  wordsService = inject(WordsService);

  wordOfTheDay = this.wordsService.getRandomWord();

  wordleGrid: Letter[][] = [];

  currentRow: number = 0;
  currentCol: number = 0;
  message = signal({} as Message);
  gameOver: boolean = false;
  @ViewChild('input') inputEl!: ElementRef;

  ngAfterViewInit() {
    this.inputEl?.nativeElement.focus();
  }

  ngOnInit() {
    this.wordleGrid = Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({ value: '', status: 'default' }) as Letter),
    );
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.gameOver) {
      return;
    }

    if (event.key == 'Enter') {
      this.validateWord();
      return;
    } else if (event.key === 'Backspace' || event.key == 'Delete') {
      if (this.currentCol < 5) {
        this.currentCol--;
      }
      this.wordleGrid[this.currentRow][this.currentCol] = { value: '', status: 'default' };
      if (this.currentCol === 0) {
        return;
      }
    } else if (/^[a-zA-Z]+$/.test(event.key) && event.key.length === 1) {
      this.wordleGrid[this.currentRow][this.currentCol] = {
        value: event.key.toUpperCase(),
        status: 'default',
      } as Letter;

      if (this.currentCol < 4) {
        this.currentCol++;
      }
    }
  }

  validateWord() {
    let word = this.wordleGrid[this.currentRow].map((l: Letter) => l.value).join('');
    // console.log(word);
    if (word.length < 5) {
      this.message.set({ text: 'Digite uma palavra com 5 letras', type: 'error' });
      setTimeout(() => {
        this.message.set({} as Message);
      }, 3000);
      return;
    } else {
      this.message.set({ text: '', type: 'error' });

      this.wordleGrid[this.currentRow].map((col: Letter, index: number) => {
        // console.log(this.wordOfTheDay);
        // console.log(col.value);
        if (this.wordOfTheDay.charAt(index) == col.value) {
          col.status = 'correct';
        } else if (this.wordOfTheDay.includes(col.value)) {
          col.status = 'present';

          //se tiver mais de uma vez - evitar multiplos "present":
          const countInWord = this.wordOfTheDay.split(col.value).length - 1;
          const countInGuess = this.wordleGrid[this.currentRow].filter(
            (letter) => letter.value === col.value,
          ).length;
          if (countInGuess > countInWord) {
            let excess = countInGuess - countInWord;
            this.wordleGrid[this.currentRow].forEach((letter) => {
              if (letter.value === col.value && letter.status === 'present' && excess > 0) {
                letter.status = 'wrong';
                excess--;
              }
            });
          }
        } else {
          col.status = 'wrong';
        }
      });
    }

    if (this.wordleGrid[this.currentRow].every((col) => col.status === 'correct')) {
      this.gameOver = true;
      this.message.set({ text: 'Boa! Parabéns, voce acertou :)', type: 'success' });
      return;
    }

    this.currentCol = 0;
    this.currentRow++;

    if (this.currentRow == 6) {
      this.gameOver = true;
      this.message.set({
        text: 'Mais sorte na proxima! A palavra era: ' + this.wordOfTheDay,
        type: 'error',
      });

      return;
    }
  }
}
