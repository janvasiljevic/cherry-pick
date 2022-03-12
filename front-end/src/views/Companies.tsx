import {
  Box,
  Container,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { CompanyCard } from "../components/CompanyCard";
import { fetchCompanies, ICompanySimple } from "../services/CompaniesApi";

export const Companies = () => {
  let { data, error } = useSWR<ICompanySimple[], any>(
    "/api/companies",
    fetchCompanies
  );

  return (
    <Container py={6} w="full" maxW="container.xl" h="full">
      <Text fontSize="4xl" m={4}>
        Company List
      </Text>
      <Flex w="full" flexWrap="wrap" justify={{ base: "center", md: "start" }}>
        {data &&
          data.map((comp, i) => {
            return (
              <CompanyCard
                id={i}
                enabled={comp.enabled}
                devices={comp.devices}
                images={comp.images}
                name={comp.name}
                notifications={comp.notifications}
                key={i} // TOOOO DOOOOO THIS IS BAD, SHOULD BE UNIQUE ID
              />
            );
          })}
        {!data && (
          <>
            {Array(6)
              .fill(0)
              .map((i) => {
                return (
                  <Box padding="6" boxShadow="lg" w="33%">
                    <SkeletonText noOfLines={6} spacing="4" />
                  </Box>
                );
              })}
          </>
        )}
      </Flex>
    </Container>
  );
};
