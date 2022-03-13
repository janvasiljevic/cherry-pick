import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCogs, FaGrinBeamSweat, FaQuestion } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Stepper } from '../components/Steps';

interface ITabHead {
  title: string;
}
const TabHead = ({ title }: ITabHead) => {
  return (
    <Box flex="1" textAlign="center" fontSize="3xl" w="full" fontWeight={'medium'} opacity={0.8}>
      {title}
    </Box>
  );
};

interface IFormInput {
  yearOfBirth: number;
}

export const GetStarted = () => {
  const [step, setStep] = useState(0);
  const [accType, setAccType] = useState<'user' | 'assistant' | 'none'>('none');
  const [location, setLocation] = useState<GeolocationPosition | undefined>(undefined);

  const [age, setAge] = useState<number>(1960);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');

  const redirect = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const finishRegister = () => {
    axios
      .post('api/register', {
        email,
        password,
        userType: accType === 'user' ? 'USER' : 'ASSISTANT',
        yearOfBirth: age,
        telephoneNumber: telephone,
        longitude: location?.coords.longitude,
        latitude: location?.coords.latitude,
      })
      .catch((e) => {
        console.log(e);
      })
      .then(() => {
        setStep(2);
      });
  };

  const [title, setTitle] = useState('');

  useEffect(() => {
    switch (step) {
      case 0:
        setTitle('What are you after?');
        break;
      case 1:
        setTitle('Quick description');
        break;
      case 2:
        setTitle('We are done');
        break;
    }
  }, [step]);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => setLocation(position));
  };

  return (
    <Container py={6} w="full" maxW="container.md">
      <Stepper numSteps={3} step={step} />

      <Stack w="full" align="start" spacing={8}>
        <TabHead title={title} />

        {step == 0 && (
          <Flex w="full" justify="space-around">
            <Stack spacing={4}>
              <Stack direction={'row'} spacing={10} mb="10">
                <Stack
                  border="2px"
                  borderRadius="md"
                  p={4}
                  borderColor={accType == 'assistant' ? 'teal.400' : 'blackAlpha.200'}
                  cursor="pointer"
                  shadow="lg"
                  direction="column"
                  align="center"
                  spacing={4}
                  onClick={() => {
                    setAccType('assistant');
                  }}
                >
                  <Box fontSize="2xl">I want to help!</Box>
                  <FaCogs fontSize="200%" />
                  <Box>Register as an Assistant</Box>
                </Stack>

                <Stack
                  border="2px"
                  borderRadius="md"
                  p={4}
                  borderColor={accType == 'user' ? 'teal.400' : 'blackAlpha.200'}
                  cursor="pointer"
                  shadow="lg"
                  direction="column"
                  align="center"
                  spacing={4}
                  onClick={() => {
                    setAccType('user');
                  }}
                >
                  <Box fontSize="2xl">I have a problem(s)!</Box>
                  <FaGrinBeamSweat fontSize="200%" />
                  <Box>Register here</Box>
                </Stack>
              </Stack>

              <Button
                colorScheme="teal"
                variant="solid"
                type="submit"
                isLoading={isSubmitting}
                disabled={accType == 'none'}
                onClick={() => {
                  setStep(1);
                }}
                width="200px"
                alignSelf={'center'}
              >
                Next
              </Button>
            </Stack>
          </Flex>
        )}

        {step == 1 && (
          <Flex w="full" justify="center">
            <Stack spacing={6} align="start">
              <Box w="full">
                <Text p={1} opacity={0.9}>
                  Where do you live?
                </Text>
                <Button
                  loadingText="Waiting for popout"
                  onClick={() => {
                    getLocation();
                  }}
                  disabled={!!location}
                >
                  {location ? 'Location found' : 'Get location from browser'}
                </Button>
                <Popover>
                  <PopoverTrigger>
                    <Button mx={4}>
                      <FaQuestion />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Info</PopoverHeader>
                    <PopoverBody>
                      We are storing, but never displaying your accurate location. It is only used to connect nearest
                      client - technitian relations.
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Box>

              <Box w="full">
                <Text p={1} opacity={0.9}>
                  What year were you born in?
                </Text>
                <Input
                  value={age}
                  onChange={(e) => {
                    setAge(parseInt(e.target.value));
                  }}
                  placeholder="1980"
                  autoComplete="on"
                  type="number"
                />
              </Box>

              <Box w="full">
                <Text p={1} opacity={0.9}>
                  Telephone number
                </Text>
                <Input
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="031 123 456"
                  autoComplete="on"
                />
              </Box>

              <Box w="full">
                <Text p={1} opacity={0.9}>
                  Email address
                </Text>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@example.com"
                  autoComplete="on"
                />
              </Box>

              <Box w="full">
                <Text p={1} opacity={0.9}>
                  Password
                </Text>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="on"
                  type="password"
                />
              </Box>

              <Button
                colorScheme="teal"
                variant="solid"
                type="submit"
                isLoading={isSubmitting}
                disabled={email.length == 0 || telephone.length == 0 || password.length == 0 || !location}
                onClick={() => {
                  finishRegister();
                }}
                width="200px"
                alignSelf={'center'}
              >
                Next
              </Button>
            </Stack>
          </Flex>
        )}

        {step == 2 && (
          <Flex w="full" justify="center">
            <Stack spacing={6} align="center">
              <Text p={1} opacity={0.9}>
                That's it. Go to your profile and start using the app.
              </Text>

              <Button
                width="200px"
                alignSelf={'center'}
                colorScheme="teal"
                variant="solid"
                onClick={() => redirect('/login')}
              >
                Login
              </Button>
            </Stack>
          </Flex>
        )}
      </Stack>
    </Container>
  );
};
