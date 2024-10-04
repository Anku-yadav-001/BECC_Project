
import { Box, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; 

const NotLoggedIn= () => {
  const router = useNavigate();

  const handleLogin = () => {
    router('/login');  
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.50"
      p={4}
    >
      <Text fontSize="2xl" mb={4} color="gray.700">
        Please login first
      </Text>
      <Button colorScheme="teal" size="lg" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default NotLoggedIn;
