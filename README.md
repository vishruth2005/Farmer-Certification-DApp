# Farmer DApp

Farmer DApp is a decentralized application (dApp) built on the Ethereum blockchain that allows farmers to register, add crops, and get authenticated. It provides a simple interface for managing farmer information and crop data.

## Features

- Wallet connection
- Farmer registration
- Crop addition
- Farmer details fetching and display
- QR code generation for authentication
- Farmer authentication

## Technologies Used

- Solidity (for smart contracts)
- React.js
- ethers.js
- Chakra UI
- React Router
- QRCode.react

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MetaMask browser extension
- Access to an Ethereum network (mainnet, testnet, or local blockchain)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/farmer-dapp.git
   cd farmer-dapp
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Deploy the smart contract:

   - Compile and deploy the `FarmerRegistry.sol` contract to your chosen Ethereum network.
   - Note down the deployed contract address.

4. Configure the application:

   - Open `src/App.js`
   - Replace `YOUR_CONTRACT_ADDRESS_HERE` with the actual deployed contract address.
   - Add the contract ABI to the `contractABI` array.

5. Start the development server:

   ```
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Connect your wallet using MetaMask.
2. Register as a farmer by providing your name and location.
3. Add crops by entering the crop name and quantity.
4. View your farmer details and added crops.
5. Use the generated QR code or "View Certification" link to access the authentication page.
6. Authenticate yourself as a farmer.

## Smart Contract

The `FarmerRegistry.sol` smart contract provides the following functions:

- `addFarmer(string memory _name, string memory _location)`: Register a new farmer.
- `addCrop(string memory _cropName, uint256 _quantity)`: Add a new crop for the farmer.
- `authenticateFarmer()`: Authenticate the farmer.
- `getFarmerDetails(address _farmerAddress)`: Get details of a specific farmer.
- `getFarmerAddresses()`: Get all registered farmer addresses.

## Acknowledgements

- [React](https://reactjs.org/)
- [ethers.js](https://docs.ethers.io/)
- [Chakra UI](https://chakra-ui.com/)
- [React Router](https://reactrouter.com/)
- [QRCode.react](https://www.npmjs.com/package/qrcode.react)
