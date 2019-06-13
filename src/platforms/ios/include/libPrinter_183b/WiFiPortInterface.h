//
//  WiFiPortInterface.h
//  iOS
//
//  Created by sooh on 2017. 11. 2330
//  Copyright 2011. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CallbackData.h"
#import "EABluetoothPort.h"

#define PORT_TCP        0
#define PORT_BLUETOOTH  1

extern int portWiFiMode;

@interface WiFiPortInterface : NSObject
{
	BOOL m_start;
	id m_callbackObject;
	SEL m_callbackSelector;
	// queue;
    NSOperationQueue * theQueue;
}

- (id) init;
- (void) dealloc;

- (NSArray *) getConnectedPrinterWiFi; // Added for bluetooth
- (long) connectWiFi:(NSString*) portName withPortParam:(int) port;
- (long) disconnectWiFi;
- (long) sendCharsWiFi:(unsigned char *)a charsToSend:(int)length;
- (long) sendStringWiFi:(NSString*) stringToSend withEncoding:(NSStringEncoding) encoding;
- (long) recvCharsWiFi:(unsigned char *)a charsToRecv:(int)length;

- (void) activateReaderWiFi;
- (void) deactivateReaderWiFi;
- (void) registerCallbackWiFi:(id) object withSelctor:(SEL) selector;
- (void) unregisterCallbackWiFi;

// MSR
- (void) activateMSRWiFi;
- (void) deactivateMSRWiFi;

// Bluetooth only.
- (long) connectResetWiFi:(NSString*) portName withPortParam:(int) port;
- (long) disconnectResetWiFi;

// Wi-Fi only
- (long) nonBlockingWiFi;
- (long) setBlockingWiFi;
- (int) getSockWiFi;

@end
