import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientAccountServicService} from "../services/client-account-servic.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {ClientDTO, CompteDTO, CompteReq} from "../model/ClientAccountModel";

@Component({
  selector: 'app-dialog-compte',
  templateUrl: './dialog-compte.component.html',
  styleUrls: ['./dialog-compte.component.css']
})
export class DialogCompteComponent implements OnInit{
  accountsForm!: FormGroup;
  actionBtn: string='Save';
  client!: ClientDTO[];
  selectedOption: string='CA';

  constructor(private formBuilder:FormBuilder,
              private service:ClientAccountServicService,
              private dialogRef:MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public handleEditAccount:CompteDTO,
              private location:Location,
              private router:Router) {
  }

  ngOnInit(): void {
    this.service.getAllClient().subscribe(data=>{
      this.client=data;
    })
    this.accountsForm=this.formBuilder.group({
      type:['',Validators.required],
      balance:['',[Validators.required,Validators.min(0)]],
      clientId:['',Validators.required],
      overDraft:[''],
      interestRate:['']
    })
    if(this.handleEditAccount)
    {
      this.actionBtn='Update'
      if(this.handleEditAccount.interestRate!=null)
      {
        this.selectedOption = 'SA'
        this.accountsForm.controls['balance'].setValue(this.handleEditAccount.balance)

        this.accountsForm.controls['interestRate'].setValue(this.handleEditAccount.interestRate)
      }
      else if(this.handleEditAccount.overDraft!=null) {
        this.selectedOption = 'CA'
        this.accountsForm.controls['balance'].setValue(this.handleEditAccount.balance)
        this.accountsForm.controls['overDraft'].setValue(this.handleEditAccount.overDraft)
      }
    }
  }

  updateAccount() {
    if(this.handleEditAccount.interestRate!=null)
    {
      this.selectedOption='SA'
      let balance=this.accountsForm.controls['balance'].value
      let interestRate=this.accountsForm.controls['interestRate'].value
      let compte=new CompteDTO(this.handleEditAccount.compteId,
        balance,
        this.handleEditAccount.createdAt,
        this.handleEditAccount.status,
        this.handleEditAccount.client,
        Number(interestRate),
        Number(this.handleEditAccount.overDraft))
      this.service.updateCompte(compte).subscribe(data=>{
          alert("operation done");
          this.accountsForm.reset();
          this.dialogRef.close();
          this.refresh()
        },
        error => {
          alert(error.error.message)
        })
    }
    else if(this.handleEditAccount.overDraft!=null)
    {
      this.selectedOption='CA'
      let balance=this.accountsForm.controls['balance'].value
      let overDraft=this.accountsForm.controls['overDraft'].value
      let compte=new CompteDTO(this.handleEditAccount.compteId,
        balance,
        this.handleEditAccount.createdAt,
        this.handleEditAccount.status,
        this.handleEditAccount.client,
        Number(overDraft),
        Number(this.handleEditAccount.interestRate))
      this.service.updateCompte(compte).subscribe(data=>{
          alert("operation done");
          this.accountsForm.reset();
          this.dialogRef.close();
          this.refresh()
        },
        error => {
          alert(error.error.message)
        })
    }
  }

  addAccount() {
    if(this.accountsForm.controls['type'].value=='CA')
    {
      let balance=this.accountsForm.controls['balance'].value
      let overDraft=this.accountsForm.controls['overDraft'].value
      let clientId=this.accountsForm.controls['clientId'].value
      let interestRate=0;
      let req=new CompteReq(balance,clientId,overDraft,interestRate)
      this.service.saveCompte(req).subscribe(data=>{
          alert("operation done");
          this.accountsForm.reset();
          this.dialogRef.close();
          this.refresh()
        },
        error => {
          alert(error.error.message)
        })
    }
    else if(this.accountsForm.controls['type'].value=='SA')
    {
      let balance=this.accountsForm.controls['balance'].value
      let interestRate=this.accountsForm.controls['interestRate'].value
      let clientId=this.accountsForm.controls['clientId'].value
      let overDraft=0;
      let req=new CompteReq(balance,clientId,overDraft,interestRate)
      this.service.saveCompte(req).subscribe(data=>{
          alert("operation done");
          this.accountsForm.reset();
          this.dialogRef.close();
          this.refresh()
        },
        error => {
          alert(error.error.message)
        })
    }
  }

  refresh(): void {
    this.router.navigateByUrl("refreshAccount", { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }
}
