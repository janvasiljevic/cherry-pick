import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Spacer,
  Square,
  Stack,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  IFormInput,
  onSubmitLogin,
  onSubmitRegister,
} from "../services/LoginService";

import  {FaEthereum} from "react-icons/fa"

export const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();
  

  return (
    <Container>
      <Box borderWidth="1px" borderRadius="lg" p={8}>
        <Flex align="center">
          <FaEthereum fontSize="200%"/>
          <Text fontSize="3xl" textAlign="left" p={6} fontWeight="bold">
            Pew pew
          </Text>
          <FaEthereum fontSize="200%"/>

        </Flex>
        <Tabs>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </TabList>

          <TabPanels>
            {/* login */}
            <TabPanel>
              <form onSubmit={handleSubmit(onSubmitLogin)}>
                <FormControl
                // isInvalid={false}
                // isInvalid={errors.usežrname != null || errors.password != null}
                >
                  <VStack spacing={4}>
                    <Input
                      {...register("username")}
                      placeholder="Username"
                      autoComplete="on"
                    />

                    <Input
                      {...register("password")}
                      placeholder="Password"
                      autoComplete="on"
                    />

                    <Button
                      colorScheme="teal"
                      variant="solid"
                      isFullWidth={true}
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Login
                    </Button>
                  </VStack>
                </FormControl>
              </form>
            </TabPanel>

            {/* register */}
            <TabPanel>
              <form onSubmit={handleSubmit(onSubmitRegister)}>
                <FormControl>
                  <VStack spacing={4}>
                    <Input
                      {...register("username")}
                      placeholder="Username"
                      autoComplete="on"
                    />
                    <Input
                      {...register("password")}
                      placeholder="Password"
                      type="password"
                      autoComplete="on"
                    />
                    <Input
                      {...register("email")}
                      placeholder="Email"
                      type="email"
                      autoComplete="on"
                    />

                    <Button
                      colorScheme="teal"
                      variant="solid"
                      isFullWidth={true}
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Register
                    </Button>
                  </VStack>
                </FormControl>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};
