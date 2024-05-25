import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FraudAnalysisService } from '../../fraud-analysis.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-fraud-transactions-card',
  templateUrl: './fraud-transactions-card.component.html',
  styleUrls: ['./fraud-transactions-card.component.css']
})


export class FraudTransactionsCardComponent {
  transactionName: string = '';  
  transactionHash: string = '';
  fraudAnalysisResult: any;
  isAnalyzing: boolean = false;

  constructor(
    private http: HttpClient,
    private fraudAnalysisService: FraudAnalysisService,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  analyzeTransaction(): void {
    if (!this.transactionHash.trim()) {
      this.snackBar.open('Please enter a transaction hash.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['centered-snack-bar'] 
      });
      return;
    }

    this.isAnalyzing = true;  // Analysis starts, show the in-progress sign

    // const response = {
    //   "Likelihood_of_Fraud_Or_Scam_In_Percentage": "30%",
    //   "Type_of_The_Possible_Fraud": "Market Manipulation",
    //   "Ownership_of_From_Address": "Unknown",
    //   "Ownership_of_To_Address": "Unknown",
    //   "Behavior_of_the_From_and_To_Addresses": "Both the sender (From address) and recipient (To address) have a history of 10 transactions each, indicating a possibly coordinated or recurring transaction pattern rather than isolated or random transfers. The transaction value of 7.53203338 ETH is significant, and both addresses have engaged in transactions with a minimum value received of 0.0 ETH, suggesting potential for low-value test transactions or gas payments.",
    //   "Peculiarities_in_the_Transaction": "- The transaction value is notably high compared to the total Ether balance remaining in both addresses after the transaction.\n- The Gas Used of 25000 is within a normal range, indicating no immediate red flags in terms of gas expenditure.\n- The significant time differences between the first and last transactions for both addresses may indicate long-term activity with potential periods of dormancy or inactivity.",
    //   "Market_Context_and_Alerts": "No specific market conditions or community alerts have been mentioned that directly relate to this transaction. However, the transaction should be contextualized within broader market conditions, including any known scams or phishing campaigns targeting Ethereum users.",
    //   "Supporting_Evidence_for_Assessment": "- Both addresses have a history of exactly 10 transactions each, suggesting a possible relationship or coordinated activity.\n- The significant transaction value compared to the remaining balances may indicate an attempt to consolidate funds or move large amounts discreetly.\n- Long-term activity with potential dormancy periods could suggest strategic timing for transactions, possibly to avoid detection or take advantage of market conditions.",
    //   "Recommended_Actions": "- Monitor both addresses for further transactions that may establish a clearer pattern of behavior.\n- Investigate the transaction history and counterparties of both addresses to identify any connections to known fraudulent entities or activities.\n- Alert and collaborate with other blockchain analysts and entities to gather more intelligence on the involved addresses.\n- If further evidence of market manipulation or fraudulent activity is uncovered, consider reporting the findings to relevant authorities or blockchain security platforms for action."
    // }

    // this.fraudAnalysisResult = this.fraudAnalysisService.formatAnalysisResult(response);
    
    this.fraudAnalysisService.analyzeFraudTransaction(this.transactionHash).subscribe(
      (response: any) => {
        console.log(response);
        this.fraudAnalysisResult = this.fraudAnalysisService.formatAnalysisResult(response);
        this.isAnalyzing = false;  // Analysis complete, hide the in-progress sign
      },
      (error) => {
        console.error('API call failed:', error);
        this.snackBar.open('Analysis failed. Please try again.', 'Close', { 
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['centered-snack-bar'] // Custom CSS class
        });

        this.isAnalyzing = false;  // Error occurred, hide the in-progress sign
        
      }
    );
  }

  saveAnalysisResult(): void {
    const currentUser = this.userService.currentUserValue;
    if (!currentUser || !currentUser.id) {
      this.snackBar.open('User not logged in or user ID not available', 'Close', { 
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['centered-snack-bar'] // Custom CSS class
      });
      return;
    }
  
    const confirmation = confirm('Are you sure you want to save this analysis result?');
    if (confirmation) {
      this.fraudAnalysisService.saveFraudAnalysis(
        this.fraudAnalysisResult, // Send the whole result object
        currentUser.id,
        this.transactionName,
        this.transactionHash
      ).subscribe(
        () => {
          this.snackBar.open('Analysis result saved successfully.', 'Close', { 
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['centered-snack-bar'] // Custom CSS class
          });
        },
        (error) => {
          console.error('Failed to save analysis result:', error);
          this.snackBar.open('Failed to save analysis result. Please try again.', 'Close', { 
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['centered-snack-bar'] // Custom CSS class
          });
        }
      );
    }
  }


}
