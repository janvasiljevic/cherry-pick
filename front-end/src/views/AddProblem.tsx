import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaCoffee, FaPizzaSlice, FaChartPie } from 'react-icons/fa';
import { IconDesktop, IconMobile, IconOther, IconPrinter } from '../components/Icons';
import { Stepper } from '../components/Steps';

import { MdLunchDining } from 'react-icons/md';
import { createBid } from '../services/BidsApi';
import { useNavigate } from 'react-router-dom';

interface ITabHead {
  title: string;
}
const TabHead = ({ title }: ITabHead) => {
  return (
    <Box flex="1" textAlign="center" fontSize="3xl" fontWeight={'medium'} opacity={0.8} w="100%">
      {title}
    </Box>
  );
};

const AddProblem = () => {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState('');

  const tipModal = useDisclosure();
  const endModal = useDisclosure();

  const navigate = useNavigate();

  const [query, setQuery] = useState({
    typeOfProblem: 'OTHER',
    description: '',
    tipAmount: 0,
  });

  const [description, setDescription] = useState('');

  const setType = (typeOfProblem: string) => {
    setQuery((oldQuery) => ({
      ...oldQuery,
      typeOfProblem,
    }));

    setStep(1);
  };

  const setDesription = (description: string) => {
    setQuery((oldQuery) => ({
      ...oldQuery,
      description,
    }));

    setStep(2);
  };

  const setTipAmount = (tipAmount: number) => {
    setQuery((oldQuery) => ({
      ...oldQuery,
      tipAmount,
    }));

    createBid(query)
      .then(() => {
        navigate('/bids');
      })
      .finally(() => {
        tipModal.onClose();
        endModal.onOpen();
      });
  };

  useEffect(() => {
    switch (step) {
      case 0:
        setTitle('What are you experiencing problems with?');
        break;
      case 1:
        setTitle('Please write a short description');
        break;
      case 2:
        setTitle('Are you prepared to give a tip?');
        break;
    }
  }, [step]);

  return (
    <Container py={6} w="full" maxW="container.md" mt="8">
      <Stepper numSteps={3} step={step} />
      <Container mt="16">
        <Stack w="full" align="start" p={4} spacing={8}>
          <TabHead title={title} />

          {step == 0 && (
            <Grid
              w="full"
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(2, 1fr)"
              gap={6}
              alignItems="center"
              justifyContent="center"
              justifyItems="center"
            >
              <ProblemBox title="Mobile Device" icon={IconMobile} click={() => setType('MOBILE')} />
              <ProblemBox title="Desktop Device" icon={IconDesktop} click={() => setType('DESKTOP')} />
              <ProblemBox title="Printer" icon={IconPrinter} click={() => setType('PRINTER')} />
              <ProblemBox title="Other" icon={IconOther} click={() => setType('OTHER')} />
            </Grid>
          )}

          {step == 1 && (
            <Flex w="full" justify="start">
              <Stack spacing={6} align="start" w="full">
                <Textarea
                  placeholder="Write your description here"
                  resize={'none'}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <Flex justify={'end'} w="full">
                  <Button
                    colorScheme="teal"
                    variant="solid"
                    type="submit"
                    disabled={description.length < 20}
                    alignSelf="right"
                    onClick={() => setDesription(description)}
                  >
                    Next
                  </Button>
                </Flex>
              </Stack>
            </Flex>
          )}

          {step == 2 && (
            <Flex w="full" justify="center" align={'center'}>
              <Stack direction="row" spacing={4} align="center" justify={'center'} w="full">
                <Button colorScheme="pink" variant="solid" onClick={tipModal.onOpen}>
                  Yes
                </Button>
                <Button colorScheme="blue" variant="outline" onClick={() => setTipAmount(0)}>
                  No
                </Button>
              </Stack>
            </Flex>
          )}
        </Stack>
      </Container>

      <>
        {/* tip modal */}
        <Modal isOpen={tipModal.isOpen} onClose={tipModal.onClose}>
          <ModalOverlay />

          <ModalContent>
            <ModalHeader>Tip amount</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)" gap={6} pb={4}>
                <TipBox click={() => setTipAmount(200)} title="2€" subtitle="Kafe" icon={FaCoffee}></TipBox>
                <TipBox click={() => setTipAmount(500)} title="5€" subtitle="5/3 Burek-a" icon={FaChartPie}></TipBox>
                <TipBox click={() => setTipAmount(1000)} title="10€" subtitle="Pizza" icon={FaPizzaSlice}></TipBox>
                <TipBox click={() => setTipAmount(1500)} title="15€" subtitle="Kosilo" icon={MdLunchDining}></TipBox>
              </Grid>
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* end modal */}
        <Modal isOpen={endModal.isOpen} onClose={endModal.onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Process finished</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              You are all set! Your messages was broadcasted to the world and assistants are now able to assist you{' '}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={endModal.onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </Container>
  );
};

const ProblemBox = ({ title, icon, click }: any) => {
  return (
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
      onClick={click}
      width="300px"
    >
      <Icon as={icon} fontSize="4xl"></Icon>
      <Box fontSize="2xl">{title}</Box>
    </Stack>
  );
};

const TipBox = ({ title, icon, subtitle, click }: any) => {
  return (
    <Stack
      border="2px"
      borderRadius="md"
      p={2}
      borderColor="blackAlpha.200"
      cursor="pointer"
      direction="column"
      align="center"
      spacing={2}
      onClick={click}
      height="150px"
      justify={'center'}
    >
      <Icon as={icon} fontSize="2xl"></Icon>
      <Box fontSize="2xl" fontWeight={700}>
        {title}
      </Box>
      <Box fontSize="sm">{subtitle}</Box>
    </Stack>
  );
};

export default AddProblem;
