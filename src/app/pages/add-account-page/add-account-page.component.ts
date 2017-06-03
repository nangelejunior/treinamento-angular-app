import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-add-account-page',
  templateUrl: './add-account-page.component.html',
  providers: [FormBuilder, DataService]
})
export class AddAccountPageComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {
    this.form = this.fb.group({
      date: ['', Validators.compose([
        Validators.required
      ])],
      accountType: ['', Validators.compose([
        Validators.required
      ])],
      description: ['', Validators.compose([
        Validators.required
      ])],
      value: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  ngOnInit() {
  }

  submit() {
    this.dataService
      .postAccount(this.form.value)
      .subscribe(data => {
        this.router.navigateByUrl('/accounts');
      });
  }

}
