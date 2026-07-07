import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Contract {
  id: string;
  contractCode: string;
  projectId: string;
  title: string;
  counterpartyName: string;
  type: number; // 1: Ana Sözleşme, 2: Taşeron
  contractValue: number;
  currency: string;
  signingDate: string;
  penaltyRate: string;
  status: number;
  aiStatus: number;
  revisionNumber: number;
}

@Injectable({
  providedIn: 'root'
})

export class ContractService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5277/api/contracts';

  getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(this.apiUrl);
  }

  createContract(contractData: any): Observable<string> {
    return this.http.post<string>(this.apiUrl, contractData);
  }
}
