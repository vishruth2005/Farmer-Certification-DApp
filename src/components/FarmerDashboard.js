import React from 'react';
import { Button, FormControl, FormLabel, Input, VStack, Text, Box, Link } from '@chakra-ui/react';
import { QRCodeSVG } from 'qrcode.react';

function FarmerDashboard({ contract, signer }) {
  const [cropName, setCropName] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [farmerDetails, setFarmerDetails] = React.useState(null);

  const addCrop = async (e) => {
    e.preventDefault();
    try {
      const tx = await contract.addCrop(cropName, quantity);
      await tx.wait();
      setCropName('');
      setQuantity('');
      fetchDetails();
    } catch (error) {
      console.error("Failed to add crop:", error);
    }
  };

  const fetchDetails = async () => {
    try {
      const address = await signer.getAddress();
      const details = await contract.getFarmerDetails(address);
      setFarmerDetails({
        name: details[0],
        location: details[1],
        isAuthenticated: details[2],
        crops: details[3]
      });
    } catch (error) {
      console.error("Failed to fetch farmer details:", error);
    }
  };

  const generateQRCode = () => {
    const authUrl = `${window.location.origin}/authenticated`;
    return <QRCodeSVG value={authUrl} />;
  };

  React.useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <VStack spacing={4}>
      <Text fontSize="2xl">Farmer Dashboard</Text>
      <Box as="form" onSubmit={addCrop}>
        <FormControl>
          <FormLabel>Crop Name</FormLabel>
          <Input value={cropName} onChange={(e) => setCropName(e.target.value)} required />
        </FormControl>
        <FormControl>
          <FormLabel>Quantity</FormLabel>
          <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </FormControl>
        <Button type="submit">Add Crop</Button>
      </Box>
      <Button onClick={fetchDetails}>Refresh Details</Button>
      {farmerDetails && (
        <Box>
          <Text>Name: {farmerDetails.name}</Text>
          <Text>Location: {farmerDetails.location}</Text>
          <Text>Crops:</Text>
          {farmerDetails.crops.map((crop, index) => (
            <Text key={index}>{crop.name}: {crop.quantity.toString()}</Text>
          ))}
          <Text>Authenticated: {farmerDetails.isAuthenticated ? 'Yes' : 'No'}</Text>
        </Box>
      )}
      {generateQRCode()}
      <Link href="/authenticated">View Certification</Link>
    </VStack>
  );
}

export default FarmerDashboard;