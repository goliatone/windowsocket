//
//  AppDelegate.h
//  WindowSocketService
//
//  Created by Emiliano on 10/22/14.
//  Copyright (c) 2014 Goliatone. All rights reserved.
//

#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>
@interface AppDelegate : NSObject <NSApplicationDelegate>

@property (weak) IBOutlet NSWindow *window;
@property (assign) IBOutlet WebView *webView;

@end

