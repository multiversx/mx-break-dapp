import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Home } from './pages/Home';
import { Send } from './pages/Send';
import { PageNotFound } from './pages/PageNotFound';

function App() {
  return (
    <div className="w-full">
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.HOME} element={<Home />} />
          <Route path={AppRoutes.SEND} element={<Send />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
