import {
  Box,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
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

export const User = () => {
  const { id } = useParams();
  const toast = useToast();

  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`api/user/${id}`)
      .then(() => {})
      .catch(() => {
        toast({ description: 'Error', status: 'error', duration: 9000, isClosable: true });
      });
  }, [id]);

  return (
    <Container py={6} w="full" maxW="container.xl">
      <Box p={4}>
        <Text fontSize="4xl">User: {id}</Text>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="enable" mb="0">
            Enabled
          </FormLabel>
          <Switch
            id="enable"
            value="{enabled}"
            onChange={(e) => {
              // setEnabled(e.target.value);
            }}
          />
        </FormControl>
      </Box>
      <form action="">
        <Stack spacing={6}>
          <InputGroup>
            <InputLeftAddon children="Username" />
            <Input type="text" placeholder="my name" />
          </InputGroup>
          <Textarea placeholder="No notes yet..." />
        </Stack>
      </form>
    </Container>
  );
};
