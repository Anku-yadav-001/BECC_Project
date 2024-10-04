import { createContext, useState } from "react"
import {
    useToast
  } from '@chakra-ui/react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
export const AuthContext = createContext()
export function AuthContextProvider({children}){
    const toast = useToast()
  const navigate = useNavigate()
    
    async function handleLogin({email, password}){
        try {
            const response = await axios.post('https://becc-project-1.onrender.com/api/auth/login', {
              email,
              password,
            });
            switch (response.data.status) {
              case 200:
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                localStorage.setItem("name",response.data.name)
                localStorage.setItem("role",response.data.role)
                toast({
                  title: 'Login Successful',
                  description: `Welcome back, ${response.data.name}!`,
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                  position:"bottom-right"
                });
                navigate("/products")
                break;
              case 404:
                toast({
                  title: 'User Not Found',
                  description: response.data.message,
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                  position:"bottom-right"
                });
                break;
              case 403:
                toast({
                  title: 'Invalid Password',
                  description: response.data.message,
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                  position:"bottom-right"
                });
                break;
              default:
                toast({
                  title: 'Login Failed',
                  description: 'An unexpected error occurred. Please try again.',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                  position:"bottom-right"
                });
                break;
            }
          } catch (error) {
            toast({
              title: 'Error',
              description: error.response?.data?.message || 'Unable to connect to the server.',
              status: 'error',
              duration: 5000,
              isClosable: true,
              position:"bottom-right"
              });
          }
    }

    const handleLogout = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          toast({
            title: "No token found.",
            description: "Please log in first.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return;
        }
  
        const response = await axios.post('https://becc-project-1.onrender.com/api/auth/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem("refreshToken")
          localStorage.removeItem("name")
          localStorage.removeItem("role")
          toast({
            title: "Logged out successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate('/login');
        } else {
          toast({
            title: "Logout failed.",
            description: "Something went wrong, please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "Error during logout.",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        onClose();
      }
    };
  

    return <AuthContext.Provider value={{handleLogin,handleLogout}}>
        {children}
    </AuthContext.Provider>
}