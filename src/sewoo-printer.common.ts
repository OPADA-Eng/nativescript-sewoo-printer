import { Observable } from 'tns-core-modules/data/observable';
export enum PaperSizes {
  'FourInch' = 832,
  'ThreeInch' = 576,
  'TwoInch' = 384
}


export class Common extends Observable {
  public paperSize: number = PaperSizes.FourInch;
  public charset: string = '';
  public debug: boolean = false;
  constructor() {
    super();
  }


}


