import {ClientDTO} from "./ClientAccountModel";

export interface CreditDTO {
  montant: number;
  dureeEnMois: number;
  createdAt: Date;
  client: ClientDTO;
  creditId: number;
}

export class CreditReq {
  montant: number;
  dureeEnMois: number;
  clientId: number;


  constructor(montant: number, dureeEnMois: number, clientId: number) {
    this.montant = montant;
    this.dureeEnMois = dureeEnMois;
    this.clientId = clientId;
  }
}
