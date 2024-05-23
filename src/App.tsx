import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Header } from './components/Header';
import { Home } from 'pages/Home/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex min-h-[100dvh] flex-col bg-black scrollbar-thin">
          <Header />
          <div className="flex min-h-[90dvh] flex-1 flex-col sm:min-h-fit">
            <Routes>
              <Route path={AppRoutes.HOME} element={<Home />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
