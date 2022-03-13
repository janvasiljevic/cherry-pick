import {
  Box,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Switch,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../services/UserService';

export const User = () => {
  const { id } = useParams();
  const toast = useToast();

  const { user, isLoading, isError, mutate } = useUser(id || '');

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (isError) {
    return <Text>Error</Text>;
  }

  return (
    <Container py={6} w="full" maxW="container.xl">
      <Box p={4}>
        <Text fontSize="4xl" align="center" mt="4">
          {user.email}
        </Text>
      </Box>

      <Flex w="full" align="center" justify={'center'} p="8" direction={'column'}>
        <Stack direction={'row'}>
          <PreetyButton
            title="Offered his help"
            colorFrom="rgba(150,93,233,1)"
            colorTo="rgba(99,88,238,1)"
            count={user.BidAssisted.length}
          />
          <PreetyButton
            title="Achievments"
            colorFrom="rgba(255,94,7,1)"
            colorTo="rgba(255,197,61,1)"
            count={user.Achievement.length}
          />
        </Stack>

        <Heading p="8" fontWeight={300}>
          🔥 Badges 🔥
        </Heading>

        <Stack direction={'column'} spacing="6">
          {['1', '2'].map((el) => (
            <Achievement key={el} />
          ))}
        </Stack>
      </Flex>
    </Container>
  );
};

const Achievement = () => {
  return (
    <Box shadow={'xl'} borderRadius="xl" p="7">
      {' '}
      NFT 1
    </Box>
  );
};

const PreetyButton = ({ title, count, colorFrom, colorTo }: any) => {
  return (
    <Flex
      w="150px"
      h="150px"
      m="1"
      rounded="md"
      bg="white"
      shadow="xl"
      alignItems="center"
      justify="center"
      direction="column"
      borderColor={colorFrom}
      borderWidth="2px"
      outlineOffset="19px"
    >
      <Text bgGradient={`linear(to-l,${colorFrom},${colorTo})`} bgClip="text" align="center">
        {count}
      </Text>
      <Text bgGradient={`linear(to-l,${colorFrom},${colorTo})`} bgClip="text" align="center">
        {title}
      </Text>
    </Flex>
  );
};
