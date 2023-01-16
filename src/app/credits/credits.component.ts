import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ClientDTO} from "../model/ClientAccountModel";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ClientAccountServicService} from "../services/client-account-servic.service";
import {CreditDTO} from "../model/CreditModel";
import {CreditService} from "../services/credit.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent {
  displayedColumns: string[] = ['creditId','client', 'createdAt', 'dureeEnMois', 'montant'];
  dataSource!: MatTableDataSource<CreditDTO>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _service:CreditService,
              private router:Router) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this._service.getAllCredit().subscribe(data=>{
      this.dataSource.data=data
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToPredict() {
    this.router.navigateByUrl("/predict")
  }
}
