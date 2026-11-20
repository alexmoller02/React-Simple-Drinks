import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Drinks, DrinkPage } from './Pages';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Drinks />} />
        <Route path="/drinks/:id" element={<DrinkPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
