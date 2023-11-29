// App.jsx
import { Outlet } from 'react-router-dom';
import Header from './components/UI/Header';
import { AuthProvider } from './context/AuthProvider';
import { SearchProvider } from './context/SearchProvider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff6700',
    },
  },
});

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

// App 컴포넌트를 내보냅니다.
export default App;
