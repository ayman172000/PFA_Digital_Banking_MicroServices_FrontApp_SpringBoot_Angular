import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../envirenement/environment";
import {CreditDebitReq, Operation, TransferReq} from "../model/OperationModel";

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private http:HttpClient) { }

  public getHistoryAccount(accountId:number)
  {
    return this.http.get<Operation[]>(environment.gateWayHost+"operations/comptes/"+accountId)
  }

  public debit(req:CreditDebitReq)
  {
    return this.http.post<Operation>(environment.gateWayHost+"operations/debit",req)
  }

  public credit(req:CreditDebitReq)
  {
    return this.http.post<Operation>(environment.gateWayHost+"operations/credit",req)
  }

  public transfer(req:TransferReq)
  {
    return this.http.post<Operation>(environment.gateWayHost+"operations/transfer",req)
  }
}
