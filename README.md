# Generative AI Blockchain Security Analysis System - Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3 and serves as the frontend component of our Blockchain Security Analysis System, developed for the Chainlink Hackathon 2024.

## Overview

Our Generative AI Blockchain Security Analysis System provides real-time security analysis of blockchain smart contracts and transactions using generative AI technology. The system aims to combat the rising blockchain fraud by offering automated vulnerability detection and fraud assessment.

### Key Features

- **Smart Contract Vulnerability Analysis**: Analyze Solidity smart contracts for potential security vulnerabilities
- **Blockchain Transaction Fraud Detection**: Detect suspicious activities in transactions across multiple chains
- **Multi-Chain Support**: Analysis capabilities for Ethereum, Polygon, and Avalanche networks
- **Historical Analysis Review**: Access and manage previous analysis results
- **User Authentication**: Secure login and registration system

## Architecture

The frontend application is built with Angular and integrates with a Python/Node.js backend. The system architecture includes:

- **Angular Components**: Modular UI components for different analysis features
- **Service Layers**: Services for communicating with APIs and managing state
- **Chain-Specific Modules**: Specialized components for different blockchain networks
- **Authentication System**: User management with secure login/registration

## Installation

### Prerequisites

- Node.js (v14 or higher)
- Angular CLI (`npm install -g @angular/cli`)

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/blockchain-security-analysis-frontend.git
   cd blockchain-security-analysis-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Create an `environment.ts` file in `src/environments/` with your API endpoints and keys

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Usage Guide

### Smart Contract Analysis

1. Navigate to the Smart Contract Analysis section
2. Enter an Ethereum contract address or paste Solidity code directly
3. Specify the Solidity version
4. Click "Analyze Contract" to receive a comprehensive vulnerability report
5. Save the analysis for future reference

### Transaction Fraud Detection

1. Navigate to the Fraud Transactions section
2. Select the target blockchain network (Ethereum, Polygon, or Avalanche)
3. Enter the transaction hash
4. Click "Analyze Transaction" to receive a detailed fraud assessment
5. Review the analysis results and save if needed

### Viewing Analysis History

1. Navigate to the History section for either Smart Contracts or Fraud Transactions
2. Browse past analyses with detailed filters
3. Select any analysis to view the complete report
4. Edit, delete, or export saved analyses

## Technologies Used

- **Angular**: Frontend framework
- **TypeScript**: Primary programming language
- **Angular Material**: UI component library
- **HttpClient**: For API communication
- **RxJS**: Reactive extensions for asynchronous operations
- **Bootstrap**: Additional styling components

## Blockchain Integrations

- **Ethereum**: via Etherscan API
- **Polygon**: via Polygonscan API
- **Avalanche**: via Avascan API

## Contributors

- [Kenneth Ng (kennethPakChungNg)](https://github.com/kennethPakChungNg) - Full Stack Developer
- [Hugo Leung (web3hugo1225)](https://github.com/web3hugo1225) - Full Stack Developer
- [Horace Ng (horraceng)](https://github.com/horraceng) - Full Stack Developer

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Chainlink Hackathon 2024 for providing the platform and opportunity
- OpenAI for API access
- QuickNode for IPFS storage solutions
