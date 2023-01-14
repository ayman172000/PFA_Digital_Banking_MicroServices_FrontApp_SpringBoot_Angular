import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog-client',
  templateUrl: './dialog-client.component.html',
  styleUrls: ['./dialog-client.component.css']
})
export class DialogClientComponent implements OnInit{
  ClientForm!: FormGroup;
  actionBtn: string='save';
  constructor(private formBuilder:FormBuilder) {
  }

  ngOnInit(): void {
    this.ClientForm=this.formBuilder.group({
      nom:['',Validators.required],
      prenom:['',Validators.email],
      email:['',Validators.required],
    })
  }


  addClient() {

  }

  updateClient() {

  }
}
