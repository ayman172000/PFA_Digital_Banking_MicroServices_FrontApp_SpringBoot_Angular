import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {OperationService} from "../services/operation.service";
import {Operation} from "../model/OperationModel";
import {FormBuilder, FormGroup} from "@angular/forms";

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

  constructor(private _service:OperationService,
              private formBuilder:FormBuilder) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this._service.getHistoryAccount(12).subscribe(data=>{
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

  ngOnInit(): void {
    this.operationFromGroup=this.formBuilder.group({
      operationType : this.formBuilder.control(null),
      amount : this.formBuilder.control(0),
      description : this.formBuilder.control(null),
      accountDestination : this.formBuilder.control(null)
    })
  }

  handleAccountOperation() {

  }
}
