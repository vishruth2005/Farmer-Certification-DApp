import React from 'react';
import { Text, VStack, Button } from '@chakra-ui/react';

function AuthenticatedRoute({ contract, signer }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const address = await signer.getAddress();
        const details = await contract.getFarmerDetails(address);
        setIsAuthenticated(details[3]);
      } catch (error) {
        console.error("Failed to check authentication:", error);
      }
    };

    checkAuthentication();
  }, [contract, signer]);

  const authenticate = async () => {
    try {
      const tx = await contract.authenticateFarmer();
      await tx.wait();
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to authenticate farmer:", error);
    }
  };

  return (
    <VStack spacing={4}>
      <Text fontSize="2xl">Farmer Authentication</Text>
      {isAuthenticated ? (
        <Text>This farmer is authenticated.</Text>
      ) : (
        <>
          <Text>This farmer is not yet authenticated.</Text>
          <Button onClick={authenticate}>Authenticate</Button>
        </>
      )}
    </VStack>
  );
}

export default AuthenticatedRoute;