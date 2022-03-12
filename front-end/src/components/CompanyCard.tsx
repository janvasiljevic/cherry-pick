import {
  Box,
  Flex,
  Stack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ICompanySimple } from "../views/Companies";

export const CompanyCard = ({
  devices,
  images,
  name,
  notifications,
  id,
  enabled,
  ...other
}: ICompanySimple) => {
  const bg = useColorModeValue("bg.light", "bg.dark");
  const col = useColorModeValue("accent.light", "accent.dark");
  let navigate = useNavigate();

  return (
    <Box
      {...other}
      flexGrow={1}
      onClick={() => {
        navigate("/company:" + id);
      }}
    >
      <Stack
        borderWidth={1}
        borderRadius={5}
        p={4}
        m={2}
        _hover={{ cursor: "pointer", bgColor: bg }}
        opacity={enabled ? 1 : 0.6}
      >
        <Flex align="center">
          {enabled && <Box h={5} w={5} bgColor={col} borderRadius="full"></Box>}
          <Text fontSize="2xl" fontWeight="bold" opacity={0.8} p={4}>
            {name}
          </Text>
        </Flex>
        <Flex>
          <Stat>
            <StatLabel>Images</StatLabel>
            <StatNumber>{images}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Devices</StatLabel>
            <StatNumber>{devices}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Alerts</StatLabel>
            <StatNumber>{notifications}</StatNumber>
          </Stat>
        </Flex>
      </Stack>
    </Box>
  );
};
