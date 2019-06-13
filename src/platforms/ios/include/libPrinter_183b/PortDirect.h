//
//  PortDirect.h
//  MobileLibrary
//
//  Created by swteam on 4/11/16.
//
//

#ifndef PortDirect_h
#define PortDirect_h

#import <Foundation/Foundation.h>
#import "CallbackData.h"
#import "EABluetoothPort.h"

// Printer model
#define LK_TXX_MODEL		0
#define LK_BXX_MODEL		1
#define LK_PXX_MODEL		2

@interface PortDirect : NSObject
{
}

- (id) init;
- (void) dealloc;

- (long) connect:(NSString*) portName withPortParam:(int) port;
- (long) disconnect;
- (long) sendChars:(unsigned char *)a charsToSend:(int)length;
- (long) sendString:(NSString*) stringToSend withEncoding:(NSStringEncoding) encoding;
- (long) recvChars:(unsigned char *)a charsToRecv:(int)length;
- (long) getModel;

// bluetooth only.
- (NSArray *) getConnectedPrinter;


@end

#endif /* PortDirect_h */
