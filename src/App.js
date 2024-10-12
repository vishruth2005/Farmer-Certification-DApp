import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ethers } from 'ethers';
import WalletConnection from './components/WalletConnection';
import FarmerRegistration from './components/FarmerRegistration';
import FarmerDashboard from './components/FarmerDashboard';
import AuthenticatedRoute from './components/AuthenticatedRoute';

function App() {
  const [provider, setProvider] = React.useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initEthers = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        const signer = await provider.getSigner();
        setSigner(signer);

        const contractAddress = "0xE847Af1737793602Feed40344C146a9a0870B07B";
        const contractABI = [
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "_cropName",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "_quantity",
                "type": "uint256"
              }
            ],
            "name": "addCrop",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "_name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_location",
                "type": "string"
              }
            ],
            "name": "addFarmer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "authenticateFarmer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "farmerAddress",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "cropName",
                "type": "string"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              }
            ],
            "name": "CropAdded",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "farmerAddress",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
              }
            ],
            "name": "FarmerAdded",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "farmerAddress",
                "type": "address"
              }
            ],
            "name": "FarmerAuthenticated",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "farmerAddresses",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "farmers",
            "outputs": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "location",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "isAuthenticated",
                "type": "bool"
              },
              {
                "internalType": "uint256",
                "name": "cropCount",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "getFarmerAddresses",
            "outputs": [
              {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_farmerAddress",
                "type": "address"
              }
            ],
            "name": "getFarmerDetails",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              },
              {
                "components": [
                  {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "quantity",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct FarmerRegistry.Crop[]",
                "name": "",
                "type": "tuple[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ];
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(contract);
      }
    };

    initEthers();
  }, []);

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WalletConnection provider={provider} signer={signer} />} />
          <Route path="/register" element={<FarmerRegistration contract={contract} signer={signer} />} />
          <Route path="/dashboard" element={<FarmerDashboard contract={contract} signer={signer} />} />
          <Route path="/authenticated" element={<AuthenticatedRoute contract={contract} signer={signer} />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;