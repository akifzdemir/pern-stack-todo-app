import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Container,
    Heading,
    Button,
    IconButton,
    Text
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { DeleteIcon } from '@chakra-ui/icons'


function Todos() {

    const [todos, setTodos] = useState([])
    const getTodos = async () => {
        try {
            const result = await axios.get("http://localhost:5000/todo")
            setTodos(result.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getTodos()
    }, [])

    return (

        <Container h={'100vh'} maxW='container.lg' justifyContent={'center'} centerContent>
            <Heading size={'2xl'}>Todos</Heading>
            <Table variant='striped' size={'lg'}>
                <Thead>
                    <Tr>
                        <Th fontSize={'2xl'} textAlign={'center'}>Todo</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        todos.map((todo) => (
                            <Tr>
                                <Td textAlign={'center'}><Text as={'b'} fontSize={'2xl'}>{todo.description}</Text></Td>
                                <Td><IconButton
                                    margin={'-1.5'}
                                    size={'md'}
                                    fontSize={'x-large'}
                                    icon={<DeleteIcon />}
                                    bg={'red.500'}
                                    color={"white"}
                                    width={'50%'}
                                    _hover={{
                                        bg:'red.400'
                                    }}
                                /></Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </Container>

    )
}

export default Todos