import { Logo } from '../Logo';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const Header = () => {
  return (
    <header className="---sticky top-0 z-10 p-4 md:p-14">
      <nav className="flex items-center justify-between gap-2 sm:gap-x-6">
        <Link className="flex items-center" to={AppRoutes.HOME}>
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          <a
            target="_blank"
            href="https://multiversx.com/sovereign-chains"
            className="text-teal hover:enabled:bg-neutral-750 font-family-medium text-right leading-4"
          >
            sovereign chains
          </a>
          <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 text-teal" />
        </div>
      </nav>
    </header>
  );
};
