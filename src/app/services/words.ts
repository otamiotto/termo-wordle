import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  words = [
    'AMIGO',
    'CARTA',
    'PEDRA',
    'LIVRO',
    'PORTA',
    'NUVEM',
    'VERDE',
    'PRAIA',
    'TEMPO',
    'FORNO',
    'CAIXA',
    'TIGRE',
    'PIANO',
    'LENTE',
    'CAMPO',
    'VINHO',
    'FESTA',
    'BARCO',
    'PODER',
    'SABOR',
    'LUZER',
    'MAGIA',
    'PULAR',
    'ANDAR',
    'BEBER',
    'CORRE',
    'SORRI',
    'BRISA',
    'VENTO',
    'CHUVA',
    'NEVAR',
    'FRUTA',
    'CARRO',
    'METRO',
    'MUNDO',
    'SONHO',
    'PLANO',
    'CUSTO',
    'VALOR',
    'PRECO',
  ];

  getRandomWord() {
    return this.words[Math.floor(Math.random() * this.words.length)];
  }
}
