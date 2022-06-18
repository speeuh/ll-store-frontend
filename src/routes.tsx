import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Login from 'pages/Login';

export default function AppRouter() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path='/' element={<Header />}>
              <Route index element={<Home />} />
              <Route path='/login' element={<Login />}></Route>
          </Route>
        </Routes>
      </Router>
      <Footer />
    </main>
  );
}
