import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';

export function Register() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    address: '',
    gender: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://becc-project-1.onrender.com/api/auth/signup', formData);
      switch (response.data.status) {
        case 201:
          toast({
            title: 'Registration Successful',
            description: `Welcome, ${response.data.data}!`,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom-right',
          });
          break;
        case 409:
          toast({
            title: 'User Already Exists',
            description: "try using different email",
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'bottom-right', 
          });
          break;
        case 400:
          toast({
            title: 'Registration Failed',
            description: response.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom-right',
          });
          break;
        default:
          toast({
            title: 'Unexpected Error',
            description: 'Something went wrong. Please try again.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom-right', 
          });
          break;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message || 'Something went wrong!';
        toast({
          title: 'An Error Occurred',
          description: errorMessage,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      } else {
        toast({
          title: 'An Error Occurred',
          description: 'Unable to connect to the server.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right', 
        });
      }
    }
  };

  return (
    <Box p={6} maxW="md" mx="auto" boxShadow="lg" borderRadius="md">
      <Text fontSize="2xl" mb={4} textAlign="center">Register</Text>
      <VStack spacing={4} as="form" onSubmit={handleRegister}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Your Password"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Age</FormLabel>
          <Input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            placeholder="Your Age"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Address</FormLabel>
          <Input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Your Address"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Gender</FormLabel>
          <Select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Role</FormLabel>
          <Select name="role" value={formData.role} onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
            <option value="user">User</option>
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="teal" w="full">
          Register
        </Button>
      </VStack>
    </Box>
  );
};
