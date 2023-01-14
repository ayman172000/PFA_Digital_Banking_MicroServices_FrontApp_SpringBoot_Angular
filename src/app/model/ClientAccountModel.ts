export interface ClientDTO {
  clientId: number;
  nom: string;
  prenom: string;
  email: string;
}

export interface CompteDTO {
  compteId: number;
  balance: number;
  createdAt: Date;
  status: string;
  client: ClientDTO;
  overDraft?: number;
  interestRate?: number;
}

export class CompteReq {
  balance: number;
  clientId: number;
  overDraft?: number;
  interestRate?: number;


  constructor(balance: number, clientId: number, overDraft: number, interestRate: number) {
    this.balance = balance;
    this.clientId = clientId;
    this.overDraft = overDraft;
    this.interestRate = interestRate;
  }
}

export class ClientReq {
  nom: string;
  prenom: string;
  email: string;

  constructor(nom: string, prenom: string, email: string) {
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
  }
}
