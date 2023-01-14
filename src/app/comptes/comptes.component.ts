import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ClientDTO, CompteDTO} from "../model/ClientAccountModel";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ClientAccountServicService} from "../services/client-account-servic.service";

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent {
  displayedColumns: string[] = ['compteId', 'createdAt', 'balance', 'status','client','overDraft','interestRate'];
  dataSource!: MatTableDataSource<CompteDTO>;
  courant: boolean=true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _service:ClientAccountServicService) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this._service.getAllAccount().subscribe(data=>{
      this.dataSource.data=data
    })
  }
}
