//
//  EPLPrinter.h
//  iOS
//
//  Created by Sang-ok OH on 16. 03. 17..
//  Copyright 2016. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>

// EPL SetupPrinter result
#define LK_SUCCESS		0
#define LK_FAIL			-1
#define LK_INVALID_WIDTH		-2
#define LK_INVALID_HEIGHT		-3
#define LK_INVALID_MEDIA_TYPE	-4
#define LK_INVALID_GAPHEIGHT	-5
#define LK_INVALID_OFFSET	-6
#define LK_INVALID_DENSITY	-7
#define LK_INVALID_SPEED		-8
#define LK_INVALID_ROTATE	-9

// Printing results
#define LK_EPL_STS_NORMAL		0
#define LK_EPL_STS_PRINTING		1
#define LK_EPL_STS_PAPER_EMPTY		2
#define LK_EPL_STS_COVER_OPEN		4
#define LK_EPL_STS_UNKNOWN		8

// Media Type
/**  Label with Gap. */
#define LK_EPL_LABEL		0
/**  Label with Black Mark. */
#define LK_EPL_BLACKMARK	1
/**  Continuous Label. */
#define LK_EPL_CONTINUOUS	2

// Device Font (Bitmap)
#define LK_EPL_FONT_0		0
#define LK_EPL_FONT_1		1
#define LK_EPL_FONT_2		2
#define LK_EPL_FONT_4		4
#define LK_EPL_FONT_5		5

// Barcode Types
extern NSString * const LK_EPL_BCS_39F;
extern NSString * const LK_EPL_BCS_39C; 
extern NSString * const LK_EPL_BCS_93;  	
extern NSString * const LK_EPL_BCS_UCC;  	
extern NSString * const LK_EPL_BCS_128AUTO; 	
extern NSString * const LK_EPL_BCS_128A; 	
extern NSString * const LK_EPL_BCS_128B;  
extern NSString * const LK_EPL_BCS_128C;  
extern NSString * const LK_EPL_BCS_CODABAR;  
extern NSString * const LK_EPL_BCS_EAN8; 
extern NSString * const LK_EPL_BCS_EAN82; 
extern NSString * const LK_EPL_BCS_EAN85;  
extern NSString * const LK_EPL_BCS_EAN13;  
extern NSString * const LK_EPL_BCS_EAN132;  
extern NSString * const LK_EPL_BCS_EAN135;  
extern NSString * const LK_EPL_BCS_GER_POST;  
extern NSString * const LK_EPL_BCS_I2OF5;  
extern NSString * const LK_EPL_BCS_I2OF5_C; 
extern NSString * const LK_EPL_BCS_I2OF5_H;  
extern NSString * const LK_EPL_BCS_POSTNET;  
extern NSString * const LK_EPL_BCS_JPN_POST;  
extern NSString * const LK_EPL_BCS_UCCEAN_128;  
extern NSString * const LK_EPL_BCS_UPCA;  
extern NSString * const LK_EPL_BCS_UPCA2; 
extern NSString * const LK_EPL_BCS_UPCA5;  
extern NSString * const LK_EPL_BCS_UPCE;
extern NSString * const LK_EPL_BCS_UPCE2;  
extern NSString * const LK_EPL_BCS_UPCE5;  
extern NSString * const LK_EPL_BCS_UPC_I2OF5;
extern NSString * const LK_EPL_BCS_MSI1C;  
extern NSString * const LK_EPL_BCS_MSI3C;  

// Justification
#define LK_EPL_LEFT		0
#define LK_EPL_CENTER		1
#define LK_EPL_RIGHT		2

// Rotation
#define LK_EPL_NO_ROTATION		0
#define LK_EPL_0_ROTATION		0
#define LK_EPL_90_ROTATION		90
#define LK_EPL_180_ROTATION		180
#define LK_EPL_270_ROTATION		270

