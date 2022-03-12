import {
  Box,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  SkeletonCircle,
  SkeletonText,
  Spinner,
  Stack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Switch,
  Tab,
  Table,
  TableCaption,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useSWR from "swr";
import { fetchCompany, ICompany } from "../services/CompanyApi";
import { AlertSwitch } from "../components/AlertSwitch";

export const Company = () => {
  let urlParams = useParams();
  const [enabled, setEnabled] = useState("true");
  const { data, error } = useSWR<ICompany, any>(
    `/api/company/${urlParams}`,
    fetchCompany
  );

  if (!data) {
    return (
      <Container py={6} w="full" maxW="container.xl">
        <Box p={4} w="full">
          <SkeletonText noOfLines={3} spacing="4" />
          <SkeletonCircle size="10" m={4} />
          <SkeletonText noOfLines={3} spacing="4" />
        </Box>
        <Box p={4} w="full">
          <SkeletonText noOfLines={6} spacing="4" />
        </Box>
      </Container>
    );
  } else {
    return (
      <Container py={6} w="full" maxW="container.xl">
        {/* Heading*/}
        <Box p={4}>
          <Editable
            defaultValue={data.name}
            fontSize="4xl"
            onBlur={(e) => {
              // console.log(e.target?.value);
            }}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>

          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="enable" mb="0">
              Enabled
            </FormLabel>
            <Switch
              id="enable"
              value={enabled}
              onChange={(e) => {
                setEnabled(e.target.value);
              }}
            />
          </FormControl>
        </Box>

        {/* Metrics */}
        <Stack direction="row" spacing={8} my={6}>
          <Stat
            textAlign="center"
            border="1px"
            borderRadius="md"
            p={2}
            borderColor="GrayText"
            bgColor="whiteAlpha.50"
          >
            <StatLabel>Sent</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>

          <Stat
            textAlign="center"
            border="1px"
            borderRadius="md"
            p={2}
            borderColor="GrayText"
            bgColor="whiteAlpha.50"
          >
            <StatLabel>Clicked</StatLabel>
            <StatNumber>45</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05%
            </StatHelpText>
          </Stat>

          <Stat
            textAlign="center"
            border="1px"
            borderRadius="md"
            p={2}
            borderColor="GrayText"
            bgColor="whiteAlpha.50"
          >
            <StatLabel>Sent</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>

          <Stat
            textAlign="center"
            border="1px"
            borderRadius="md"
            p={2}
            borderColor="GrayText"
            bgColor="whiteAlpha.50"
          >
            <StatLabel>Clicked</StatLabel>
            <StatNumber>45</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05%
            </StatHelpText>
          </Stat>
        </Stack>

        {/* Tabbed view */}
        <Tabs>
          <TabList>
            <Tab>Payments</Tab>
            <Tab>Users</Tab>
            <Tab>Devices</Tab>
            <Tab>Stats</Tab>
          </TabList>

          <TabPanels>
            {/* payments */}
            <TabPanel>
              <Table variant="striped" size="md">
                <TableCaption opacity={0.7}>
                  Last update: 2 minutes ago
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Date</Th>
                    <Th>Season</Th>
                    <Th isNumeric>Amount</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{new Date().toDateString()}</Td>
                    <Td>{new Date("2021-08-05").toDateString()}</Td>
                    <Td isNumeric>500€</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TabPanel>
            <TabPanel>
              <Table variant="striped" size="md">
                <TableCaption opacity={0.7}>
                  Last update: 2 minutes ago
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th isNumeric>ID</Th>
                    <Th>Username</Th>
                    <Th>Enabled</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td isNumeric>0</Td>
                    <Td>Žan Krasniqui</Td>
                    <Td>
                      <AlertSwitch />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
            <TabPanel>
              <p>stats!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    );
  }
};
