import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DatePipe } from '@angular/common';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-edit-account-page',
  templateUrl: './edit-account-page.component.html',
  providers: [FormBuilder, DataService]
})
export class EditAccountPageComponent implements OnInit {
  public id: string = '';
  public form: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) {
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
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getAccount(this.id);
    });
  }

  getAccount(id) {
    var datePipe = new DatePipe("en-US");

    this.dataService
      .getAccount(id)
      .subscribe(data => {
        this.form.controls['date'].setValue(datePipe.transform(data.date, 'yyyy-MM-dd'));
        this.form.controls['accountType'].setValue(data.accountType);
        this.form.controls['description'].setValue(data.description);
        this.form.controls['value'].setValue(data.value);
      });
  }

  submit() {
    this.dataService
      .putAccount(this.id, this.form.value)
      .subscribe(data => {
        this.router.navigateByUrl('/accounts');
      });
  }
}
