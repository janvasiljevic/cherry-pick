import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { parseISO } from 'date-fns';
import { FaMoneyBill, FaPlus, FaQuestion } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IconMapping, IconPrinter } from '../components/Icons';
import { IBid, useBidsUser } from '../services/BidsApi';

const BidsList = () => {
  const { bids, isLoading, isError } = useBidsUser();

  console.log(bids);

  const navigate = useNavigate();

  const addClick = () => {
    navigate('add');
  };

  return (
    <Container maxW="container.lg">
      <Flex direction="column">
        {/* <Heading fontWeight={300} p={6}>
          Hello, Maja
        </Heading> */}

        <HStack spacing="100px" w="100%" align="center" justify="center" mt="12">
          <PreetyButton
            title="Add"
            colorFrom="rgba(150,93,233,1)"
            colorTo="rgba(99,88,238,1)"
            click={addClick}
            icon={FaPlus}
          />
          <PreetyButton title="Tip" colorFrom="rgba(61,245,167,1)" colorTo="rgba(9,111,224,1)" icon={FaMoneyBill} />
          <PreetyButton
            title="Frequently asked questions"
            colorFrom="rgba(255,94,7,1)"
            colorTo="rgba(255,197,61,1)"
            icon={FaQuestion}
          />
        </HStack>

        <Tabs mt="12">
          <TabList>
            <Tab>Open</Tab>
            <Tab>Assistant assigned</Tab>
            <Tab>Closed</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Stack direction={'column'} spacing={6}>
                {bids && bids.filter(({ status }) => status === 'OPEN').map((bid) => <HelpItem bid={bid} />)}
                {bids && bids.filter(({ status }) => status === 'OPEN').length === 0 && <EmptyList />}
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack direction={'column'} spacing={6}>
                {bids && bids.filter(({ status }) => status === 'CLOSED').map((bid) => <HelpItem bid={bid} />)}
                {bids && bids.filter(({ status }) => status === 'CLOSED').length === 0 && <EmptyList />}
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack direction={'column'} spacing={6}>
                {bids && bids.filter(({ status }) => status === 'ASSIGNED').map((bid) => <HelpItem bid={bid} />)}
                {bids && bids.filter(({ status }) => status === 'ASSIGNED').length === 0 && <EmptyList />}
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Container>
  );
};

interface IProps {
  bid: IBid;
}

const EmptyList = () => {
  return (
    <Flex w="full" p="8" align={'center'} justify="center">
      {' '}
      <Heading fontWeight={300} color="pink.300">
        {' '}
        Empty list{' '}
      </Heading>
    </Flex>
  );
};

const HelpItem = ({ bid }: IProps) => {
  return (
    <Box shadow="md" borderRadius={'md'}>
      <Stack direction={'row'}>
        <Flex align={'center'} justify="center">
          <Icon as={IconMapping(bid.typeOfProblem)} size="lg" ml="6"></Icon>
        </Flex>

        <Stack direction="column" p="4">
          <Heading size="md" fontWeight={500}>
            {bid.description}
          </Heading>
          <Text fontWeight={300} color="cyan.700">
            Created at:
            {parseISO(bid.createdAt).toLocaleDateString() + ' ' + parseISO(bid.createdAt).toLocaleTimeString()}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};

const PreetyButton = ({ title, icon, colorFrom, colorTo, click }: any) => {
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
      _hover={{ transform: 'scale(1.05)', shadow: 'dark', cursor: 'pointer' }}
      onClick={click}
    >
      <Icon as={icon} fontSize="2xl" color={colorTo} m="2" />
      <Text bgGradient={`linear(to-l,${colorFrom},${colorTo})`} bgClip="text" align="center">
        {title}
      </Text>
    </Flex>
  );
};

export default BidsList;
