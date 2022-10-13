import { ReactNode } from 'react';
import {
    Box,
    Flex,
    Button,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';


export default function Header() {
    const { colorMode, toggleColorMode } = useColorMode();
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
                    <Box>Pern Stack Todo App</Box>
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
                                <Button
                                    as={'a'}
                                    fontSize={'sm'}
                                    fontWeight={400}
                                    variant={'link'}
                                    href={'#'}>
                                    Sign In
                                </Button>
                                <Button
                                    fontSize={'sm'}
                                    fontWeight={600}
                                    color={'white'}
                                    bg={'purple.500'}
                                    href={'#'}
                                    _hover={{
                                        bg: 'purple.400',
                                    }}>
                                    Sign Up
                                </Button>

                               
                            </Stack>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}