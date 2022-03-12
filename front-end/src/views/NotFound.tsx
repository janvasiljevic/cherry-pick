import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  let navigate = useNavigate();
  return (
    <Flex direction="column">
      <Box>
        <Text fontSize="8xl" fontWeight="bold" p={2}>
          404
        </Text>
        <Text fontSize="8xl" fontWeight="bold" opacity={0.5} p={2}>
          Nothing here
        </Text>
      </Box>
      <Box p={2}>
        <Button
          variant="outline"
          onClick={() => {
            navigate("/");
          }}
        >
          Just... go back
        </Button>
      </Box>
    </Flex>
  );
};
