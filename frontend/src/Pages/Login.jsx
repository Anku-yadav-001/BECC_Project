import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
  Stack,
  Divider,
  Text,
} from '@chakra-ui/react';
import {redirect, useNavigate} from "react-router-dom"
import { AuthContext } from '../context/AuthContext';
export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {handleLogin} = useContext(AuthContext)
  const router = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin({email,password})

  };

  return (
    <Box
      w="100%"
      maxW="400px"
      mx="auto"
      mt="10"
      p="6"
      borderRadius="md"
      boxShadow="lg"
      bg="white"
    >
      <Heading mb="6" textAlign="center" color="teal.600">
        Login
      </Heading>
      <Divider mb="4" />
      <form onSubmit={handleSubmit}>
        <VStack spacing="4">
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              focusBorderColor="teal.500"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              focusBorderColor="teal.500"
            />
          </FormControl>

          <Button colorScheme="teal" type="submit" width="full">
            Login
          </Button>
          <Text textAlign="center">
            Don't have an account?{' '}
            <Button variant="link" colorScheme="teal" onClick={() => {router("/register")}}>
              Sign Up
            </Button>
          </Text>
        </VStack>
      </form>
    </Box>
  );
}
