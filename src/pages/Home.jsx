import PropTypes from 'prop-types';
import LoopIcon from '@mui/icons-material/Loop';
import ChallengeCard from '../layouts/ChallengeCard';

function Home({ challenges }) {
  return (
    <div className="cards">
      {challenges.length ? (
        challenges.map((challenge) => (
          <ChallengeCard key={challenge.uid} challenge={challenge} />
        ))
      ) : (
        <LoopIcon className="refresh" />
      )}
    </div>
  );
}
export default Home;

/* ------------- Prop Validation -------------*/
Home.propTypes = {
  challenges: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
