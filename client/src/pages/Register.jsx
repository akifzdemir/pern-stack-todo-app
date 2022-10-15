import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useFormik } from 'formik';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast()
    const {auth,setAuth} = useContext(AuthContext)
    const navigate = useNavigate()

    const register = async (values) => {
        try {
            const result = await axios.post("http://localhost:5000/user/register", values)
            return result.data
        } catch (error) {

        }
    }

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            password: "",
            email: ""
        },
        onSubmit: async (values) => {
            try {
                const result = await register(values)
                if (result.jwtToken) {
                    localStorage.setItem('token', result.jwtToken)
                    setAuth(true)
                    toast({
                        title: 'Succesfully.',
                        status: 'success',
                        duration: 1000,
                        isClosable: true,
                    })
                    navigate("/todos")
                }else{
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
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4} as='form' onSubmit={formik.handleSubmit}>
                        <HStack>
                            <Box >
                                <FormControl id="firstName" isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input
                                        type="text"
                                        name='firstName'
                                        onChange={formik.handleChange}
                                        value={formik.values.firstName}
                                        required
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="lastName" isRequired>
                                    <FormLabel >Last Name</FormLabel>
                                    <Input
                                        type="text"
                                        name='lastName'
                                        onChange={formik.handleChange}
                                        value={formik.values.lastName}
                                        required
                                    />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                name='email'
                                onChange={formik.handleChange}
                                required
                                value={formik.values.email}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    required
                                />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                type='submit'
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link color={'blue.400'}>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Register