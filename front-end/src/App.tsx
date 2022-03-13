// 1. Import `extendTheme`
import { extendTheme, ChakraProvider, Box, Flex } from '@chakra-ui/react';
import { ColorModeSwitcher } from './components/ColorModeSwitcher';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './views/Login';
import { Main } from './views/Main';
import { NotFound } from './views/NotFound';
import { Companies } from './views/Companies';
import { Company } from './views/Company';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { User } from './views/User';
import { Gallery } from './views/Gallery';
import { GetStarted } from './views/GetStarted';
import BidsList from './views/BidsList';
import AddProblem from './views/AddProblem';
import AllBids from './views/AllBids';

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    accent: {
      dark: '#4C956C',
      light: '#6BB38A',
    },
    badge: {
      dark: '#2E2E2E',
      light: '#F2F2F2',
    },
    text: {
      dark: '#D4D4D4',
      light: '#2B2B2B',
    },
    bg: {
      dark: '#171923',
      light: '#F8F8F6',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Flex height="100vh" alignItems="center" justify="center">
          <Box height={6} bgColor="primary"></Box>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />}>
                {/* Company related views */}
                <Route path="add" element={<AddProblem />} />
                <Route path="bids" element={<AllBids />} />
                <Route path="user:id" element={<User />} />
                <Route index element={<BidsList />} />
              </Route>
              <Route path="register" element={<GetStarted />} />
              <Route path="login" element={<Login></Login>} />
              <Route path="*" element={<NotFound />}></Route>s
            </Routes>
          </BrowserRouter>
        </Flex>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
