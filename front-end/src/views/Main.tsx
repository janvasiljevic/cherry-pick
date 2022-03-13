import { Button, Container, Grid, useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { setUser } from '../app/slices/userSlice';
import { Navbar } from '../components/Navbar';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

export const Main = () => {
  const [isOpen, setIsOpen] = useState(false);

  const modal = useDisclosure();

  const toast = useToast();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);

  const connectMetamask = async () => {
    if (typeof (window as any).ethereum !== 'undefined') {
      console.log('MetaMask is installed!');

      const accounts = await (ethereum as any).request({ method: 'eth_requestAccounts' });

      const account = accounts[0];

      axios
        .patch(`api/user/add-wallet-address/${account}`)
        .then(() => {
          toast({
            status: 'success',
            description: 'Wallet address succesfully added',
          });
        })
        .finally(() => {
          modal.onClose();
        });
    }
  };

  useEffect(() => {
    axios
      .get('api/auth/profile')
      .then(({ data }) => {
        if (data.userType === 'ASSISTANT') {
          if (data?.assistant?.wallet === null) modal.onOpen();
        }

        dispatch(setUser(data));
      })
      .catch(() => {
        navigate('login');
      });
  }, []);

  return (
    <Grid width="100%" height="100%" templateRows="70px auto">
      <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect your wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>You must connect your Metamsak wallet</ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={connectMetamask}>
              Connect
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Navbar setOpen={setIsOpen} isOpen={isOpen} />
      <Container maxW="container.xl">
        <Outlet />
      </Container>
    </Grid>
  );
};