// RSS-14(GS1)
#define LK_EPL_RSS14                1
#define LK_EPL_RSS14_TRUNCATED		2
#define LK_EPL_RSS14_STACKED		3
#define LK_EPL_RSS14_STACKED_OMNI	4
#define LK_EPL_RSS_LIMITED          5
#define LK_EPL_RSS_EXP_STACK		6

@interface EPLPrinter : NSObject 
{
	NSStringEncoding encoding;
}

// EPL Property for encoding.
@property (nonatomic) NSStringEncoding encoding;

- (long) openPort:(NSString*)portName withPortParam:(int) port;
- (long) closePort;

// EPL Command methods.
- (long) setupPrinter:(NSString *) LabelWidth withHeight:(NSString *) LabelHeight withMedia:(int) MediaType withGapHeight:(NSString *) GapHeight
	withOffset:(NSString *) Offset withDensity:(int) Density withSpeed:(int) Speed withRotate180:(int) Rotate180;
- (long) endPage:(int) nCopy;
- (long) printDeviceFont:(int) x withY:(int) y withRotation:(int) rotation withFontNumber:(int) fontNumber
	withHoriExpand:(int) horiExpand withVertExpand:(int) veriExpand withReverse:(int) reverse withData:(NSString *) data;
- (long) printBarCode:(int) x withY:(int) y withRotation:(int) rotation withSymbology:(NSString *) symbology
	withNarrowWidth:(int) NarrowWidth withWideWidth:(int) WideWidth withBarHeight:(int) BarHeight withReadable:(int) Readable withData:(NSString *) data;
- (long) printQRCode:(int) x withY:(int) y withModel:(int) model withCellSize:(int) cellSize withCorrectLevel:(int) correctLevel withData:(NSString *) data;
- (long) printDataMatrix:(int) x withY:(int) y withRotation:(int) rotation withCellSize:(int) cellSize withData:(NSString *) data;
- (long) printPDF417:(int) x withY:(int) y withXTotal:(int) xtotal withYTotal:(int) ytotal withXDots:(int) xdots withYDots:(int) ydots withData:(NSString *) data;
- (long) printGS1:(int) x withY:(int) y withSymbology:(int) symbology withMagnification:(int) magnification withSepHeight:(int) sepHeight
	withBarHeight:(int) barHeight withSegment:(int) segment withLevel:(int) level withData:(NSString *) data;
- (long) printLine:(int) x withY:(int) y withHoriSize:(int) horiSize withVertSize:(int) vertSize;
- (long) printDiagonalLine:(int) x withY:(int) y withEX:(int) ex withEY:(int) ey withThick:(int) thick;
- (long) printBox:(int) x withY:(int) y withEX:(int) ex withEY:(int) ey withThick:(int) thick;
- (long) printImage:(NSString *) filePath withPrintX:(int) printX withPrintY:(int) printY withBrightness:(int) bright;

// Added in 1.77b.
- (long) printBitmap:(NSString *) filePath withPrintX:(int) printX withPrintY:(int) printY withBrightness:(int) bright;
// Added in 1.77b for custom image.
- (long) printUIImage:(UIImage *) imgApp withPrintX:(int) printX withPrintY:(int) printY withBrightness:(int) bright;
// Added in 1.77b for web.
- (long) printNormalWeb:(NSString *) normalData;
//////////////////////////////////

// Added in 1.77b for iOS font.
- (long) printIOSFont:(int) rotation withPrintX:(int) printX withPrintY:(int) printY withFontName:(NSString *)fontName withBold:(int)bold withItalic:(int)italic withUnderline:(int)underline withData:(NSString *)data withMaxWidth:(int)maxWidth withFontSize:(int)fontdotsize withReverse:(int)reverse;

// Added in 1.80b for PDF file print
- (long) printPDFFile:(NSString *) filePath withPage:(int) printPage withPrintWidth:(int) pSize;
// Added in 1.80b for file print
- (long) printFile:(NSString *)filePath;

@end