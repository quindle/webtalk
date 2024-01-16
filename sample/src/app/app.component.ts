import { Component } from '@angular/core';
import { WebTalkLib } from 'webtalklib'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sample';

  lib = new WebTalkLib()

}
