import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'english words trainer';

  messages = [
    {
      from: 'Photos',
      subject: 'lorem5',
      content: 'Lorem ipsum dolor sit amet.'
    },
    {
      from: 'Photos',
      subject: 'lorem5',
      content: 'Lorem ipsum dolor sit amet.'
    },
    {
      from: 'Photos',
      subject: 'lorem5',
      content: 'Lorem ipsum dolor sit amet.'
    }
  ];
}
