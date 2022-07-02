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
import MainPageAdmin from 'pages/admin/MainPageAdmin';
import ProductList from 'pages/admin/Product/List';
import ProductForm from 'pages/admin/Product/Form';
import SectionForm from 'pages/admin/Section/Form';
import SectionList from 'pages/admin/Section/List';
import BrandList from 'pages/admin/Brand/List';
import BrandForm from 'pages/admin/Brand/Form';

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
              <Route index element={<Home />} />
              <Route path='products' element={<Login />}></Route>
              <Route path='aboutus' element={<Login />}></Route>
              <Route path='login' element={<Login />}></Route>
            </Route>

            <Route path='/admin' element={<MainPageAdmin />}>
              <Route path='products/list' element={<ProductList />} />
              <Route path='products/new' element={<ProductForm />} />
              <Route path='products/:id' element={<ProductForm />} />

              <Route path='sections/list' element={<SectionList />} />
              <Route path='sections/new' element={<SectionForm />} />
              <Route path='sections/:id' element={<SectionForm />} />

              <Route path='brands/list' element={<BrandList />} />
              <Route path='brands/new' element={<BrandForm />} />
              <Route path='brands/:id' element={<BrandForm />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
      <Footer />
    </main>
  );
}
