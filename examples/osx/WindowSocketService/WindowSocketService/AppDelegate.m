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
    
    [self initializeBridgeWithWebView:self.webView];
}

- (void)applicationWillTerminate:(NSNotification *)aNotification {
    // Insert code here to tear down your application
}

-(void) initializeBridgeWithWebView:(WebView *)vewView
{
    vewView.frameLoadDelegate = self;
    vewView.resourceLoadDelegate = self;
    vewView.policyDelegate = self;
}

-(void)webView:(WebView *)sender didFinishLoadForFrame:(WebFrame *)frame
{
    if(![[sender stringByEvaluatingJavaScriptFromString:@"typeof WindowSocketTCP == 'object'"] isEqualToString:@"true"]){
        NSBundle *bundle = [NSBundle mainBundle];
        NSString *filePath = [bundle pathForResource:@"WindowSocketTCP.js" ofType:@"txt"];
        NSString *js = [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
        [sender stringByEvaluatingJavaScriptFromString:js];
    }
}

-(void)webView:(WebView *)sender didFailLoadWithError:(NSError *)error forFrame:(WebFrame *)frame
{
    
}

-(void)webView:(WebView *)webView decidePolicyForNavigationAction:(NSDictionary *)actionInformation request:(NSURLRequest *)request frame:(WebFrame *)frame decisionListener:(id<WebPolicyDecisionListener>)listener
{
    
}

-(void)webView:(WebView *)sender didCommitLoadForFrame:(WebFrame *)frame
{
    
}

-(NSURLRequest *)webView:(WebView *)sender resource:(id)identifier willSendRequest:(NSURLRequest *)request redirectResponse:(NSURLResponse *)redirectResponse fromDataSource:(WebDataSource *)dataSource
{
    if(sender != _webView) {return request;}
    
    return request;
}

@end
