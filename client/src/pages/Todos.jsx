import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Container,
    Heading
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import axios from 'axios'


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

        <Container h={'90vh'} maxW='container.lg' justifyContent={'center'} centerContent>
            <Heading size={'2xl'}>Todos</Heading>
            <Table variant='striped' size={'lg'}>
                <Thead>
                    <Tr>
                        <Th>Todo</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        todos.map((todo) => (
                            <Tr>
                                <Td>{todo.description}</Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </Container>

    )
}

export default Todos