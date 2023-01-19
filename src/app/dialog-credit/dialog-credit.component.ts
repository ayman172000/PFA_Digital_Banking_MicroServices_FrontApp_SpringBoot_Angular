import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientDTO} from "../model/ClientAccountModel";
import {ClientAccountServicService} from "../services/client-account-servic.service";
import {CreditService} from "../services/credit.service";
import {CreditReq} from "../model/CreditModel";
import { Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-credit',
  templateUrl: './dialog-credit.component.html',
  styleUrls: ['./dialog-credit.component.css']
})
export class DialogCreditComponent implements OnInit{
  creditForm!: FormGroup;
  client!: ClientDTO[];


  constructor(private _formBuilder:FormBuilder,
              private _serviceClient:ClientAccountServicService,
              private _service:CreditService,
              private _router:Router,
              private dialogRef:MatDialogRef<any>) {
  }

  ngOnInit(): void {
    this._serviceClient.getAllClient().subscribe(data=>{
      this.client=data
    })
    this.creditForm=this._formBuilder.group({
      amount:['',[Validators.required,Validators.min(1000)]],
      dim:['',[Validators.required,Validators.min(1)]],
      client:['',Validators.required],
    })

  }

  addCredit() {
    if(this.creditForm.valid)
    {
      let amount=this.creditForm.controls['amount'].value
      let dim=this.creditForm.controls['dim'].value
      let client=this.creditForm.controls['client'].value
      let req=new CreditReq(amount,dim,client)
      this._service.saveCredit(req).subscribe(data=>{
        this._router.navigateByUrl("/credits")
        this.creditForm.reset()
        this.dialogRef.close()
      },
        error => {
        alert(error.errors.message)
        })
    }
  }
}
