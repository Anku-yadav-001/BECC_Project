import React from 'react';
import { Box, Button, Heading, HStack, VStack,Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

export function Home(){
  const name = localStorage.getItem("name")
  const token = localStorage.getItem("accessToken")
  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <VStack spacing={8}>
        <Icon as={FaShoppingCart} w={24} h={24} color="teal.500" />

        <Heading as="h1" size="xl">
          Welcome to E-commerce Website
        </Heading>
        {
          !token?
          <>
          
        <Text fontSize="lg" color="gray.600">
          Get started by logging in or registering
        </Text>
          <HStack spacing={4}>
          <Button as={RouterLink} to="/login" colorScheme="teal" size="lg" width="full">
            Login
          </Button>
          <Button as={RouterLink} to="/register" colorScheme="blue" size="lg" width="full">
            Register
          </Button>
        </HStack>
        </>
        :  <Heading as="h1" size="xl" color="blue">
          Welcome {`${name.charAt(0).toUpperCase()}${name.slice(1)}`}!
        </Heading>
        }
      </VStack>
    </Box>
  );
};

