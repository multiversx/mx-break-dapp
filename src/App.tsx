import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes';
import { PageNotFound } from './pages/PageNotFound';
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
      <div className="w-full h-screen overflow-auto bg-body-bg bg-[url('/src/assets/hero.png')] bg-top bg-no-repeat md:bg-[url('/src/assets/hero.png')] bg-cover scrollbar-thin">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path={AppRoutes.HOME} element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
