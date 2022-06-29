/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import FilterTiltShiftIcon from '@mui/icons-material/FilterTiltShift';
import updateLens from '../utils/updateElementPos';
import { getCursorRelPos } from '../utils/mousePos';
import firebase from '../apis/firebase';
import Notification from '../components/Notification';
import OptionList from '../components/OptionList';
import Result from '../components/Result';

function Challenge({
  enterChallenge,
  exitChallenge,
  activeChallenge,
  setFound,
}) {
  const { challengeId } = useParams();
  const [listActive, setListActive] = useState(false);
  const [cords, setCords] = useState({});
  const [notification, setNotification] = useState({});
  const optionsBox = useRef(null);
  const imgRef = useRef(null);
  const lensRef = useRef(null);
  const intervalRef = useRef(null);
  const { imgUrl, objectives } = activeChallenge;
  const [counter, setCounter] = useState(0);
  const [result, setResult] = useState(false);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((c) => c + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (!!objectives && objectives.filter((o) => !o.found).length === 0) {
      setResult(true);
      clearInterval(intervalRef.current);
    }
  }, [objectives]);

  const toggleOptionList = () => {
    setListActive(!listActive);
  };

  const mouseMoveHandler = () => {
    if (!listActive) {
      updateLens(imgRef.current, lensRef.current);
    }
  };

  function showNotification(message, status = '') {
    setNotification({}); // clear notification
    setNotification({ message, status }); // set notification
  }

  const validateCord = (id) => {
    setListActive(false);
    const index = objectives.findIndex((o) => o.id === id);
    showNotification('Validating...', 'info');
    firebase
      .validateCords(id, cords)
      .then((r) => {
        if (r) {
          setFound(id);
          showNotification(
            `Great! You found ${objectives[index].name}!`,
            'success'
          );
        } else {
          showNotification(`That's not ${objectives[index].name}!`, 'error');
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    mouseMoveHandler(); // update lens position when option list gets closed
    if (listActive) {
      const img = imgRef.current;
      const { x, y } = getCursorRelPos(img);
      setCords({
        cordX: (x * 100) / img.width,
        cordY: (y * 100) / img.height,
      });
    }
  }, [listActive]);

  useEffect(() => {
    enterChallenge(challengeId);
    return () => {
      exitChallenge();
    };
  }, []);

  return (
    <main className="challenge-room">
      <div className={`img-container ${listActive ? 'active' : ''}`}>
        <img
          ref={imgRef}
          src={imgUrl}
          alt="challenge"
          onMouseMove={mouseMoveHandler}
          onClick={() => setListActive(false)}
        />
        <button
          type="button"
          className="img-selection-lens"
          ref={lensRef}
          onMouseMove={mouseMoveHandler}
          onClick={toggleOptionList}
          value=""
        >
          <FilterTiltShiftIcon />
          {listActive && (
            <OptionList
              objectives={objectives}
              optionsBox={optionsBox}
              validateCord={validateCord}
            />
          )}
        </button>
      </div>
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      <Result result={result} counter={counter} challengeId={challengeId} />
    </main>
  );
}
export default Challenge;

/* ------------- Prop Validation ------------- */
Challenge.propTypes = {
  enterChallenge: PropTypes.func.isRequired,
  exitChallenge: PropTypes.func.isRequired,
  setFound: PropTypes.func.isRequired,
  activeChallenge: PropTypes.exact({
    uid: PropTypes.string,
    imgUrl: PropTypes.string,
    name: PropTypes.string,
    objectives: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string,
        name: PropTypes.string,
        imgUrl: PropTypes.string,
        found: PropTypes.bool,
      })
    ),
  }).isRequired,
};
