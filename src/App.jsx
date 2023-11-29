// App.jsx
import { Outlet } from 'react-router-dom';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import { AuthProvider } from './context/AuthProvider';
import { SearchProvider } from './context/SearchProvider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

<<<<<<< HEAD
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff6700',
    },
  },
});
=======
const Appcontainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const queryClient = new QueryClient();
>>>>>>> 35542623235ccc84b95a111090924e0e0b8fb9f6

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <SearchProvider>
            <Header />
            <Outlet />
          </SearchProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
