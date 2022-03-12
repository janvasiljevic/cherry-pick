import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaUser, FaCogs, FaGrinBeamSweat, FaQuestion } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { Stepper } from "../components/Steps";

interface ITabHead {
  title: string;
}
const TabHead = ({ title }: ITabHead) => {
  return (
      <Box
        flex="1"
        textAlign="left"
        fontSize="3xl"
        fontWeight={"medium"}
        opacity={0.8}
      >
        {title}
      </Box>
  );
};

interface IFormInput {
  yearOfBirth: number;
}

export const GetStarted = () => {
  const [step, setStep] = useState(0);
  const steps = 4;
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const onSubmitLogin = () => console.log;

  return (
    <Container py={6} w="full" maxW="container.xl" h="full">
      <Stepper numSteps={steps} step={step} p={8} />

      {step == 0 && (
        <Stack w="full" align="start" p={4} spacing={8}>
          <TabHead title="What are you after?" />
          <Flex w="full" justify="space-around" >
            <Stack
              border="2px"
              borderRadius="md"
              p={8}
              borderColor="blackAlpha.200"
              cursor="pointer"
              shadow="lg"
              direction="column"
              align="center"
              spacing={4}
            >
              <Box fontSize="2xl">I want to help!</Box>
              <FaCogs fontSize="200%" />
              <Box>Sign in as a technitian</Box>
            </Stack>

            <Stack
              border="2px"
              borderRadius="md"
              p={8}
              borderColor="blackAlpha.200"
              cursor="pointer"
              shadow="lg"
              direction="column"
              align="center"
              spacing={4}
            >
              <Box fontSize="2xl">I have a problem(s)!</Box>
              <FaGrinBeamSweat fontSize="200%" />
              <Box>Sign in as a user</Box>
            </Stack>
          </Flex>
        </Stack>
      )}
      {step == 1 && (
        <Stack w="full" align="start" p={4} spacing={8}>
          <TabHead title="What are you after?" />
          <Flex w="full" justify="start" >
            <Stack spacing={6} align="start">
                <Box w="full">
                  <Text p={1} opacity={0.9}>
                    Where do you live?
                  </Text>
                  <Button isLoading={false} loadingText="Waiting for popout">
                    Get location from browser
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
                        We are storing, but never displaying your accurate
                        location. It is only used to connect nearest client -
                        technitian relations.
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Box>

                <Box w="full">
                  <Text p={1} opacity={0.9}>
                    What year weere you born in?
                  </Text>
                  <Input
                    {...register("yearOfBirth")}
                    placeholder="1680"
                    autoComplete="on"
                  />
                </Box>

                <Button
                  colorScheme="teal"
                  variant="solid"
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={true}
                >
                  Next
                </Button>
              </Stack>
          </Flex>
        </Stack>
      )}

      {/* <AccordionItem>
          <TabHead title="Tell us about you." />
          <AccordionPanel pb={4}>
            <form onSubmit={handleSubmit(onSubmitLogin)}>
              <Stack spacing={6} align="start">
                <Box w="full">
                  <Text p={1} opacity={0.9}>
                    Where do you live?
                  </Text>
                  <Button isLoading={false} loadingText="Waiting for popout">
                    Get location from browser
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
                        We are storing, but never displaying your accurate
                        location. It is only used to connect nearest client -
                        technitian relations.
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Box>

                <Box w="full">
                  <Text p={1} opacity={0.9}>
                    What year weere you born in?
                  </Text>
                  <Input
                    {...register("yearOfBirth")}
                    placeholder="1680"
                    autoComplete="on"
                  />
                </Box>

                <Button
                  colorScheme="teal"
                  variant="solid"
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={true}
                >
                  Next
                </Button>
              </Stack>
            </form>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <TabHead title="All wraped up" />
          <AccordionPanel pb={4}>
            <Stack spacing={6} align="start">
              <Text p={1} opacity={0.9}>
                That's it. Go to your profile and start using the app.
              </Text>

              <Button
                colorScheme="teal"
                variant="solid"
                type="submit"
                isLoading={isSubmitting}
              >
                Go to your account
              </Button>
            </Stack>
          </AccordionPanel>
        </AccordionItem> */}
    </Container>
  );
};
