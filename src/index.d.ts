import { Common } from './sewoo-printer.common';
import { BluetoothPermissions } from './android/android_main';
export declare class SewooPrinter extends Common {
  // define your typings manually
  // or..
  // take the ios or android .d.ts files and copy/paste them here
  cPCLPrinter: com.sewoo.jpos.printer.CPCLPrinter;
  ptrConn: com.sewoo.port.android.BluetoothPort;
  bluetoothAdapter: android.bluetooth.BluetoothAdapter;
  bluetoothPermissions: BluetoothPermissions;
  hThread: java.lang.Thread;
  address: string;
  constructor(charset?: string, paperSize?: number);
  Toast(text: any, duration: any): globalAndroid.widget.Toast;
  connect(address: string): void;
  disconnect(): void;
  printImg(bitmap: globalAndroid.graphics.Bitmap, startX?: number, startY?: number): void;
  print(text: string): void;
}
