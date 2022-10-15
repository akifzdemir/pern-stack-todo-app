import { ReactNode } from 'react';
import {
    Box,
    Flex,
    Button,
    useColorModeValue,
    Stack,
    useColorMode,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    Avatar,
    Center
} from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';


export default function Header() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { auth, logout, user } = useContext(AuthContext)
    return (
        <>
            <Box bg={useColorModeValue('white', 'gray.800')} px={5}>
                <Flex bg={useColorModeValue('white', 'gray.800')}
                    color={useColorModeValue('gray.600', 'white')}
                    minH={'60px'}
                    py={{ base: 2 }}
                    px={{ base: 4 }}
                    borderBottom={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.900')}
                    align={'center'}
                    justifyContent={'space-between'}
                    boxShadow={'base'}

                >
                    <Box as={Link} to={'/'}>Pern Stack Todo App</Box>
                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={5}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>
                            <Stack
                                flex={{ base: 1, md: 0 }}
                                justify={'flex-end'}
                                direction={'row'}
                                spacing={6}>
                                {
                                    auth === false
                                        ?
                                        <>
                                            <Button
                                                fontSize={'sm'}
                                                fontWeight={400}
                                                variant={'link'}
                                                as={Link}
                                                to={'/login'}
                                            >
                                                Sign In
                                            </Button>
                                            <Button
                                                fontSize={'sm'}
                                                fontWeight={600}
                                                color={'white'}
                                                bg={'purple.500'}
                                                _hover={{
                                                    bg: 'purple.400',
                                                }}
                                                as={Link}
                                                to={'/register'}
                                            >
                                                Sign Up
                                            </Button>
                                        </>
                                        :
                                        <>

                                            <Menu>
                                                <MenuButton
                                                    as={Button}
                                                    rounded={'full'}
                                                    variant={'link'}
                                                    cursor={'pointer'}
                                                    minW={0}>
                                                    <Avatar
                                                        size={'sm'}
                                                        name={user.userName}
                                                    />
                                                </MenuButton>
                                                <MenuList alignItems={'center'} zIndex={'dropdown'}>
                                                    <br />
                                                    <Center>
                                                        <Avatar
                                                            size={'2xl'}
                                                            name={user.userName}
                                                        />
                                                    </Center>
                                                    <br />
                                                    <Center>
                                                        <p>{user.userName}</p>
                                                    </Center>
                                                    <MenuDivider/>
                                                        <MenuItem textAlign={'center'} as={Link} to={"/todos"}>
                                                            My Todos
                                                        </MenuItem>
                                                </MenuList>
                                            </Menu>
                                            <Button
                                                fontSize={'sm'}
                                                fontWeight={600}
                                                color={'white'}
                                                bg={'purple.500'}
                                                _hover={{
                                                    bg: 'purple.400',
                                                }}
                                                onClick={() => { logout() }}
                                            >
                                                Log out
                                            </Button>
                                        </>
                                }


                            </Stack>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}