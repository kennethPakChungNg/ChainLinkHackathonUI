import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolygonService {
  private apiUrl = 'https://api.polygonscan.com/api';
  private apiKey = 'PPSTEWQTEZFHPMJ9EF22ZKV7KV6G8N8NCE';

  constructor(private http: HttpClient) { }

  getLatestBlockNumber(): Observable<any> {
    const params = `module=proxy&action=eth_blockNumber&apikey=${this.apiKey}`;
    return this.http.get(`${this.apiUrl}?${params}`);
  }

  getPolygonPrice(): Observable<any> {
    const params = `module=stats&action=maticprice&apikey=${this.apiKey}`;
    return this.http.get(`${this.apiUrl}?${params}`);
  }

  getGasPrices(): Observable<any> {
    const params = `module=gastracker&action=gasoracle&apikey=${this.apiKey}`;
    return this.http.get(`${this.apiUrl}?${params}`);
  }

  getPolygonSupply(): Observable<any> {
    const params = `module=stats&action=maticsupply&apikey=${this.apiKey}`;
    return this.http.get(`${this.apiUrl}?${params}`);
  }
}
