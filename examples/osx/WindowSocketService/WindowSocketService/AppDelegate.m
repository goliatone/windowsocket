//
//  AppDelegate.m
//  WindowSocketService
//
//  Created by Emiliano on 10/22/14.
//  Copyright (c) 2014 Goliatone. All rights reserved.
//

#import "AppDelegate.h"

@interface AppDelegate ()

//@property (weak) IBOutlet NSWindow *window;

@end

@implementation AppDelegate

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification {
    // Insert code here to initialize your application
    // Insert code here to initialize your application
    NSRect frame = [NSScreen mainScreen].frame;
    [self.window setFrame:frame display:YES animate:YES];
    
    NSURL *url = [[NSBundle mainBundle] URLForResource:@"index" withExtension:@"html"];
//    NSURL *url = [NSURL URLWithString:@"http://goliatone.com"];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [[[self webView] mainFrame] loadRequest:request];
    
    [self.window setContentView:self.webView];
    
    [self.window setTitle:@"goliatone"];
}

- (void)applicationWillTerminate:(NSNotification *)aNotification {
    // Insert code here to tear down your application
}

@end
