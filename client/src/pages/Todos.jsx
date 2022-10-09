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
    Text,
    ScaleFade,
    Tooltip,
    FormControl,
    FormLabel,
    Input,
    InputRightElement,
    InputGroup
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useFormik } from 'formik'


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
    const deleteTodo = async (id) => {
        try {
            const result = await axios.post(`http://localhost:5000/todo/delete/${id}`, id)
            getTodos()
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    const addTodo = async (description) => {
        try {
            await axios.post("http://localhost:5000/todo/add", description)
            getTodos()
        } catch (error) {
            console.log(error)
        }
    }
    const formik = useFormik({
        initialValues: {
            user_id: 1,
            description: ""
        },
        onSubmit:async (values) => {
            console.log(values)
            try {
            await addTodo(values)
            } catch (error) {
                console.log(error.message)
            }
        }
    })
    useEffect(() => {
        getTodos()
    }, [])

    return (
        <Container h={'60vh'} maxW='container.lg' justifyContent={'center'} centerContent>
            <Heading size={'2xl'} margin={'5'}>Todos</Heading>
                <FormControl>
                <form onSubmit={formik.handleSubmit}>
                    <InputGroup size={'md'}>
                        <Input
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            name='description'
                            onChange={formik.handleChange}
                            placeholder='Todo description'

                        />
                        <InputRightElement width='6rem'>
                            <Button type='submit' colorScheme={'green'} size='md'>
                                Add Todo
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    </form>
                </FormControl>
            
            <Table variant='striped' size={'lg'}>
                <Thead>
                    <Tr>
                        <Th fontSize={'2xl'} textAlign={'center'}>Todo</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        todos.map((todo) => (

                            <Tr key={todo.todo_id}>
                                <Td textAlign={'center'}><Text as={'b'} fontSize={'2xl'}>{todo.description}</Text></Td>
                                <Td>
                                    <Tooltip label={'Delete'} hasArrow>
                                        <IconButton
                                            margin={'-1.5'}
                                            size={'md'}
                                            fontSize={'x-large'}
                                            icon={<DeleteIcon />}
                                            bg={'red.500'}
                                            color={"white"}
                                            width={'50%'}
                                            _hover={{
                                                bg: 'red.400'
                                            }}
                                            onClick={() => { deleteTodo(todo.todo_id) }}
                                        />
                                    </Tooltip>
                                </Td>
                                <Td>
                                    <Tooltip label={'Update '} hasArrow>
                                        <IconButton
                                            margin={'-1.5'}
                                            size={'md'}
                                            fontSize={'x-large'}
                                            icon={<EditIcon />}
                                            bg={'yellow.400'}
                                            color={"white"}
                                            width={'50%'}
                                            _hover={{
                                                bg: 'yellow.300'
                                            }}
                                            onClick={() => { deleteTodo(todo.todo_id) }}
                                        />
                                    </Tooltip>
                                </Td>
                            </Tr>

                        ))
                    }

                </Tbody>
            </Table>
        </Container>

    )
}

export default Todos