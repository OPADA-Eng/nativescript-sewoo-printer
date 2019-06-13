//
//  PortInterface.h
//  iOS
//
//  Created by leesk on 11. 11. 23..
//  Copyright 2011. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CallbackData.h"
#import "EABluetoothPort.h"

#define PORT_TCP        0
#define PORT_BLUETOOTH  1

extern int portMode;

@interface PortInterface : NSObject 
{
	BOOL m_start;
	id m_callbackObject;
	SEL m_callbackSelector;
	// queue;
    NSOperationQueue * theQueue;
}

- (id) init;
- (void) dealloc;

- (NSArray *) getConnectedPrinter; // Added for bluetooth
- (long) connect:(NSString*) portName withPortParam:(int) port;
- (long) disconnect;
- (long) sendChars:(unsigned char *)a charsToSend:(int)length;
- (long) sendString:(NSString*) stringToSend withEncoding:(NSStringEncoding) encoding;
- (long) recvChars:(unsigned char *)a charsToRecv:(int)length;

- (void) activateReader;
- (void) deactivateReader;
- (void) registerCallback:(id) object withSelctor:(SEL) selector;
- (void) unregisterCallback;

// MSR
- (void) activateMSR;
- (void) deactivateMSR;

// Bluetooth only.
- (long) connectReset:(NSString*) portName withPortParam:(int) port;
- (long) disconnectReset;

// Wi-Fi only
- (long) nonBlocking;
- (long) setBlocking;
- (int) getSock;

@end
