import {
  Avatar,
  Button,
  Flex,
  GridItem,
  Heading,
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
import { useNavigate } from 'react-router-dom';
import { IUser } from '../app/slices/userSlice';
import { RootState } from '../app/store';
import { ColorModeSwitcher } from './ColorModeSwitcher';

interface INavbarProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}

export const Navbar = ({ setOpen, isOpen }: INavbarProps) => {
  const navigate = useNavigate();

  const { user }: { user: IUser } = useSelector((state) => state);

  const bg = useColorModeValue('bg.light', 'bg.dark');
  const loadQueue = useSelector((state: RootState) => state.loader);

  return (
    <GridItem bgColor={bg} w="full">
      <Flex alignItems="center">
        <Heading
          pl="8"
          size="md"
          onClick={() => {
            navigate('/');
          }}
          _hover={{
            cursor: 'pointer',
          }}
        >
          Logo
        </Heading>

        <Flex grow={1}> </Flex>
        <ColorModeSwitcher p={4} m={3}></ColorModeSwitcher>

        <Menu>
          <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0} ml={1} mr={8}>
            <Avatar size="sm" name={user.email} />
          </MenuButton>
          <MenuList>
            <MenuItem>Profile ({user.email})</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => navigate('/login')}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Progress size="xs" isIndeterminate colorScheme="green" opacity={loadQueue.value > 0 ? 1 : 0} />
    </GridItem>
  );
};
