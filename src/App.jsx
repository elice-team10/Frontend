// App.jsx
import { Outlet } from 'react-router-dom';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import { AuthProvider } from './context/AuthProvider';
import { SearchProvider } from './context/SearchProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';

const Appcontainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SearchProvider>
          <Appcontainer>
            <Header />
            <Outlet />
            <Footer />
          </Appcontainer>
        </SearchProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
