import React from 'react';
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function FarmerRegistration({ contract, signer }) {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [location, setLocation] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tx = await contract.addFarmer(name, location);
      await tx.wait();
      navigate('/dashboard');
    } catch (error) {
      console.error("Failed to register farmer:", error);
    }
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} spacing={4}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </FormControl>
      <FormControl>
        <FormLabel>Location</FormLabel>
        <Input value={location} onChange={(e) => setLocation(e.target.value)} required />
      </FormControl>
      <Button type="submit">Register</Button>
    </VStack>
  );
}

export default FarmerRegistration;