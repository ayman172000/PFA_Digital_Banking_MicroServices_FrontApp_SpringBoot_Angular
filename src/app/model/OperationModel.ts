import {CompteDTO} from "./ClientAccountModel";

export interface Operation {
  operationId: number;
  operationDate: Date;
  amount: number;
  type: string;
  compteId: number;
  compte: CompteDTO;
  description: string;
}

export class CreditDebitReq {
  compteId: number;
  montant: number;
  descr: string;


  constructor(compteId: number, montant: number, descr: string) {
    this.compteId = compteId;
    this.montant = montant;
    this.descr = descr;
  }
}

export class TransferReq {
  compteIdSrc: number;
  compteIdDest: number;
  montant: number;
  description: string;


  constructor(compteIdSrc: number, compteIdDest: number, montant: number, description: string) {
    this.compteIdSrc = compteIdSrc;
    this.compteIdDest = compteIdDest;
    this.montant = montant;
    this.description = description;
  }
}
