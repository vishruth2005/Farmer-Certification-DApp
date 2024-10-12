import React from 'react';
import { Button, VStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function WalletConnection({ provider, signer }) {
  const navigate = useNavigate();
  const [address, setAddress] = React.useState('');

  const connectWallet = async () => {
    if (provider) {
      try {
        await provider.send("eth_requestAccounts", []);
        const address = await signer.getAddress();
        setAddress(address);
        navigate('/register');
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    }
  };

  return (
    <VStack spacing={4}>
      <Text fontSize="2xl">Welcome to Farmer DApp</Text>
      {address ? (
        <Text>Connected: {address}</Text>
      ) : (
        <Button onClick={connectWallet}>Connect Wallet</Button>
      )}
    </VStack>
  );
}

export default WalletConnection;