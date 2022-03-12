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
} from "@chakra-ui/react";

export const User = () => {
  const id = 0;

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
