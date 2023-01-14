import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../envirenement/environment";
import {CreditDTO, CreditReq} from "../model/CreditModel";

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  constructor(private http:HttpClient) { }

  public getAllCredit()
  {
    return this.http.get<CreditDTO[]>(environment.creditHost+"credits")
  }


  public getAllCreditById(id:number)
  {
    return this.http.get<CreditDTO>(environment.creditHost+"credits/"+id)
  }

  public saveCredit(req:CreditReq)
  {
    return this.http.post(environment.creditHost+"credits",req)
  }
}
