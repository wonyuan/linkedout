import '@mantine/core/styles.css';
import { Home } from '@pages/Home';
import { Dashboard } from '@pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MessagesProvider } from '@context/messageContext';

const App = () => {
  return (
    <MessagesProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </MessagesProvider>
  );
};

export default App;

