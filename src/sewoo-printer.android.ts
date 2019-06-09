import { Common } from './sewoo-printer.common';
import { BluetoothPermissions } from './android/android_main';
declare var com: any;
export class SewooPrinter extends Common {
    public cPCLPrinter: com.sewoo.jpos.printer.CPCLPrinter;
    public ptrConn: com.sewoo.port.android.BluetoothPort;
    public bluetoothAdapter: android.bluetooth.BluetoothAdapter;
    public bluetoothPermissions: BluetoothPermissions;
    public hThread: java.lang.Thread;
    public address: string = "";
    constructor(charset: string = "") {
        super();
        this.bluetoothPermissions = new BluetoothPermissions();
        if (!this.bluetoothPermissions.coarseLocationPermissionGranted()) {
            this.bluetoothPermissions.requestCoarseLocationPermission();
        }
        this.bluetoothAdapter = android.bluetooth.BluetoothAdapter.getDefaultAdapter();
        this.ptrConn = new com.sewoo.port.android.BluetoothPort();
        this.cPCLPrinter = new com.sewoo.jpos.printer.CPCLPrinter(charset);

    }

    public connect(address: string) {
        if (this.ptrConn != null && address != '') {
            if (this.bluetoothAdapter.isEnabled()) {
                this.ptrConn.connect(address);
                let rh = new com.sewoo.request.android.RequestHandler();
                this.hThread = new java.lang.Thread(rh);
                this.hThread.start();
                this.address = address;
                console.log("Connected To: " + address);
            }
            else {
                this.bluetoothAdapter.enable();
                this.ptrConn.connect(address);
            }
        }
    }

    public disconnect() {
        if (this.ptrConn != null) {
            this.ptrConn.disconnect();
            console.log("Disconnected From: " + this.address);
            if ((this.hThread != null) && (this.hThread.isAlive()))
                this.hThread.interrupt();
        }
    }


    public printImg(bitmap: globalAndroid.graphics.Bitmap, startX = 0, startY = 0) {
        if (this.ptrConn.isConnected()) {
            this.cPCLPrinter.setForm(0, 200, 200, bitmap.getHeight() + 70, 1);
            this.cPCLPrinter.setMedia(com.sewoo.jpos.command.CPCLConst.LK_CPCL_CONTINUOUS);
            // console.dir(self.cPCLPrinter);
            // console.log("Width×Height: ", bitmap.getWidth(), bitmap.getHeight());
            try {
                // let ScaledBMP = android.graphics.Bitmap.createBitmap(bitmap, 0, 0, bitmap.getWidth(), bitmap.getHeight());
                this.cPCLPrinter.printBitmap(bitmap, startX, startY);
            }
            catch (e) {
                console.log(e);
            }
            this.cPCLPrinter.printForm();
        }
        else {
            console.log("printer is not connected");
        }
    }
    // printImgPath(path: string) {
    //     if (this.ptrConn.isConnected()) {
    //         this.cPCLPrinter.setForm(0, 200, 200, 576, 1);
    //         this.cPCLPrinter.setMedia(com.sewoo.jpos.command.CPCLConst.LK_CPCL_CONTINUOUS);
    //         // console.dir(self.cPCLPrinter);
    //         try {
    //             let res = this.cPCLPrinter.printBitmap(path, 1, 1);
    //             console.log("printed? --> " + (res == -1 ? "No" : "Yes"));
    //         }
    //         catch (e) {
    //             console.log(e);
    //         }
    //         this.cPCLPrinter.printForm();
    //     }

    // }
    public print(text: string) {

        if (this.ptrConn.isConnected()) {
            // console.log("printing: " + text);
            this.cPCLPrinter.setForm(0, 200, 200, 200, 1);
            this.cPCLPrinter.setMedia(com.sewoo.jpos.command.CPCLConst.LK_CPCL_CONTINUOUS);
            this.cPCLPrinter.printAndroidFont(text, this.paperSize, 26, 0, com.sewoo.jpos.command.ESCPOSConst.LK_ALIGNMENT_CENTER);;
            // this.cPCLPrinter.printCPCL2DBarCode(0, com.sewoo.jpos.command.CPCLConst.LK_CPCL_BCS_QRCODE, 150, 400, 5, 0, 1, 0, "http://www.miniprinter.com");
            this.cPCLPrinter.printForm();
        }
        else {
            console.log("printer is not connected");
        }
    }
}
