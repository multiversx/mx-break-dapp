import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Home } from './pages/Home';
import { Send } from './pages/Send';
import { PageNotFound } from './pages/PageNotFound';
import { useBalanceUpdate } from './hooks/useBalanceUpdate';
import { Header } from './components/Header';

function App() {
  useBalanceUpdate();

  return (
    <div className="w-full">
      <BrowserRouter>
        <Header />
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
