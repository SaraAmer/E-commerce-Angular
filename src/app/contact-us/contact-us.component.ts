import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  alert: boolean = false;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  onSubmit(data, f: NgForm) {
    this.http
      .post(
        'https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us',
        data
      )
      .subscribe((result) => {
        console.log(result);
        this.alert = true;
        f.resetForm();
      });
    console.log(data);
  }
  closeAlert() {
    this.alert = false;
  }
}
