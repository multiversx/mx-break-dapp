import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Logo } from 'components/Logo';
import { Link } from 'react-router-dom';
import { AppRoutes } from 'routes';

import { Voyager1 } from 'assets/voyager';

export const MissionHold = () => {
  return (
    <div className="mission-hold">
      <Link className="mission-hold-logo" to={AppRoutes.HOME}>
        <Logo />
      </Link>

      <div className="mission-hold-title">Welcome, Explorers!</div>
      <div className="mission-hold-description">
        <span className="mission-hold-description-icon">
          <Voyager1 />
        </span>
        Sovereign Chain is currently on a temporary mission hold. We'll re-establish contact and
        resume our journey soon.
      </div>

      <div className="mission-hold-arrows">
        <FontAwesomeIcon icon={faChevronRight} className="mission-hold-arrow" />
        <FontAwesomeIcon icon={faChevronRight} className="mission-hold-arrow" />
        <FontAwesomeIcon icon={faChevronRight} className="mission-hold-arrow" />
      </div>

      <div className="mission-hold-footer">
        Continue exploring the Web3 MultiversX and stay tuned for new updates!
      </div>
    </div>
  );
};
