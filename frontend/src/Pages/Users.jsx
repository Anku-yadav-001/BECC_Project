import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Text,
  Badge,
  useColorModeValue,
  Icon,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaAddressCard,
  FaVenusMars,
  FaUserShield,
  FaRegClock,
} from 'react-icons/fa';
import axios from 'axios';

export function Users() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tableBgColor = useColorModeValue('white', 'gray.800');
  const tableBorderColor = useColorModeValue('gray.200', 'gray.600');
  const tableHeaderBg = useColorModeValue('blue.500', 'blue.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'white');
  const headingColor = useColorModeValue('teal.500', 'teal.300');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/auth/all-users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        console.log(response)
        setUsersData(response.data.users);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Box p={8} maxW="100%" mx="auto" borderRadius="lg" shadow="lg" bg={tableBgColor} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={8} maxW="100%" mx="auto" borderRadius="lg" shadow="lg" bg={tableBgColor}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={8} maxW="100%" mx="auto" borderRadius="lg" shadow="lg" bg={tableBgColor}>
      <Heading size="lg" mb={6} textAlign="center" color={headingColor} textTransform="uppercase">
        All Registered Users in this Website
      </Heading>
      <TableContainer>
        <Table variant="striped" bg={tableBgColor} borderRadius="md" shadow="md" overflow="hidden">
          <Thead>
            <Tr bgGradient="linear(to-r, teal.500, blue.500)" color="white">
              <Th color="white"><Icon as={FaUser} mr={2} /> Name</Th>
              <Th color="white"><Icon as={FaEnvelope} mr={2} /> Email</Th>
              <Th color="white"><Icon as={FaCalendarAlt} mr={2} /> Age</Th>
              <Th color="white"><Icon as={FaAddressCard} mr={2} /> Address</Th>
              <Th color="white"><Icon as={FaVenusMars} mr={2} /> Gender</Th>
              <Th color="white"><Icon as={FaUserShield} mr={2} /> Role</Th>
              <Th color="white"><Icon as={FaRegClock} mr={2} /> Created At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {usersData?.map((user, index) => (
              <Tr
                key={index}
                _hover={{ bg: hoverBg, transform: 'scale(1.02)', transition: 'all 0.2s ease-in-out' }}
                borderBottom={`1px solid ${tableBorderColor}`}
              >
                <Td>
                  <Text fontWeight="bold" color={textColor}>
                    {user.name}
                  </Text>
                </Td>
                <Td>{user.email}</Td>
                <Td>{user.age}</Td>
                <Td>{user.address}</Td>
                <Td>
                  <Badge
                    px={2}
                    py={1}
                    rounded="full"
                    colorScheme={user.gender === 'Male' ? 'blue' : user.gender === 'Female' ? 'pink' : 'purple'}
                  >
                    {user.gender}
                  </Badge>
                </Td>
                <Td>
                  <Badge
                    px={2}
                    py={1}
                    rounded="full"
                    colorScheme={user.role === 'Admin' ? 'red' : user.role === 'Seller' ? 'yellow' : 'green'}
                  >
                    {user.role}
                  </Badge>
                </Td>
                <Td>{new Date(user.createdDate).toLocaleDateString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
