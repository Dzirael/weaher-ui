import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ConfirmPage from './pages/ConfirmPage';
import UnsubscribePage from './pages/UnsubscribePage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/confirm" element={<ConfirmPage />} />
          <Route path="/unsubscribe" element={<UnsubscribePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;