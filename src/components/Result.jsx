import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from '../apis/firebase';

function Result({ counter, result, challengeId }) {
  const [value, setValue] = useState('');
  const [loadingEl, setLoadingEl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingEl(<RestartAltIcon className="rotate" />);
    const name = value || 'Anonymous';
    firebase.submitScore(challengeId, name, counter).then((r) => {
      if (r) {
        setLoadingEl(<CheckIcon />);
        navigate(`/leaderboard/${challengeId}/${r}`);
      } else {
        setLoadingEl(<CloseIcon />);
        alert('Error submitting score');
      }
    });
  };

  return result ? (
    <div className="result-container">
      <div className="result">
        <div className="result-header">Great!</div>
        <div className="result-body">
          You completed the challenge in
          <span>
            {counter >= 60 ? ` ${Math.floor(counter / 60)}minutes and` : ' '}
            {counter % 60} seconds!
          </span>
        </div>
        <form className="result-form" onSubmit={handleSubmit}>
          {loadingEl || (
            <>
              <div id="name">
                <input
                  type="text"
                  name="name"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Name"
                />
                <button type="submit">Submit</button>
              </div>
              <span>Wanna submit your name for the leaderboard?</span>{' '}
            </>
          )}
        </form>
        <div className="result-footer">
          <Link to="/">
            <ArrowBack fontSize="small" /> Home
          </Link>
          <Link to={`/leaderboard/${challengeId}`}>
            Leaderboard <ArrowForward fontSize="small" />
          </Link>
        </div>
      </div>
    </div>
  ) : (
    ''
  );
}
export default Result;
Result.propTypes = {
  counter: PropTypes.number.isRequired,
  result: PropTypes.bool.isRequired,
  challengeId: PropTypes.string.isRequired,
};
