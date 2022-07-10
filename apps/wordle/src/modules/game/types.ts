import { IUser } from '@app/common-modules';
import { Dictionary } from '../dictionary/entities/dictionary.entity';

export interface IGame {
  attempts: number;
  word: Dictionary;
  user: IUser;
  win: boolean;
}
