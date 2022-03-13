import { Container, Grid } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { setUser } from '../app/slices/userSlice';
import { Navbar } from '../components/Navbar';

export const Main = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('api/auth/profile')
      .then(({ data }) => {
        dispatch(setUser(data));
      })
      .catch(() => {
        navigate('login');
      });
  });

  return (
    <Grid width="100%" height="100%" templateRows="70px auto">
      <Navbar setOpen={setIsOpen} isOpen={isOpen} />
      <Container maxW="container.xl">
        <Outlet />
      </Container>
    </Grid>
  );
};
