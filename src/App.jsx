// App.jsx
import { Outlet } from 'react-router-dom';
import Header from './components/UI/Header';
import { AuthProvider } from './context/AuthProvider';
import { SearchProvider } from './context/SearchProvider';

function App() {
  return (
    <>
      <AuthProvider>
        <SearchProvider>
          <Header />
          <Outlet />
        </SearchProvider>
      </AuthProvider>
    </>
  );
}

// App 컴포넌트를 내보냅니다.
export default App;
