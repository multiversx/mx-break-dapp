import { Logo } from '../Logo.tsx';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-md">
      <nav className="container-page flex items-center gap-1 py-3 sm:gap-x-6 sm:py-4 mx-6 sm:mx-2">
        <Link className="flex items-center justify-between" to={AppRoutes.HOME}>
          <Logo />
        </Link>
        <div className="ml-auto flex items-center mx-2">
          <a
            href="https://multiversx.com/sovereign-chains"
            className="text-teal hover:enabled:bg-neutral-750 font-family-medium max-w-[30rem] mr-2"
          >
            multiversx.com/sovereign-chains
          </a>
          <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 text-teal" />
        </div>
      </nav>
    </header>
  );
};
