import { Box, Image } from "@chakra-ui/react";

export const PicStack = () => {
  return (
    <Box>
      <Box position="relative" p={2} bgColor="red">
        {Array(3)
          .fill(1)
          .map((j, i) => {
            return (
              <Image
                src="https://picsum.photos/200/300"
                position="fixed"
                marginLeft={`${i * 40}px`}
                marginTop={`${i * 40}px`}
                shadow="lg"
              />
            );
          })}
      </Box>
    </Box>
  );
};
