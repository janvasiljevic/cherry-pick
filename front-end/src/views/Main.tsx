import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Companies } from './Companies';
import { Login } from './Login';

export const Main = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Grid width="100%" height="100%" templateRows="70px auto">
      <Navbar setOpen={setIsOpen} isOpen={isOpen} />
      <Container maxW="container.xl">
        <Outlet />
      </Container>
    </Grid>
  );
};
