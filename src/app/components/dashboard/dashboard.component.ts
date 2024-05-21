import { Component, OnInit } from '@angular/core';
import { EthereumService } from '../../ethereum.service';
import { PolygonService } from '../../polygon.service';
import { AvalancheService } from '../../avalanche.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  latestBlockNumber: string = '';
  etherPrice: number | null = null;
  gasPrices: any;
  ethSupplyData: any;

  polygonLatestBlockNumber: string = '';
  polygonPrice: number | null = null;
  polygonGasPrices: any;
  polygonSupply: any;

  avalancheLatestBlockNumber: string = '';
  avalanchePrice: number | null = null;
  avalancheGasPrices: any;
  avalancheEthSupplyData: any;

  constructor(
    private ethereumService: EthereumService,
    private polygonService: PolygonService,
    private avalancheService: AvalancheService
  ) { }

  ngOnInit() {
    this.getLatestBlockNumber();
    this.getEtherPrice();
    this.getGasPrices();
    this.getEthSupply();

    this.getPolygonLatestBlockNumber();
    this.getPolygonPrice();
    this.getPolygonGasPrices();
    this.getPolygonSupply();

    this.getAvalancheLatestBlockNumber();
    this.getAvalanchePrice();
    this.getAvalancheGasPrices();
    this.getAvalancheEthSupply();
  }

  getLatestBlockNumber() {
    this.ethereumService.getLatestBlockNumber().subscribe(data => {
      this.latestBlockNumber = parseInt(data.result, 16).toString();
    });
  }

  getEtherPrice() {
    this.ethereumService.getEtherPrice().subscribe(data => {
      this.etherPrice = data.ethereum.usd;
    });
  }

  getGasPrices() {
    this.ethereumService.getGasPrices().subscribe(data => {
      if (data.status === '1') {
        this.gasPrices = data.result;
      } else {
        console.error('Failed to load gas prices');
      }
    }, error => {
      console.error('Error fetching gas prices:', error);
    });
  }

  getEthSupply() {
    this.ethereumService.getEthSupply().subscribe(data => {
      if (data.status === '1') {
        this.ethSupplyData = data.result;
      } else {
        console.error('Failed to load ETH supply data');
      }
    }, error => {
      console.error('Error fetching ETH supply data:', error);
    });
  }

  getPolygonLatestBlockNumber() {
    this.polygonService.getLatestBlockNumber().subscribe(data => {
      this.polygonLatestBlockNumber = parseInt(data.result, 16).toString();
    });
  }

  getPolygonPrice() {
    this.polygonService.getPolygonPrice().subscribe(data => {
      this.polygonPrice = data.result.maticusd;
    });
  }

  getPolygonGasPrices() {
    this.polygonService.getGasPrices().subscribe(data => {
      if (data.status === '1') {
        this.polygonGasPrices = data.result;
      } else {
        console.error('Failed to load gas prices');
      }
    }, error => {
      console.error('Error fetching gas prices:', error);
    });
  }

  getPolygonSupply() {
    this.polygonService.getPolygonSupply().subscribe(data => {
      if (data.status === '1') {
        this.polygonSupply = data.result;
      } else {
        console.error('Failed to load Polygon supply');
      }
    }, error => {
      console.error('Error fetching Polygon supply:', error);
    });
  }

  getAvalancheLatestBlockNumber() {
    this.avalancheService.getLatestBlockNumber().subscribe(data => {
      this.avalancheLatestBlockNumber = parseInt(data.result, 16).toString();
    });
  }

  getAvalanchePrice() {
    this.avalancheService.getAvaxPrice().subscribe(data => {
      this.avalanchePrice = data.data.amount;
    });
  }

  getAvalancheGasPrices() {
    this.avalancheService.getGasPrices().subscribe(data => {
      this.avalancheGasPrices = data;
    }, error => {
      console.error('Error fetching Avalanche gas prices:', error);
    });
  }

  getAvalancheEthSupply() {
    this.avalancheService.getEthSupply().subscribe(data => {
      if (data.result) {
        this.avalancheEthSupplyData = data.result;
      } else {
        console.error('Failed to load ETH supply data');
      }
    }, error => {
      console.error('Error fetching ETH supply data:', error);
    });
  }
}
