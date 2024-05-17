import { Component, OnInit } from '@angular/core';
import { FraudAnalysisService } from '../../fraud-analysis.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-fraud-transactions-history-polygon',
  templateUrl: './fraud-transactions-history-polygon.component.html',
  styleUrl: './fraud-transactions-history-polygon.component.css'
})
export class FraudTransactionsHistoryPolygonComponent {
  fraudAnalysisHistory: any[] = [];
  selectedAnalysis: any = null;
  editMode: boolean = false;
  editingAnalysis: any = null;

  searchName: string = '';
  searchType: string = '';
  searchOwnershipFrom: string = '';
  searchOwnershipTo: string = '';
  searchLikelihood: string = '';
  searchTypeOther: string = '';

  constructor(
      private fraudAnalysisService: FraudAnalysisService,
      private userService: UserService
  ) {}

  ngOnInit(): void {
      this.getFraudAnalysisHistory();
  }

  getFraudAnalysisHistory(): void {
      const currentUser = this.userService.currentUserValue;
      if (currentUser && currentUser.id) {
          this.fraudAnalysisService.getFraudAnalysisHistory(currentUser.id).subscribe(
              (history) => {
                  this.fraudAnalysisHistory = history;
              },
              (error) => console.error('Error fetching fraud analysis history:', error)
          );
      } else {
          console.error('User ID is undefined.');
      }
  }

  search(): void {
      const userId = this.userService.currentUserValue?.id;
      if (typeof userId === 'number') {
          const params = {
              name: this.searchName,
              type: this.searchType,
              ownershipFrom: this.searchOwnershipFrom,
              ownershipTo: this.searchOwnershipTo,
              likelihood: this.searchLikelihood
          };

          this.fraudAnalysisService.searchFraudAnalysis(userId, params).subscribe(
              (results) => {
                  this.fraudAnalysisHistory = results;
              },
              (error) => {
                  console.error('Search error:', error);
                  alert('Search operation failed: ' + error.message);
              }
          );
      } else {
          console.error('User ID is undefined');
      }
  }

  selectAnalysis(analysis: any): void {
      this.selectedAnalysis = analysis;
      this.editMode = false;
  }

  startEdit(): void {
      this.editMode = true;
      this.editingAnalysis = JSON.parse(JSON.stringify(this.selectedAnalysis));
  }

  saveEdit(): void {
      if (this.selectedAnalysis && window.confirm('Are you sure you want to save the changes?')) {
          this.fraudAnalysisService.updateFraudAnalysis(this.selectedAnalysis.id, this.selectedAnalysis).subscribe(
              () => {
                  this.getFraudAnalysisHistory();
                  this.editMode = false;
                  this.editingAnalysis = null;
                  alert('Saved Result Successfully.');
              },
              (error) => {
                  console.error('Error saving fraud analysis:', error);
                  alert('Save operation failed: ' + error.message);
              }
          );
      }
  }

  cancelEdit(): void {
      this.editMode = false;
      this.editingAnalysis = null;
  }

  deleteAnalysis(analysisId: number): void {
      const confirmation = confirm('Are you sure you want to delete this analysis?');
      if (confirmation) {
          this.fraudAnalysisService.deleteFraudAnalysis(analysisId).subscribe(
              () => {
                  this.getFraudAnalysisHistory();
                  this.selectedAnalysis = null;
                  alert('Deleted Result Successfully.');
              },
              (error) => {
                  console.error('Error deleting fraud analysis:', error);
              }
          );
      }
  }
}
