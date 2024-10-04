import React, { useContext, useState } from 'react';
import { Box, Flex, HStack, Link, Button, Icon, useColorModeValue, Spacer, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Text, useToast } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

export function Navbar() {
  const { handleLogout } = useContext(AuthContext)
  const [openModal, setOpenModal] = useState(false)
  const token = localStorage.getItem("accessToken")
  const name  = localStorage.getItem("name")

  function handleLogoutUser() {
    handleLogout()
    setOpenModal(false)
  }

  return (
    <Box bg={useColorModeValue('gray.500', 'gray.400')} px={4} shadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Icon as={FaShoppingCart} w={6} h={6} />
        </HStack>
        <Spacer />

        <HStack as="nav" spacing={4}>
          <Link as={RouterLink} to="/" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700') }}>
            Home
          </Link>
          <Link as={RouterLink} to="/products" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700') }}>
            Products
          </Link>
          <Link as={RouterLink} to="/users" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700') }}>
            Users
          </Link>
          {
            !token ? <Link as={RouterLink} to="/register" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700') }}>
              Register
            </Link> : null
          }
          {
            !token ? <Link as={RouterLink} to="/login" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700') }}>
              Login
            </Link> : <div style={{display:"flex",alignItems:"center"}}>
              <Text color="red" fontWeight="bold" fontSize="20px">Hi {`${name.charAt(0).toUpperCase()}${name.slice(1)}`}</Text>
              <Box
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      width="30px"
      height="30px"
      bg="white"
      border="2px solid black"  
      borderRadius="50%"  
      fontWeight="bold"
      marginLeft="2px"
    >
      {name.charAt(0).toUpperCase()}
    </Box>
            </div>
          }
          {
            token ? <Button colorScheme="teal" onClick={() => setOpenModal(true)}>
              Logout
            </Button> : null
          }
        </HStack>
      </Flex>

      <Modal isOpen={openModal} onClose={openModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Logout</ModalHeader>
          <ModalBody>
            <Text>Are you sure you want to logout?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleLogoutUser} >
              Logout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
