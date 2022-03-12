import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Collapse,
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
import useGeolocation from "react-hook-geolocation";

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
  const steps = 3;

  const [step, setStep] = useState(0);
  const [accType, setAccType] = useState<"user" | "tech" | "none">("none");
  const [location, setLocation] = useState<
    GeolocationPosition | boolean | undefined
  >(undefined);
  const [age, setAge] = useState<number>(0);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const onSubmitLogin = () => console.log;

  const getLocation = () => {
    setLocation(false);
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(position);
    });
  };

  return (
    <Container py={6} w="full" maxW="container.xl" h="full">
      <Stepper numSteps={steps} step={step} />

      <Collapse in={step == 0} animateOpacity>
        <Stack w="full" align="start" p={4} spacing={8}>
          <TabHead title="What are you after?" />
          <Flex w="full" justify="space-around">
            <Stack
              border="4px"
              borderRadius="md"
              p={8}
              borderColor={accType == "tech" ? "teal.400" : "blackAlpha.200"}
              cursor="pointer"
              shadow="lg"
              direction="column"
              align="center"
              spacing={4}
              onClick={() => {
                setAccType("tech");
              }}
            >
              <Box fontSize="2xl">I want to help!</Box>
              <FaCogs fontSize="200%" />
              <Box>Sign in as a technitian</Box>
            </Stack>

            <Stack
              border="4px"
              borderRadius="md"
              p={8}
              borderColor={accType == "user" ? "teal.400" : "blackAlpha.200"}
              cursor="pointer"
              shadow="lg"
              direction="column"
              align="center"
              spacing={4}
              onClick={() => {
                setAccType("user");
              }}
            >
              <Box fontSize="2xl">I have a problem(s)!</Box>
              <FaGrinBeamSweat fontSize="200%" />
              <Box>Sign in as a user</Box>
            </Stack>
          </Flex>
          <Button
            colorScheme="teal"
            variant="solid"
            type="submit"
            isLoading={isSubmitting}
            disabled={accType == "none"}
            onClick={() => {
              setStep(1);
            }}
          >
            Next
          </Button>
        </Stack>
      </Collapse>

      <Collapse in={step == 1} animateOpacity>
        <Stack w="full" align="start" p={4} spacing={8} alignItems="center">
          <TabHead title="What are you after?" />
          <Flex w="full" justify="center">
            <Stack spacing={6} align="start">
              <Box w="full">
                <Text p={1} opacity={0.9}>
                  Where do you live?
                </Text>
                <Button
                  isLoading={location == false}
                  loadingText="Waiting for popout"
                  onClick={() => {
                    getLocation();
                  }}
                >
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
                  value={age}
                  onChange={(e) => {
                    setAge(parseInt(e.target.value));
                  }}
                  placeholder="1680"
                  autoComplete="on"
                  type="number"
                />
              </Box>

              <Button
                colorScheme="teal"
                variant="solid"
                type="submit"
                isLoading={isSubmitting}
                disabled={age == 0 || location == null || location == false}
                isFullWidth
              >
                Next
              </Button>
            </Stack>
          </Flex>
        </Stack>
      </Collapse>

      <Collapse in={step == 2} animateOpacity>
        <Stack w="full" align="start" p={4} spacing={8} alignItems="center">
          <TabHead title="All wraped up" />
          <Stack spacing={6} align="center">
            <Text p={1} opacity={0.9}>
              That's it. Go to your profile and start using the app.
            </Text>

            <Button
              colorScheme="teal"
              variant="solid"
              type="submit"
              isLoading={isSubmitting}
              isFullWidth
            >
              Go to your account
            </Button>
          </Stack>
        </Stack>
      </Collapse>
    </Container>
  );
};
