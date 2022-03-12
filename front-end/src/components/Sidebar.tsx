import {
  Box,
  GridItem,
  useColorModeValue,
  Text,
  Stack,
  FlexProps,
  Link,
  Flex,
  Icon,
  IconButton,
  Fade,
} from "@chakra-ui/react";
import { Dispatch, ReactText, SetStateAction, useState } from "react";
import { IconType } from "react-icons";
import { FiHome, FiTrendingUp, FiLogOut, FiImage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, href: "/" },
  { name: "Companies", icon: FiTrendingUp, href: "/companies" },
  { name: "Start", icon: FiImage, href: "/start" },
  { name: "Logout", icon: FiLogOut, href: "/login" },
];

// Navigation items
interface NavItemProps extends FlexProps {
  icon: IconType;
  name: string;
}
const NavItem = ({ icon, name, ...other }: NavItemProps) => {
  const highlite = useColorModeValue("accent.light", "accent.dark");

  return (
    <Flex
      align="center"
      borderRadius="5px"
      cursor="pointer"
      p={3}
      _hover={{
        bg: highlite,
        color: "white",
      }}
      {...other}
    >
      {icon && (
        <Icon
          mr="2"
          fontSize="16"
          _groupHover={{
            color: "white",
          }}
          as={icon}
        />
      )}
      {name}
    </Flex>
  );
};

// Sidebard
interface ISidebarProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}
export const Sidebar = ({ isOpen, setOpen }: ISidebarProps) => {
  const bg = useColorModeValue("bg.light", "bg.dark");
  let navigate = useNavigate();

  const linkClick = (href: string) => {
    navigate(href);
    setOpen(false);
  };

  return (
    <>
      <GridItem
        bg={bg}
        rowStart={1}
        rowSpan={3}
        borderRightWidth="1px"
        display={{ base: "none", md: "block" }}
        overflowY="auto"
      >
        <Logo />
        <Stack direction="column" p={2}>
          {LinkItems.map((it) => {
            return (
              <NavItem
                icon={it.icon}
                key={it.name}
                name={it.name}
                onClick={() => {
                  linkClick(it.href);
                }}
              />
            );
          })}
        </Stack>
      </GridItem>

      {/* mobile */}
      <GridItem
        zIndex={1}
        display={{ base: isOpen ? "block" : "none", md: "none" }}
        position="fixed"
        marginTop="70px"
      >
        <Fade in={isOpen}>
          <Box bg={bg} w="100vw">
            <Stack direction="column" spacing={4} p={4}>
              {LinkItems.map((it) => {
                return (
                  <NavItem
                    icon={it.icon}
                    key={it.name}
                    name={it.name}
                    onClick={() => {
                      linkClick(it.href);
                    }}
                  />
                );
              })}
            </Stack>
          </Box>
        </Fade>
      </GridItem>
    </>
  );
};
