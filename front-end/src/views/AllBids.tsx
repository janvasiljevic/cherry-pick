import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { parseISO } from 'date-fns';
import { IconMapping } from '../components/Icons';
import { IBid, useBidsList } from '../services/BidsApi';

const AllBids = () => {
  const { bids, isLoading, isError, mutate } = useBidsList({ status: 'OPEN' });

  const toast = useToast();

  const apiStuff = (bidId: string) => {
    axios
      .get(`api/bid/${bidId}/signup`)
      .then(() => {
        toast({ status: 'success', description: 'Successfully signed up!' });
        mutate();
      })
      .catch(() => toast({ status: 'error', description: 'Successfully signed up!' }));
  };

  return (
    <Container maxW="container.lg" my="12">
      <Tabs mt="12">
        <TabList>
          <Tab>Open</Tab>
          <Tab>Signed up</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Stack direction={'column'} spacing={6}>
              {bids &&
                bids
                  .filter(({ status }) => status === 'OPEN')
                  .map((bid) => <BidItem bid={bid} key={bid.id} click={apiStuff} />)}
              {bids && bids.filter(({ status }) => status === 'OPEN').length === 0 && <EmptyList />}
            </Stack>
          </TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

interface IProps {
  bid: IBid;
  click: Function;
}

const EmptyList = () => {
  return (
    <Flex w="full" p="8" align={'center'} justify="center">
      <Heading fontWeight={300} color="pink.300">
        Empty list
      </Heading>
    </Flex>
  );
};

const BidItem = ({ bid, click }: IProps) => {
  return (
    <Box shadow="md" borderRadius={'md'}>
      <Stack direction={'row'}>
        <Flex align={'center'} justify="center">
          <Icon as={IconMapping(bid.typeOfProblem)} fontSize="24px" ml="6"></Icon>
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

        <Flex align={'center'} justify="right" grow={1} pr="8">
          <Button onClick={() => click(bid.id)}> Signup</Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default AllBids;
