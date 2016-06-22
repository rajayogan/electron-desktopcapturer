
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component, OnInit} from '@angular/core';
import {desktopCapturer} from 'electron';

@Component({
    selector: 'myapp',
    template: '<h1>Angular 2 app inside a desktop app</h1><video id="raja" autoplay></video>'
})

export class AppComponent implements OnInit {
    constructor() {
        
    }
    
    ngOnInit() {
        let n = <any>navigator;
        let myvid = <HTMLInputElement>document.getElementById('raja');
        desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
            console.log(sources);
  if (error) throw error;
  for (let i = 0; i < sources.length; ++i) {
    if (sources[i].name === 'Home') {
      n.webkitGetUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sources[i].id,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720
          }
        }
      }, gotStream, getUserMediaError);
      return;
    }
  }
});

function gotStream(stream) {
  myvid.src = URL.createObjectURL(stream);
}

function getUserMediaError(e) {
  console.log('getUserMediaError');
}
    }
}

bootstrap(AppComponent);

