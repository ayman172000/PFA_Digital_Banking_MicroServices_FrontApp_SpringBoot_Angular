import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientDTO, ClientReq} from "../model/ClientAccountModel";
import {ClientAccountServicService} from "../services/client-account-servic.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Location} from "@angular/common";


@Component({
  selector: 'app-dialog-client',
  templateUrl: './dialog-client.component.html',
  styleUrls: ['./dialog-client.component.css']
})
export class DialogClientComponent implements OnInit{
  ClientForm!: FormGroup;
  actionBtn: string='Save';
  name:string='';
  constructor(private formBuilder:FormBuilder,
              private _service:ClientAccountServicService,
              private dialogRef:MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public handleEditClient:any,
              private location:Location,
              private router:Router) {
  }

  ngOnInit(): void {
    this.ClientForm=this.formBuilder.group({
      nom:['',Validators.required],
      prenom:['',Validators.email],
      email:['',Validators.required],
    })
    if(this.handleEditClient)
    {
      this.ClientForm.controls['nom'].setValue(this.handleEditClient.nom)
      this.ClientForm.controls['prenom'].setValue(this.handleEditClient.prenom)
      this.ClientForm.controls['email'].setValue(this.handleEditClient.email)
      this.actionBtn='Update'
    }
  }


  addClient() {
    let nom=this.ClientForm.controls['nom'].value;
    let prenom=this.ClientForm.controls['prenom'].value;
    let email=this.ClientForm.controls['email'].value;
    let req=new ClientReq(nom,prenom,email);
    this._service.saveClient(req).subscribe(data=>{
      alert("operation done");
      this.ClientForm.reset();
      this.dialogRef.close();
      this.refresh()
    },
      error => {
      alert(error.error.message)
      })
  }

  updateClient() {
    let nom=this.ClientForm.controls['nom'].value;
    let prenom=this.ClientForm.controls['prenom'].value;
    let email=this.ClientForm.controls['email'].value;
    let client=new ClientDTO(this.handleEditClient.clientId,nom,prenom,email)
    this._service.updateClient(client).subscribe(data=>{
        alert("operation done");
        this.ClientForm.reset();
        this.dialogRef.close();
        this.refresh()
      },
      error => {
        alert(error.error.message)
      })
  }

  refresh(): void {
    this.router.navigateByUrl("refreshClient", { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }
}
