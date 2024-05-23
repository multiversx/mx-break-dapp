import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Header } from './components/Header';
import { Home } from 'pages/Home/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="w-full h-screen overflow-auto bg-body-bg scrollbar-thin">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path={AppRoutes.HOME} element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
