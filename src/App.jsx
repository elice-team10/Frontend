// App.jsx
import { Outlet } from 'react-router-dom';
// import Header from './components/Header';

function App() {
  return (
    <>
      {/* <Header /> */}
      <Outlet />
    </>
  );
}

// App 컴포넌트를 내보냅니다.
export default App;
