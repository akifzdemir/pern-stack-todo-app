import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    Button,
    IconButton,
    useToast,
    Tooltip
} from '@chakra-ui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import { EditIcon } from '@chakra-ui/icons'

function TodoUpdateModal(props) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const updateTodo = async (values,token) => {
        console.log(values)
        try {
            await axios.post("http://localhost:5000/todo/update", values,{
                headers:{
                    'jwt_token':token
                }})
        } catch (error) {
            console.log(error)
        }
    }
    const formik = useFormik({
        initialValues: {
            id: props.todo_id,
            description: ""
        },
        onSubmit: async(values) => {
            const token  = localStorage.getItem('token')
            try {
               if (token) {
                await updateTodo(values,token)
               props.getTodos()
               onClose()
               toast({
                title: 'Todo updated.',
                status: 'success',
                duration: 1000,
                isClosable: true,
            })
               }else{
                toast({
                    title: 'Auth Error',
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
        <>
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
                    onClick={onOpen}

                />
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={formik.handleSubmit}>
                    <ModalContent>
                        <ModalHeader>Update Todo</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                                name='description'
                                onChange={formik.handleChange}
                                placeholder='Todo description'
                                required
                                autoComplete='off'
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant='ghost' type='submit'>Update</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}

export default TodoUpdateModal