import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class FraudAnalysisService {
  constructor(private http: HttpClient) { }

  // Helper method to format content
  private formatContent(content: string): string {
    // Process markdown, newlines, and sub-titles
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold markdown to HTML
      .replace(/\n/g, '<br>')  // Newlines to HTML breaks
      .replace(/(\d\.\s)(.*?):/g, '<br><span class="subtitle">$1$2:</span>')  // Subtitles with numbers to HTML with subtitle class
      .replace(/(\d\.\s)([^\n]+)(\n|$)/g, '<br><span class="subtitle">$1</span><span class="sub-content">$2</span>');  // Subtitles without colon to HTML with sub-content class
  }

  // Utility function to escape special characters for JSON string
  escapeForJson(str: string): string {
    return str
      .replace(/\\/g, '\\\\')  // Escape backslashes
      .replace(/"/g, '\\"')    // Escape double-quotes
      .replace(/\n/g, '\\n')   // Escape newlines
      // ... add other escapes if necessary
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////      Send Transaction hash to analyze for different chain      ///////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  // ETH transaction hash to the backend for analysis
  analyzeFraudTransaction(transactionHash: string): Observable<any> {
    const apiUrl = `http://localhost:5000/ethTxns/detect_fraud`;
    const payload = { hash: transactionHash };
    return this.http.post<any>(apiUrl, payload);
  }

  // Avalanche transaction hash to the backend for analysis
  analyzeFraudTransactionAvalanche(transactionHash: string): Observable<any> {
    const apiUrl = `http://localhost:5000/avax/detect_fraud`; 
    const payload = { hash: transactionHash };
    return this.http.post<any>(apiUrl, payload);
  }
  
  // Polygon transaction hash to the backend for analysis
  analyzeFraudTransactionPolygon(transactionHash: string): Observable<any> {
    const apiUrl = 'http://localhost:5000/polygon/detect_fraud'; //
    const payload = { hash: transactionHash };
    return this.http.post<any>(apiUrl, payload);
  }

  // Format the analysis result to match your front-end structure
  public formatAnalysisResult(analysisData: any): any {
    // Extract the nested fraud_analysis if that's how your backend structures it

    const formattedResult = {
      "likelihoodOfFraud": analysisData.Likelihood_of_Fraud_Or_Scam_In_Percentage,
      "fraudTransactionType": analysisData.Type_of_The_Possible_Fraud,
      "ownershipFrom": analysisData.Ownership_of_From_Address,
      "ownershipTo": analysisData.Ownership_of_To_Address,
      "behavior": analysisData.Behavior_of_the_From_and_To_Addresses,
      "peculiarities": analysisData.Peculiarities_in_the_Transaction,
      "broaderContext": analysisData.Market_Context_and_Alerts,
      "supportingEvidence": analysisData.Supporting_Evidence_for_Assessment,
      "recommendActions": analysisData.Recommended_Actions
    };
    

    // Transform peculiarities if necessary, for example:
    if (typeof formattedResult.peculiarities === 'object') {
      formattedResult.peculiarities = Object.entries(formattedResult.peculiarities)
        .map(([key, value]) => ({ key, value }));
    }

    return formattedResult;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////           ETH    DB service for analysis result                ///////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Save new fraud analysis result
  saveFraudAnalysis(fraudAnalysis: any, userId: number, transactionName: string, transactionHash: string): Observable<any> {
    const apiUrl = `http://localhost:6001/saveFraudAnalysis`;
    const payload = {
      user_id: userId,
      transaction_name: transactionName,
      transaction_hash: transactionHash,
      fraud_analysis: fraudAnalysis // The backend expects this key
    };
    return this.http.post<any>(apiUrl, payload);
  }

  getFraudAnalysisHistory(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:6001/fraudAnalysisHistory/${userId}`);
  }

  searchFraudAnalysis(userId: number, searchParams: any): Observable<any[]> {
    // Create an object with the search parameters
    const params = new HttpParams({
      fromObject: {
        userId: userId.toString(),
        transactionName: searchParams.name,
        fraudType: searchParams.type,
        ownershipFrom: searchParams.ownershipFrom,
        ownershipTo: searchParams.ownershipTo,
        likelihoodOfFraud: searchParams.likelihood
      }
    });
  
    // Perform the GET request with the search parameters
    return this.http.get<any[]>(`http://localhost:6001/searchFraudAnalysis`, { params });
  }

  
  // Update existing fraud analysis result
  updateFraudAnalysis(fraudAnalysisId: number, fraudAnalysisData: any): Observable<any> {
    console.log('Updating fraud analysis with data:', fraudAnalysisData);
    return this.http.put<any>(`http://localhost:6001/updateFraudAnalysis/${fraudAnalysisId}`, fraudAnalysisData);
  }


  // Delete fraud analysis result
  deleteFraudAnalysis(fraudAnalysisId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:6001/deleteFraudAnalysis/${fraudAnalysisId}`);
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////           Polygon    DB service for analysis result            ///////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Save new fraud analysis result
  polygonSaveFraudAnalysis(fraudAnalysis: any, userId: number, transactionName: string, transactionHash: string): Observable<any> {
    const apiUrl = `http://localhost:6001/polygonSaveFraudAnalysis`;
    const payload = {
      user_id: userId,
      transaction_name: transactionName,
      transaction_hash: transactionHash,
      fraud_analysis: fraudAnalysis // The backend expects this key
    };
    return this.http.post<any>(apiUrl, payload);
  }

  polygonGetFraudAnalysisHistory(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:6001/polygonFraudAnalysisHistory/${userId}`);
  }

  polygonSearchFraudAnalysis(userId: number, searchParams: any): Observable<any[]> {
    // Create an object with the search parameters
    const params = new HttpParams({
      fromObject: {
        userId: userId.toString(),
        transactionName: searchParams.name,
        fraudType: searchParams.type,
        ownershipFrom: searchParams.ownershipFrom,
        ownershipTo: searchParams.ownershipTo,
        likelihoodOfFraud: searchParams.likelihood
      }
    });
  
    // Perform the GET request with the search parameters
    return this.http.get<any[]>(`http://localhost:6001/polygonSearchFraudAnalysis`, { params });
  }

  
  // Update existing fraud analysis result
  polygonUpdateFraudAnalysis(fraudAnalysisId: number, fraudAnalysisData: any): Observable<any> {
    console.log('Updating fraud analysis with data:', fraudAnalysisData);
    return this.http.put<any>(`http://localhost:6001/polygonUpdateFraudAnalysis/${fraudAnalysisId}`, fraudAnalysisData);
  }


  // Delete fraud analysis result
  polygonDeleteFraudAnalysis(fraudAnalysisId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:6001/polygonDeleteFraudAnalysis/${fraudAnalysisId}`);
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////           Avalanche    DB service for analysis result          ///////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////

  // Save new fraud analysis result
  avalancheSaveFraudAnalysis(fraudAnalysis: any, userId: number, transactionName: string, transactionHash: string): Observable<any> {
    const apiUrl = `http://localhost:6001/avalancheSaveFraudAnalysis`;
    const payload = {
      user_id: userId,
      transaction_name: transactionName,
      transaction_hash: transactionHash,
      fraud_analysis: fraudAnalysis // The backend expects this key
    };
    return this.http.post<any>(apiUrl, payload);
  }

  avalancheGetFraudAnalysisHistory(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:6001/avalancheFraudAnalysisHistory/${userId}`);
  }

  avalancheSearchFraudAnalysis(userId: number, searchParams: any): Observable<any[]> {
    // Create an object with the search parameters
    const params = new HttpParams({
      fromObject: {
        userId: userId.toString(),
        transactionName: searchParams.name,
        fraudType: searchParams.type,
        ownershipFrom: searchParams.ownershipFrom,
        ownershipTo: searchParams.ownershipTo,
        likelihoodOfFraud: searchParams.likelihood
      }
    });
  
    // Perform the GET request with the search parameters
    return this.http.get<any[]>(`http://localhost:6001/avalancheSearchFraudAnalysis`, { params });
  }

  
  // Update existing fraud analysis result
  avalancheUpdateFraudAnalysis(fraudAnalysisId: number, fraudAnalysisData: any): Observable<any> {
    console.log('Updating fraud analysis with data:', fraudAnalysisData);
    return this.http.put<any>(`http://localhost:6001/avalancheUpdateFraudAnalysis/${fraudAnalysisId}`, fraudAnalysisData);
  }


  // Delete fraud analysis result
  avalancheDeleteFraudAnalysis(fraudAnalysisId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:6001/avalancheDeleteFraudAnalysis/${fraudAnalysisId}`);
  }
  
  
}


