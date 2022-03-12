import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Divider,
  Flex,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { PicStack } from "../components/PicStack";

export const Gallery = () => {
  return (
    <Container maxW="container.xl">
      <Accordion>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Zipline 01
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Flex
              w="full"
              h="full"
              flexWrap="nowrap"
              justify="start"
              overflowX="auto"
            >
              {Array(26)
                .fill(0)
                .map((j, i) => {
                  const u = `https://picsum.photos/id/${i}/200/300`;
                  return (
                    <Image
                      m={1}
                      marginRight="-12%"
                      transitionDelay="0.4s"
                      transition="ease-in .4s"
                      shadow="2xl"
                      cursor="pointer"
                      // _hover={{
                      //   // transform: "scale(1.1)",
                      //   shadow: "lg",
                      //   // marginRight: "1%",
                      // }}
                      // _hover={{ margin: "0" }}
                      objectFit="cover"
                      src={u}
                    />
                  );
                })}
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Zipline 02
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Flex
              w="full"
              h="full"
              flexWrap="nowrap"
              justify="start"
              overflowX="auto"
              p={4}
              css={{
                "&::-webkit-scrollbar": {
                  width: "3px",
                  height: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  width: "4px",
                  height: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#4C956C",
                  borderRadius: "5px",
                },
              }}
            >
              {Array(26)
                .fill(0)
                .map((j, i) => {
                  const u = `https://picsum.photos/id/${i + 100}/200/300`;
                  return (
                    <Image
                      m={1}
                      marginRight="-3%"
                      transitionDelay="0.4s"
                      transition="ease-in .4s"
                      shadow="2xl"
                      cursor="pointer"
                      _hover={{
                        // transform: "scale(1.1)",
                        shadow: "lg",
                        // marginRight: "1%",
                      }}
                      // _hover={{ margin: "0" }}
                      objectFit="cover"
                      src={u}
                    />
                  );
                })}
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Flex justify="space-around">
        <PicStack />
        <PicStack />
      </Flex>
    </Container>
  );
};

// export const Flicker = () => {
//   const [col, setCol] = useState("white");
//   setInterval(() => {
//     setCol(col == "white" ? "black" : "white");
//   }, 1000 / 8.8);
//   return <Box w="100vw" h="100vh" bgColor={col}></Box>;
// };
