import { Box, Button, Container, Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { parseISO } from 'date-fns';
import { IconMapping } from '../components/Icons';
import { IBid, useBidsList } from '../services/BidsApi';

const AllBids = () => {
  const { bids, isLoading, isError } = useBidsList({ status: 'OPEN' });

  return (
    <Container maxW="container.lg" my="12">
      <Stack direction={'column'} spacing={6}>
        {bids && bids.filter(({ status }) => status === 'OPEN').map((bid) => <BidItem bid={bid} key={bid.id} />)}
        {bids && bids.filter(({ status }) => status === 'OPEN').length === 0 && <EmptyList />}
      </Stack>
    </Container>
  );
};

interface IProps {
  bid: IBid;
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

const BidItem = ({ bid }: IProps) => {
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
          <Button> Signup</Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default AllBids;
