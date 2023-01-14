export class ClientDTO {
  clientId: number;
  nom: string;
  prenom: string;
  email: string;


  constructor(clientId: number, nom: string, prenom: string, email: string) {
    this.clientId = clientId;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
  }
}

export class CompteDTO {
  compteId: number;
  balance: number;
  createdAt: Date;
  status: string;
  client: ClientDTO;
  overDraft?: number;
  interestRate?: number;


  constructor(compteId: number, balance: number, createdAt: Date, status: string, client: ClientDTO, overDraft: number, interestRate: number) {
    this.compteId = compteId;
    this.balance = balance;
    this.createdAt = createdAt;
    this.status = status;
    this.client = client;
    this.overDraft = overDraft;
    this.interestRate = interestRate;
  }
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
