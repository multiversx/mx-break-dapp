import { Link } from 'react-router-dom';
import { AppRoutes } from '../../routes';
import { Logo } from '../Logo.tsx';

export const Header = () => {
  return (
    <header className="flex flex-row align-center justify-between p-6 border-gray-200 bg-black dark:bg-black dark:border-gray-700">
      <Link className="flex items-center justify-between" to={AppRoutes.HOME}>
        <Logo />
      </Link>

      <nav className="h-full w-full text-sm sm:relative sm:left-auto sm:top-auto sm:flex sm:w-auto sm:flex-row sm:justify-end sm:bg-transparent">
        <div className="flex justify-end container mx-auto items-center gap-2">
          <Link
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
            to={AppRoutes.HOME}
          >
            Home
          </Link>
          <Link
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
            to={AppRoutes.SEND}
          >
            Send
          </Link>
        </div>
      </nav>
    </header>
  );
};
