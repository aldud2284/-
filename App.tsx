import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout.tsx';
import { Home } from './pages/Home.tsx';
import { About } from './pages/About.tsx';
import { Community } from './pages/Community.tsx';
import { Admin } from './pages/Admin.tsx';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/community" element={<Community />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default App;