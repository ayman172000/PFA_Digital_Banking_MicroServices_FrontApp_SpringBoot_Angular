import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {OperationService} from "../services/operation.service";
import {CreditDebitReq, Operation, TransferReq} from "../model/OperationModel";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {CompteDTO} from "../model/ClientAccountModel";
import {ClientAccountServicService} from "../services/client-account-servic.service";

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit{
  displayedColumns: string[] = ['operationId', 'operationDate', 'amount', 'type','compte','description'];
  dataSource!: MatTableDataSource<Operation>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  operationFromGroup!: FormGroup;
  param!: number;
  compte!:CompteDTO[]

  constructor(private _service:OperationService,
              private _serviceClient:ClientAccountServicService,
              private formBuilder:FormBuilder,
              private _route:ActivatedRoute,
              private location:Location,
              private router:Router) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this._serviceClient.getAllAccount().subscribe(data=>{
      this.compte=data
    })
    this.operationFromGroup=this.formBuilder.group({
      operationType : this.formBuilder.control(null),
      amount : this.formBuilder.control(0),
      description : this.formBuilder.control(null),
      accountDestination : this.formBuilder.control(null)
    })
    this.param = this._route.snapshot.params['id'];
    this._service.getHistoryAccount(this.param).subscribe(data=>{
      this.dataSource.data=data
    })
  }

  handleAccountOperation() {
    let accountId: string = this.operationFromGroup.value.accountId;
    let operationType = this.operationFromGroup.value.operationType;
    let amount: number = this.operationFromGroup.value.amount;
    let description: string = this.operationFromGroup.value.description;
    let accountDestination: string = this.operationFromGroup.value.accountDestination;
    if (operationType == 'DEBIT') {
      let req=new CreditDebitReq(this.param,amount,description)
      this._service.debit(req).subscribe({
        next: (data) => {
          alert("Success Credit");
          this.operationFromGroup.reset();
          this.refresh()
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else if (operationType == 'CREDIT') {
      let req=new CreditDebitReq(this.param,amount,description)
      this._service.credit(req).subscribe({
        next: (data) => {
          alert("Success Debit");
          this.operationFromGroup.reset();
          this.refresh()
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else if (operationType == 'TRANSFER') {
      let req=new TransferReq(this.param,Number(accountDestination),amount,description)
      this._service.transfer(req).subscribe({
        next: (data) => {
          alert("Success Transfer");
          this.operationFromGroup.reset();
          this.refresh()
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
  refresh(): void {
    this.router.navigateByUrl("refreshOperation", { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }
}
