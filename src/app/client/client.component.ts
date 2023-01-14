import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ClientDTO} from "../model/ClientAccountModel";
import {ClientAccountServicService} from "../services/client-account-servic.service";
import {DialogClientComponent} from "../dialog-client/dialog-client.component";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements AfterViewInit {
  displayedColumns: string[] = ['clientId', 'nom', 'prenom', 'email','action'];
  dataSource!: MatTableDataSource<ClientDTO>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _service:ClientAccountServicService,
              public dialog: MatDialog,
              private router:Router,
              private location:Location) {
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

  deleteClient(row:ClientDTO) {
    this._service.deleteClient(row.clientId).subscribe(data=>{
      alert("operation done")
      this.refresh();
    },error => {
      alert(error.error.message)
    })
  }

  editClient(row:ClientDTO) {
    this.dialog.open(DialogClientComponent,{
      width:'30%',
      data:row
    })
  }

  refresh(): void {
    this.router.navigateByUrl("refreshClient", { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

  getAccounts(row:ClientDTO) {
    this.router.navigateByUrl("comptes/client/"+row.clientId)
  }
}
