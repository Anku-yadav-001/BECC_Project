import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  Image,
  Stack,
  Badge,
  Input,
  Select,
  Button,
  HStack,
  VStack,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, userRole, handleEdit, handleDelete }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardShadow = useColorModeValue('md', 'dark-lg');

  return (
    <Box
      bg={cardBg}
      p={4}
      borderRadius="md"
      boxShadow={cardShadow}
      maxW="sm"
      w="full"
      h="full"
      overflow="hidden"
      position="relative"
    >
      <Image src={product.url} alt={product.title} w="100%" h="150px" objectFit="cover" borderRadius="md" />
      <Stack mt={3}>
        <Heading fontSize="lg">{product.title}</Heading>
        <Text>{product.desc}</Text>
        <Text fontWeight="bold" color="green.500">${product.price}</Text>
        <Text>Brand: {product.brand}</Text>
        <Text>Warranty: {product.warranty}</Text>
        <Text>Category: {product.category}</Text>
        <Text>
          Stock: {product.stock > 0 ? `${product.stock} available` : <Badge colorScheme="red">Not available</Badge>}
        </Text>
        {(userRole === 'admin' || userRole === 'seller') && (
          <HStack spacing={2}>
            <Button size="sm" colorScheme="blue" onClick={() => handleEdit(product)}>Edit</Button>
            <Button size="sm" colorScheme="red" onClick={() => handleDelete(product._id)}>Delete</Button>
          </HStack>
        )}
      </Stack>
    </Box>
  );
};

const ProductGrid = ({ products, userRole, handleEdit, handleDelete }) => (
  <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
    {products.map((product) => (
      <ProductCard
        key={product._id}
        product={product}
        userRole={userRole}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    ))}
  </Grid>
);

export function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editProductData, setEditProductData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `http://localhost:8080/api/products?page=${currentPage}&title=${searchTerm}&category=${categoryFilter}&price=${priceFilter}&brand=${brandFilter}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      const data = await response.json();
      if (data.status === 200) {
        setProducts(data.products);

        const uniqueBrands = [...new Set(data.products.map((product) => product.brand))];
        const uniqueCategories = [...new Set(data.products.map((product) => product.category))];

        setAvailableBrands(uniqueBrands);
        setAvailableCategories(uniqueCategories);
      } else {
        console.error('Failed to fetch products:', data.message);
      }
    };

    fetchProducts();
  }, [searchTerm, categoryFilter, priceFilter, brandFilter, currentPage]);

  const handleEditProduct = (product) => {
    setEditProductData(product);
    onOpen();
  };

  const handleSaveProduct = async () => {
    if (!editProductData._id) {
      toast({
        title: 'Failed to update product',
        description: 'Product ID (_id) is missing. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const response = await fetch(`http://localhost:8080/api/products/${editProductData._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(editProductData),
    });

    const data = await response.json();

    if (data.status === 200) {
      setProducts(products.map((p) => (p._id === editProductData._id ? editProductData : p)));
      toast({
        title: 'Product updated successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: "bottom-right"
      });
      onClose();
    } else {
      toast({
        title: 'Failed to update product',
        description: data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteProduct = async (id) => {
    const response = await fetch(`http://localhost:8080/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    const data = await response.json();

    if (data.status === 200) {
      setProducts(products.filter((product) => product._id !== id));
      toast({
        title: 'Product deleted successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Failed to delete product',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} maxW="1200px" mx="auto">
      {/* Filters */}
      <VStack spacing={4} mb={6}>
        <Input
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="lg"
        />
        <HStack spacing={4} w="full">
          <Select
            placeholder="Filter by category"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1); // reset page on filter change
            }}
          >
            {availableCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <Select
            placeholder="Filter by price"
            value={priceFilter}
            onChange={(e) => {
              setPriceFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="low">Under $200</option>
            <option value="high">Above $200</option>
          </Select>
          <Select
            placeholder="Filter by brand"
            value={brandFilter}
            onChange={(e) => {
              setBrandFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            {availableBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </Select>
        </HStack>
      </VStack>

      {(userRole === 'admin' || userRole === 'seller') && (
        <Button colorScheme="green" mb={6} onClick={() => navigate('/add-product')}>
          Add Product
        </Button>
      )}

      <ProductGrid
        products={products}
        userRole={userRole}
        handleEdit={handleEditProduct}
        handleDelete={handleDeleteProduct}
      />

      <HStack mt={8} justifyContent="center">
        <Button isDisabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
          Previous
        </Button>
        <Text>Page {currentPage}</Text>
        <Button isDisabled={products.length < itemsPerPage} onClick={() => setCurrentPage((prev) => prev + 1)}>
          Next
        </Button>
      </HStack>

      {/* Edit Product Modal */}
      {editProductData && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Product</ModalHeader>
            <ModalCloseButton />
            <Divider />
            <ModalBody>
              <VStack spacing={4}>
                <Input
                  placeholder="Product title"
                  value={editProductData.title}
                  onChange={(e) => setEditProductData({ ...editProductData, title: e.target.value })}
                />
                <Input
                  placeholder="Product price"
                  value={editProductData.price}
                  onChange={(e) => setEditProductData({ ...editProductData, price: e.target.value })}
                />
                <Input
                  placeholder="Product brand"
                  value={editProductData.brand}
                  onChange={(e) => setEditProductData({ ...editProductData, brand: e.target.value })}
                />
                <Input
                  placeholder="Product warranty"
                  value={editProductData.warranty}
                  onChange={(e) => setEditProductData({ ...editProductData, warranty: e.target.value })}
                />
                <Input
                  placeholder="Product description"
                  value={editProductData.desc}
                  onChange={(e) => setEditProductData({ ...editProductData, desc: e.target.value })}
                />
                <Input
                  placeholder="Product category"
                  value={editProductData.category}
                  onChange={(e) => setEditProductData({ ...editProductData, category: e.target.value })}
                />
                <Input
                  placeholder="Product stock"
                  value={editProductData.stock}
                  onChange={(e) => setEditProductData({ ...editProductData, stock: e.target.value })}
                />
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSaveProduct}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}
