import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../envirenement/environment";
import {ClientDTO, ClientReq, CompteDTO, CompteReq} from "../model/ClientAccountModel";

@Injectable({
  providedIn: 'root'
})
export class ClientAccountServicService {

  constructor(private http:HttpClient) { }

  public getAllClient()
  {
    return this.http.get<ClientDTO[]>(environment.clientAccountHost+"clients")
  }


  public getClientById(id:number)
  {
    return this.http.get<ClientDTO>(environment.clientAccountHost+"clients/"+id);
  }

  public updateClient(client:ClientDTO)
  {
    return this.http.put<ClientDTO>(environment.clientAccountHost+"clients/"+client.clientId,client)
  }

  public deleteClient(id:number)
  {
    return this.http.delete(environment.clientAccountHost="clients/"+id);
  }

  public saveClient(req:ClientReq)
  {
    return this.http.post<ClientDTO>(environment.clientAccountHost+"clients",req)
  }


  public getAllAccount()
  {
    return this.http.get<CompteDTO[]>(environment.clientAccountHost+"comptes")
  }


  public getCompteById(id:number)
  {
    return this.http.get<CompteDTO[]>(environment.clientAccountHost+"comptes/"+id)
  }

  public updateCompte(compte:CompteDTO)
  {
    return this.http.put<ClientDTO>(environment.clientAccountHost+"comptes/"+compte.compteId,compte)
  }

  public deleteCompte(id:number)
  {
    return this.http.delete(environment.clientAccountHost="comptes/"+id);
  }

  public saveCompte(req:CompteReq)
  {
    return this.http.post<ClientDTO>(environment.clientAccountHost+"comptes",req)
  }



}
