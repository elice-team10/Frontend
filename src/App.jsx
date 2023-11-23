// App.jsx
import { Outlet } from 'react-router-dom';
import Header from './components/UI/Header';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Outlet />
      </AuthProvider>
    </>
  );
}

// App 컴포넌트를 내보냅니다.
export default App;
