import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  name: string = '';
  age: number;
  found: boolean;
  personProfile = [];

  constructor(private httpClient: HttpClient) {}

  onNameKeyUp(event: any) {
    this.name = event.target.value;
    this.found = false;
    this.personProfile = [];
  }

  getProfile() {
    this.httpClient.get(`http://localhost:4002/profiles/?name=${this.name}`)
      .subscribe(
        (data: any[]) => {
          if (data.length) {
            this.found = true;
            this.personProfile = data[0];
          }
        }
      );
  }

}
