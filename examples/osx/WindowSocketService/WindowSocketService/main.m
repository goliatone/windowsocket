//
//  main.m
//  WindowSocketService
//
//  Created by Emiliano on 10/22/14.
//  Copyright (c) 2014 Goliatone. All rights reserved.
//

#import <Cocoa/Cocoa.h>

int main(int argc, const char * argv[]) {
    [[NSUserDefaults standardUserDefaults] setBool:TRUE forKey:@"WebKitDeveloperExtras"];
    [[NSUserDefaults standardUserDefaults] synchronize];
    return NSApplicationMain(argc, argv);
}
