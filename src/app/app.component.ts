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
  allProfiles = [];

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
  } // end of getProfile()

  postProfile(nameToAdd, ageToAdd) {
    this.httpClient.post('http://localhost:4002/profiles',
    {
      name: nameToAdd,
      age: ageToAdd
    })
    .subscribe(
      (data: any) => {
        console.log(data);
        this.onGetAllProfiles();
      }
    );

  } // end of postProfile

  onGetAllProfiles() {
    this.httpClient.get('http://localhost:4002/profiles')
    .subscribe(
      (data: any[]) => {
        console.log(data);
        this.allProfiles = data;
      }
    );
  } // end of onGetAllProfiles();

}
