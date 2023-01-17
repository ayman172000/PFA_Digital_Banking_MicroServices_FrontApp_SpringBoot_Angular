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
    return this.http.get<ClientDTO[]>(environment.gateWayHost+"clients")
  }


  public getClientById(id:number)
  {
    return this.http.get<ClientDTO>(environment.gateWayHost+"clients/"+id);
  }

  public updateClient(client:ClientDTO)
  {
    return this.http.put<ClientDTO>(environment.gateWayHost+"clients/"+client.clientId,client)
  }

  public deleteClient(id:number)
  {
    return this.http.delete(environment.gateWayHost="clients/"+id);
  }

  public saveClient(req:ClientReq)
  {
    return this.http.post<ClientDTO>(environment.gateWayHost+"clients",req)
  }


  public getAllAccount()
  {
    return this.http.get<CompteDTO[]>(environment.gateWayHost+"comptes")
  }


  public getCompteById(id:number)
  {
    return this.http.get<CompteDTO[]>(environment.gateWayHost+"comptes/"+id)
  }

  public updateCompte(compte:CompteDTO)
  {
    return this.http.put<ClientDTO>(environment.gateWayHost+"comptes/"+compte.compteId,compte)
  }

  public deleteCompte(id:number)
  {
    return this.http.delete(environment.gateWayHost="comptes/"+id);
  }

  public saveCompte(req:CompteReq)
  {
    return this.http.post<ClientDTO>(environment.gateWayHost+"comptes",req)
  }

  public getAllAccountsByClient(id:number)
  {
    return this.http.get<CompteDTO[]>(environment.gateWayHost+"comptes/clients/"+id)
  }



}
