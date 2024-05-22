import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class SmartContractService {

  constructor(private http: HttpClient) {}

  getAnalysisHistory(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:6001/analysisHistory/${userId}`);
  }

  searchAnalysis(userId: number, name: string, type: string, date: string): Observable<any[]> {
    console.log('Search called with userId:', userId); 
    return this.http.get<any[]>(`http://localhost:6001/searchAnalysis`, {
      params: { userId, name, type, date }
    });
  }
  
  // Utility function to escape special characters for JSON string
  escapeForJson(str: string): string {
    return str
      .replace(/\\/g, '\\\\')  // Escape backslashes
      .replace(/"/g, '\\"')    // Escape double-quotes
      .replace(/\n/g, '\\n')   // Escape newlines
      // ... add other escapes if necessary
  }

  // Fetch contract details by address
  fetchContractByAddress(contractAddress: string): Observable<any> {
    const payload = { contractAddr: contractAddress };
    return this.http.post<any>(`http://localhost:5000/ethContract/getSmartContractSourceCodeByAddress`, payload);
  }

  analyzeSmartContract(solidityVersion: string, contractCode: string) {
    const apiUrl = 'http://localhost:5000/ethContract/detect_vulnerability';
    const payload = {
      version: solidityVersion,
      code: this.escapeForJson(contractCode)
    };
    
    return this.http.post(apiUrl, payload);
  }

  // Save new smart contract analysis result
  saveContract(contractName: string, solidityVersion: string, smartContractCode: string, userId: number, ipfsLink: string, vulnerabilities: any[]): Observable<any> {
    const contractData = {
      "name": contractName,
      "version": solidityVersion,
      "code": smartContractCode,
      "user_id": userId,
      "vulnerabilities": vulnerabilities,  // Pass the array of vulnerabilities
      "ipfsLink": ipfsLink
    };
    console.log(contractData);
    return this.http.post<any>(`http://localhost:6001/saveContract`, contractData);
  }


  // Save updated smart contract analysis result
  updateContract(contractData: any): Observable<any> {
    return this.http.put<any>(`http://localhost:6001/updateContract/${contractData.id}`, contractData);
  }

  // Save selected smart contract analysis result
  deleteContract(contractId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:6001/deleteContract/${contractId}`);
  }
}


