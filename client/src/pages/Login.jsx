import React from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import axios from 'axios'
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {

  const {setAuth,auth,logout} = useContext(AuthContext)
  const toast = useToast()
  const navigate = useNavigate()

  const login = async (values) => {
    try {
      const result = await axios.post("http://localhost:5000/user/login", values)
      return result.data
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: async (values) => {
      try {
        const result = await login(values)
        if (result.jwtToken) {
          localStorage.setItem('token', result.jwtToken)
          setAuth(true)
          toast({
            title: 'Succesfully.',
            status: 'success',
            duration: 1000,
            isClosable: true,
          })
          console.log(auth)
          navigate("/todos")
        } else { 
          toast({
            title: result.message,
            status: 'error',
            duration: 1000,
            isClosable: true,
          })
        }
      } catch (error) {
        console.log(error)
      }
  }
  })

return (
  <Flex
    minH={'80vh'}
    align={'center'}
    justify={'center'}
  >
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        as='form'
        onSubmit={formik.handleSubmit}
        p={8}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              onChange={formik.handleChange}
              name="email"
              value={formik.values.email}
              required
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              onChange={formik.handleChange}
              name="password"
              value={formik.values.password}
              required
            />
          </FormControl>
          <Stack spacing={10}>
            <Button
              bg={'blue.400'}
              color={'white'}
              type='submit'
              _hover={{
                bg: 'blue.500',
              }}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
)
}

export default Login