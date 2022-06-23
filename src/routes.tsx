import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Home from 'pages/Home';
import Login from 'pages/Login';
import { AuthProvider, AuthContext } from 'contexts/auth';

export default function AppRouter() {
  const Private = ({ children }: any) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div className='loading'>Loading...</div>;
    }
    
    if (!authenticated) {
      return <Navigate to='/login' />;
    }

    return children;
  };

  return (
    <main>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Header />}>
              <Route
                index
                element={
                  <Private>
                    <Home />
                  </Private>
                }
              />
              <Route path='products' element={<Login />}></Route>
              <Route path='aboutus' element={<Login />}></Route>
              <Route path='login' element={<Login />}></Route>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
      <Footer />
    </main>
  );
}
