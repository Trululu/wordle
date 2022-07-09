import { Injectable } from '@nestjs/common';
import { IGamePlayer, IWordResponse } from '../types';

@Injectable()
export class BaseGameService {
  private word: string;
  private level: number;
  private attempts: number;

  constructor() {
    this.level = 1;
    this.attempts = 0;
  }
  public changeWord(word: string) {
    this.word = word;
  }

  public guess(word: string) {
    const response: IWordResponse[] = [];
    let correctLetters = 0;
    for (let index = 0; index < word.length; index++) {
      const letter = word[index];
      if (!this.word.includes(letter)) {
        response.push({ letter, value: 3 });
      }
      if (this.word[index] !== letter) {
        response.push({ letter, value: 2 });
        continue;
      }
      correctLetters++;
      response.push({ letter, value: 1 });
    }

    return { response, correctLetters };
  }
}
