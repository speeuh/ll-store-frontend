import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';

export default function AppRouter() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path='/' element={<Header />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Router>
      <Footer />
    </main>
  );
}
