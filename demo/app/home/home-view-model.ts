import { Observable } from "tns-core-modules/data/observable";
import { SewooPrinter } from 'nativescript-sewoo-printer';
import * as imageModule from 'tns-core-modules/ui/image';
import * as imageSrc from 'tns-core-modules/image-source';
import * as Image from "tns-core-modules/ui/image";
declare var android;

export class HomeViewModel extends Observable {
    public printer: SewooPrinter;
    constructor(public page) {
        super();
        this.printer = new SewooPrinter("windows-1256");

    }

    public screenShot(view) {
        view.android.setDrawingCacheEnabled(true);
        view.android.buildDrawingCache(true);
        var bmp = android.graphics.Bitmap.createBitmap(view.android.getDrawingCache());
        view.android.setDrawingCacheEnabled(false);
        var source = new imageSrc.ImageSource();
        source.setNativeSource(bmp);
        let image = new Image.Image();
        image.src = source;
        let sView = this.page.getViewById('screenShots');
        sView.addChild(image);
        return bmp;
    }
    connect() {
        try {
            this.printer.connect("00:13:7B:49:D3:1A");
        }
        catch (e) {
            console.log(e);
        }
    }
    disconnect() {
        this.printer.disconnect();
    }

    printImg() {
        let view = this.page.getViewById("printArea");
        let imageSource = this.screenShot(view);
        // this.printer.printImg("//sdcard//temp//test//Sewoo_bw_m.jpg");
        // let size:any = view.getActualSize();
        this.printer.printImg(imageSource);
        // this.printer.print("Hello World");
    }
    printImgPath() {
        this.printer.printImgPath("//emulated//0//WhatsApp//Media//WhatsApp Images//IMG-20181206-WA0005.jpeg");
    }
    print() {
        // let imageSource = this.screenShot(this.page.getViewById("printArea"));
        // this.printer.printImg("//sdcard//temp//test//Sewoo_bw_m.jpg");
        this.printer.print("مرحبا");
        this.printer.print("Hello");
    }
}
