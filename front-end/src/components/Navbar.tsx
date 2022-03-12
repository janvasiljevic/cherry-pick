import {
  Box,
  Flex,
  GridItem,
  IconButton,
  Progress,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { NotificationBadge } from "./Notification";
import { UserTag } from "./Usertag";

interface INavbarProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}

export const Navbar = ({ setOpen, isOpen }: INavbarProps) => {
  const bg = useColorModeValue("bg.light", "bg.dark");
  const loadQueue = useSelector((state: RootState) => state.loader);

  return (
    <GridItem bgColor={bg} colSpan={2} colStart={{ base: 1, md: 2 }}>
      <Flex alignItems="center" justifyContent={{ base: "start", md: "end" }}>
        <Box marginRight="auto" display={{ base: "block", md: "none" }} p={4}>
          <IconButton
            variant="outline"
            onClick={() => {
              setOpen(!isOpen);
            }}
            aria-label="open menu"
            icon={<FiMenu />}
          />
        </Box>
        <UserTag />
        <NotificationBadge notifs={2} />
        <ColorModeSwitcher p={4} m={3}></ColorModeSwitcher>
      </Flex>
      <Progress
        size="xs"
        isIndeterminate
        colorScheme="green"
        opacity={loadQueue.value > 0 ? 1 : 0}
      />
    </GridItem>
  );
};
