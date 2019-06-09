import { Observable } from 'tns-core-modules/data/observable';
import * as app from 'tns-core-modules/application';
import * as dialogs from 'tns-core-modules/ui/dialogs';
export enum PaperSizes {
  'FourInch' = 832,
  'ThreeInch' = 576,
  'TwoInch' = 384
}


export class Common extends Observable {
  public paperSize: number = PaperSizes.FourInch
  constructor(paperSize = 0) {
    super();
    if (paperSize > 0) {
      this.paperSize = paperSize;
    }
  }


}


