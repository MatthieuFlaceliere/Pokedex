import { Component } from '@angular/core';
import { Observable, find, fromEvent } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sand-box',
  templateUrl: './sand-box.component.html',
  styleUrls: ['./sand-box.component.scss'],
})
export class SandBoxComponent {
  constructor(private http: HttpClient) {
    const keyLogger = fromEvent(document, 'keypress');

    // keyLogger.subscribe((x: any) => {
    //   this.http.post('http://localhost:8080/', { key: x.key }).subscribe();
    // });

    const res = keyLogger.pipe(find((x: any) => x.key === 'a'));
    res.subscribe((x: any) => {
      console.log(x.key);
    });
  }
}
