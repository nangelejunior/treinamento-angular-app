import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  providers: [DataService]
})
export class AccountPageComponent implements OnInit {
  public accounts: any[] = [];

  constructor(private dataService: DataService) {
    this.dataService
      .getAccounts()
      .subscribe(data => {
        this.accounts = data;
      });
  }

  ngOnInit() {
  }

  remove(account: any) {
    this.dataService
      .deleteAccount(account.id)
      .subscribe(data => {
        const index = this.accounts.indexOf(account);
        this.accounts.splice(index, 1);
        alert('Conta removida');
      });
  }

}
