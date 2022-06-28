// import PropTypes from 'prop-types';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { ObjectiveContext } from '../contexts';
import useScrollUp from '../hooks/useScrollUp';
import useTheme from '../hooks/useTheme';

function Header() {
  const [scrollUp, setScrollUp] = useScrollUp(true);
  const [mode, toggleMode] = useTheme();
  const icon = mode === 'light' ? <LightMode /> : <DarkMode />;
  const [hover, setHover] = useState();
  const objectives = useContext(ObjectiveContext) || [];

  const listEl = objectives.map((o) => (
    <li key={o.id} className={o.found ? 'found' : ''}>
      <img
        src={o.imgUrl}
        alt={o.name}
        onMouseEnter={() => setHover(o.id)}
        onMouseLeave={() => setHover('')}
      />
      {hover === o.id && <span>{o.name}</span>}
    </li>
  ));

  return (
    <header
      className={`main-header ${scrollUp ? 'expend' : 'collapse'}`}
      onMouseOver={() => setScrollUp(true)}
      onFocus={() => setScrollUp(true)}
    >
      <h1>Hidden Objects</h1>
      <ul className="objectives">{listEl}</ul>
      <button className="theme-btn" type="button" onClick={toggleMode}>
        {icon}
      </button>
    </header>
  );
}
export default Header;
