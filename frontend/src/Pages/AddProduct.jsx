import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Heading,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    title: '',
    desc: '',
    price: '',
    stock: '',
    category: '',
    brand: '',
    warranty: '',
    url: '',
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://becc-project-1.onrender.com/api/products', productData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      toast({
        title: response.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setProductData({
        title: '',
        desc: '',
        price: '',
        stock: '',
        category: '',
        brand: '',
        warranty: '',
        url: '',
      });
    } catch (error) {
      toast({
        title: 'Failed to add product',
        description: error.response?.data.message || 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6} maxW="50%" mx="auto" borderWidth={1} borderRadius="lg" boxShadow="lg" mt="20px">
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Add Product
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel>Title</FormLabel>
          <Input
            name="title"
            value={productData.title}
            onChange={handleChange}
            placeholder="Product Title"
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="desc"
            value={productData.desc}
            onChange={handleChange}
            placeholder="Product Description"
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            placeholder="Product Price"
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Stock</FormLabel>
          <Input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            placeholder="Available Stock"
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Category</FormLabel>
          <Select
            name="category"
            value={productData.category}
            onChange={handleChange}
            placeholder="Select Category"
          >
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home">Home</option>
            <option value="Beauty">Beauty</option>
            <option value="Books">Books</option>
            <option value="Sports">Sports</option>
          </Select>
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Brand</FormLabel>
          <Input
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            placeholder="Product Brand"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Warranty</FormLabel>
          <Input
            name="warranty"
            value={productData.warranty}
            onChange={handleChange}
            placeholder="Warranty Period"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>URL</FormLabel>
          <Input
            name="url"
            value={productData.url}
            onChange={handleChange}
            placeholder="Product URL"
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full">
          Add Product
        </Button>
      </form>
    </Box>
  );
};

export default AddProduct;
