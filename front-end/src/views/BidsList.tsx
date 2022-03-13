import { Box, Flex, Heading, HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { IconPrinter } from '../components/Icons';
import { useBidsList } from '../services/BidsApi';

const BidsList = () => {
  let { bids, isLoading, isError } = useBidsList();

  console.log(bids);

  return (
    <Flex direction="column">
      <Heading>Hello, Maja</Heading>

      <HStack spacing="100px" w="100%" align="center" justify="center">
        <PreetyButton title="Add" colorFrom="rgba(150,93,233,1)" colorTo="rgba(99,88,238,1)" />
        <PreetyButton title="Tip" colorFrom="rgba(61,245,167,1)" colorTo="rgba(9,111,224,1)" />
        <PreetyButton title="Frequently asked questions" colorFrom="rgba(255,94,7,1)" colorTo="rgba(255,197,61,1)" />
      </HStack>

      <Heading>Asked for help on this topics</Heading>

      <Heading>Received help on this topics</Heading>
    </Flex>
  );
};

const HelpOnThisItem = () => {};

const PreetyButton = ({ title, icon, colorFrom, colorTo }: any) => {
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
      _hover={{ transform: 'scale(1.05)', shadow: 'dark' }}
    >
      <Icon as={IconPrinter} fontSize="2xl" color={colorTo} m="2" />
      <Text bgGradient={`linear(to-l,${colorFrom},${colorTo})`} bgClip="text" align="center">
        {title}
      </Text>
    </Flex>
  );
};

export default BidsList;
