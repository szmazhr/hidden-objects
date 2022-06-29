import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayArrow from '@mui/icons-material/PlayArrow';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

function ChallengeCard({ challenge }) {
  const { name, uid, imgUrl, objectives } = challenge;
  return (
    <div className="card">
      <div className="card-content">
        <h3>{name}</h3>
        <ul className="objectives">
          {objectives.map((o) => (
            <li key={o.id} title={o.name}>
              <img src={o.imgUrl} alt={o.name} />
            </li>
          ))}
        </ul>
        <img src={imgUrl} className="clg-img" alt="challenge" />
      </div>
      <div className="actions">
        <Link className="btn" to={`/leaderboard/${uid}`}>
          <LeaderboardIcon />
        </Link>
        <Link className="btn" to={`/challenge/${uid}`}>
          <PlayArrow />
        </Link>
      </div>
    </div>
  );
}
export default ChallengeCard;

/* ------------- Prop Validation -------------*/
ChallengeCard.propTypes = {
  challenge: PropTypes.exact({
    uid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    objectives: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        imgUrl: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};
