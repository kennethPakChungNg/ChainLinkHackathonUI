import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AvalancheService {
  private apiUrl = 'https://api.avax.network/ext/bc/C/rpc';
  private coinbaseApiUrl = 'https://api.coinbase.com/v2';

  constructor(private http: HttpClient) { }

  getLatestBlockNumber(): Observable<any> {
    const body = {
      "jsonrpc": "2.0",
      "method": "eth_blockNumber",
      "params": [],
      "id": 1
    };
    return this.http.post(this.apiUrl, body);
  }

  getAvaxPrice(): Observable<any> {
    return this.http.get(`${this.coinbaseApiUrl}/prices/AVAX-USD/spot`);
  }

  getBaseFee(): Observable<any> {
    const body = {
      "jsonrpc": "2.0",
      "method": "eth_baseFee",
      "params": [],
      "id": 1
    };
    return this.http.post(this.apiUrl, body);
  }

  getPriorityFee(): Observable<any> {
    const body = {
      "jsonrpc": "2.0",
      "method": "eth_maxPriorityFeePerGas",
      "params": [],
      "id": 1
    };
    return this.http.post(this.apiUrl, body);
  }

  getGasPrices(): Observable<any> {
    return forkJoin({
      baseFee: this.getBaseFee(),
      priorityFee: this.getPriorityFee()
    }).pipe(
      map((fees: { baseFee: any, priorityFee: any }) => {
        const baseFee = parseInt(fees.baseFee.result, 16) / 1e9; // Convert from wei to Gwei
        const priorityFee = parseInt(fees.priorityFee.result, 16) / 1e9; // Convert from wei to Gwei
        const safeGasPrice = 25; // Fixed value for safe gas price in nAVAX
        const proposedGasPrice = baseFee;
        const fastGasPrice = baseFee + priorityFee;

        return {
          SafeGasPrice: safeGasPrice,
          ProposeGasPrice: proposedGasPrice,
          FastGasPrice: fastGasPrice
        };
      })
    );
  }

  getEthSupply(): Observable<any> {
    const body = {
      "jsonrpc": "2.0",
      "method": "eth_getBalance",
      "params": ["0x0000000000000000000000000000000000000000", "latest"],
      "id": 1
    };
    return this.http.post(this.apiUrl, body);
  }


}
