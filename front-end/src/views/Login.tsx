import {
  Box,
  Button,
  chakra,
  Container,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  toast,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEthereum, FaLock, FaUserAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IFormInput, onSubmitLogin } from '../services/LoginService';

const CFaLock = chakra(FaLock);
const CFaUserAlt = chakra(FaUserAlt);

export const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();

  const onSubmit = (data: IFormInput) => {
    onSubmitLogin(data)
      .then((data) => {
        navigate('/bids');
      })
      .catch(() => {
        toast({
          title: 'Error logging in',
          description: 'Did you misstype your password?',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Container alignItems="center" justifyContent="center">
      <Text fontSize="3xl" textAlign="center" p={6} fontWeight="light">
        Login
      </Text>

      <Box borderWidth="1px" borderRadius="lg" p={8}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <VStack spacing={4}>
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.300" children={<CFaUserAlt color="gray.300" />} />
                <Input variant="flushed" {...register('email')} placeholder="email address" autoComplete="on" />
              </InputGroup>

              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.300" children={<CFaLock color="gray.300" />} />
                <Input
                  variant="flushed"
                  {...register('password')}
                  placeholder="password"
                  autoComplete="on"
                  type={showPassword ? 'text' : 'password'}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Button colorScheme="teal" variant="solid" isFullWidth={true} type="submit" isLoading={isSubmitting}>
                Login
              </Button>
            </VStack>
          </FormControl>
        </form>
      </Box>
    </Container>
  );
};
