import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FraudAnalysisService } from '../../fraud-analysis.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-fraud-transactions-card-avalanche',
  templateUrl: './fraud-transactions-card-avalanche.component.html',
  styleUrls: ['./fraud-transactions-card-avalanche.component.css']
})
export class FraudTransactionsCardAvalancheComponent {
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

    this.isAnalyzing = true;

    this.fraudAnalysisService.analyzeFraudTransactionAvalanche(this.transactionHash).subscribe(
      (response: any) => {
        this.fraudAnalysisResult = this.fraudAnalysisService.formatAnalysisResult(response);
        this.cleanAnalysisResult();
        this.isAnalyzing = false;
      },
      (error) => {
        console.error('API call failed:', error);
        this.snackBar.open('Analysis failed. Please try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['centered-snack-bar']
        });
        this.isAnalyzing = false;
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
        panelClass: ['centered-snack-bar']
      });
      return;
    }

    const confirmation = confirm('Are you sure you want to save this analysis result?');
    if (confirmation) {
      this.fraudAnalysisService.avalancheSaveFraudAnalysis(
        this.fraudAnalysisResult,
        currentUser.id,
        this.transactionName,
        this.transactionHash
      ).subscribe(
        () => {
          this.snackBar.open('Analysis result saved successfully.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['centered-snack-bar']
          });
        },
        (error) => {
          console.error('Failed to save analysis result:', error);
          this.snackBar.open('Failed to save analysis result. Please try again.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['centered-snack-bar']
          });
        }
      );
    }
  }

  cleanAnalysisResult(): void {
    if (this.fraudAnalysisResult) {
      for (const key in this.fraudAnalysisResult) {
        if (typeof this.fraudAnalysisResult[key] === 'string') {
          this.fraudAnalysisResult[key] = this.fraudAnalysisResult[key].replace(/\*\*/g, '');
        }
      }
    }
  }
}
