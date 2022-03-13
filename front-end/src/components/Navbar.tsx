import {
  Avatar,
  Button,
  Flex,
  GridItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Progress,
  useColorModeValue,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { ColorModeSwitcher } from './ColorModeSwitcher';

interface INavbarProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}

export const Navbar = ({ setOpen, isOpen }: INavbarProps) => {
  const bg = useColorModeValue('bg.light', 'bg.dark');
  const loadQueue = useSelector((state: RootState) => state.loader);

  return (
    <GridItem bgColor={bg} w="full">
      <Flex alignItems="center" justifyContent={{ base: 'start', md: 'end' }}>
        <ColorModeSwitcher p={4} m={3}></ColorModeSwitcher>

        <Menu>
          <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0} ml={1} mr={8}>
            <Avatar size="sm" name="Segun Adebayo" />
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuDivider />
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Progress size="xs" isIndeterminate colorScheme="green" opacity={loadQueue.value > 0 ? 1 : 0} />
    </GridItem>
  );
};
