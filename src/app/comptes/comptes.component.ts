import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ClientDTO, CompteDTO} from "../model/ClientAccountModel";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ClientAccountServicService} from "../services/client-account-servic.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Location} from "@angular/common";
import {DialogClientComponent} from "../dialog-client/dialog-client.component";
import {DialogCompteComponent} from "../dialog-compte/dialog-compte.component";

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent implements OnInit{
  displayedColumns: string[] = ['compteId', 'createdAt', 'balance', 'status','client','overDraft','interestRate','action'];
  dataSource!: MatTableDataSource<CompteDTO>;
  courant: boolean=true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  clientId!: number;

  constructor(private _service:ClientAccountServicService,
              private route:ActivatedRoute,
              public dialog: MatDialog,
              private router:Router,
              private location:Location) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.params['id'];
    if(this.clientId)
    {
      this._service.getAllAccountsByClient(this.clientId).subscribe(data=>{
        this.dataSource.data=data
      })
      /*    if(this.route.snapshot.url[0].path="gestionDetailsFactures")
          {

          }*/
    }
    else
    {
      this._service.getAllAccount().subscribe(data=>{
        this.dataSource.data=data
      })
    }
  }

  openDialog() {
    this.dialog.open(DialogCompteComponent,{
      width:'30%'
    })
  }

  deleteAccount(row:CompteDTO) {
    this._service.deleteCompte(row.compteId).subscribe(data=>{
      alert("operation done")
      this.refresh()
    },
      error => {
      alert(error.error.message)
      })
  }

  editAccount(row:CompteDTO) {
    this.dialog.open(DialogCompteComponent,{
      width:'30%',
      data:row
    })
  }

  getHistory(row:CompteDTO) {
    this.router.navigateByUrl("operations/compte/"+row.compteId)
  }

  refresh(): void {
    this.router.navigateByUrl("refreshAccount", { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }
}
