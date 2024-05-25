import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SmartContractService } from '../../smart-contract.service';
import { UserService } from '../../user.service';
import { ChangeDetectorRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-smart-contract-card',
  templateUrl: './smart-contract-card.component.html',
  styleUrls: ['./smart-contract-card.component.css']
})
export class SmartContractCardComponent {
  solidityVersion: string = '';
  contractAddress: string = '';
  smartContractCode: string = '';
  analysisResult: any;
  ipfsLink: string = '';
  contractName: string = '';
  isLoading: boolean = false;
  isFetching: boolean = false;

  constructor(
    private smartContractService: SmartContractService,
    private userService: UserService, // Correctly inject UserService
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private snackBar: MatSnackBar 
    
  ) {}

  ngOnInit(): void {
    this.checkUserLogin();
  }

  // Check if user is logged in
  checkUserLogin(): void {
    const currentUser = this.userService.currentUserValue;
    if (!currentUser) {
      console.warn('No user logged in');
      // Redirect to login or handle accordingly
      this.router.navigate(['/login']); // Redirect to login page
    }
  }

  //Check Solidity version is correct format
  isValidSolidityVersion(version: string): boolean {
    const versionPattern = /^\d+\.\d+\.\d+$/;  // Pattern for "number.number.number" format
    return versionPattern.test(version);
  }

  // Analyze smart contract based on provided details (smart contract address or solidity version and smart contract code)
  analyzeSmartContract(): void {
    this.analysisResult = null;  // Clear previous results
    this.isLoading = true;
  
    // Check if a contract address is provided, fetch details first
    if (this.isValidSolidityVersion(this.solidityVersion) && this.smartContractCode.trim()) {
      // If no address is provided but code and version are, perform analysis directly
      this.performAnalysis();
    } else {
      this.isLoading = false;  // Stop loading if conditions are not met
      if (!this.isValidSolidityVersion(this.solidityVersion)) {
        this.snackBar.open('Solidity version format is incorrect. Use format: X.Y.Z (e.g., 0.8.4)', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['centered-snack-bar']
        });
      } else if (!this.smartContractCode.trim()) {
        this.snackBar.open('Please enter the smart contract code.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['centered-snack-bar']
        });
      }
    }
  }

  // Perform smart contract analysis
  private performAnalysis() {
    this.smartContractService.analyzeSmartContract(this.solidityVersion, this.smartContractCode)
        .subscribe({
            next: (response: any) => {
                this.analysisResult = response.result;  // Ensure you access the result part of the response
                this.ipfsLink = response.ipfsLink;
                this.isLoading = false; // Hide spinner after getting the response
                this.changeDetectorRef.detectChanges(); // Trigger change detection
            },
            error: (error) => {
                console.error('API call failed:', error);
                this.isLoading = false; // Hide spinner on error
                this.snackBar.open('Analysis failed. Please try again.', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    panelClass: ['my-custom-snackbar']
                });
            }
        });
  }

  

  //Use contract address to fetch contract details
  fetchContractDetails() {
    if (!this.contractAddress.trim()) {
      this.snackBar.open('Please enter a valid contract address.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      return;
    }
    this.isFetching = true; 
    this.smartContractService.fetchContractByAddress(this.contractAddress).subscribe({
      next: (data) => {
        const sourceCode = data[0].SourceCode;
        // Extract Solidity version using regex
        const versionMatch = sourceCode.match(/pragma\s+solidity\s+\^?(\d+\.\d+\.\d+);/);
        if (versionMatch) {
          this.solidityVersion = versionMatch[1];
        } else {
          this.solidityVersion = 'Unknown';
        }
  
        // Decode the SourceCode for readability
        this.smartContractCode = sourceCode
          .replace(/\\n/g, '\n')
          .replace(/\\r/g, '\r')
          .replace(/\\t/g, '\t')
          .replace(/\\"/g, '"')
          .replace(/\\'/g, "'");
  
          this.isFetching = false;
      },
      error: (err) => {
        this.snackBar.open('Failed to fetch contract details. Please check the address and try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        this.isFetching = false;
      }
    });
  }
  
  
  
  //Save smart contract
  saveSmartContract(): void {
    // Retrieve the current user from UserService
    const currentUser = this.userService.currentUserValue;
    console.log('Current user:', currentUser);
  
    if (!currentUser || !currentUser.id) {
      console.error('User not logged in or user ID not available');
      return;
    }
  
    if (!this.contractName) {
      // You may want to alert the user or handle this situation appropriately
      console.error('Contract name is required');
      return;
    }
  
    const confirmation = window.confirm('Are you sure you want to save this analysis result?');
    if (confirmation) {
      this.smartContractService.saveContract(
        this.contractName, 
        this.solidityVersion, 
        this.smartContractCode,
        currentUser.id, // User ID
        this.ipfsLink,
        this.analysisResult.Vulnerabilities // Array of vulnerabilities
      )
      .subscribe({
        next: (response) => {
          this.snackBar.open('Analysis result saved successfully.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['my-custom-snackbar']  
          });
  
          this.analysisResult = null; // Clear the analysis result after saving
          this.contractName = ''; // Clear the contract name input
          this.changeDetectorRef.detectChanges(); // Manually trigger change detection
        },
        error: (error) => {
          console.error('API call failed:', error);
          this.snackBar.open('Failed to save analysis result. Please try again.', 'Close', { 
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['my-custom-snackbar'] 
          });
        }
      });
    }
  }
  
}
