import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ClientDTO} from "../model/ClientAccountModel";
import {ClientAccountServicService} from "../services/client-account-servic.service";
import {DialogClientComponent} from "../dialog-client/dialog-client.component";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements AfterViewInit {
  displayedColumns: string[] = ['clientId', 'nom', 'prenom', 'email'];
  dataSource!: MatTableDataSource<ClientDTO>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _service:ClientAccountServicService,
              public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this._service.getAllClient().subscribe(data=>{
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

  sortData($event: any) {

  }

  openDialog() {
    this.dialog.open(DialogClientComponent,{
      width:'30%'
    })
  }
}
