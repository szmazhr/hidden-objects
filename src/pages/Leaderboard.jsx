import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import firebase from '../apis/firebase';
import GoHome from '../components/GoHome';

function Leaderboard() {
  const [status, setStatus] = useState({});
  const { challengeId, scoreId } = useParams();
  const [leaderboard, setLeaderboard] = useState();
  const [userIncluded, setUserIncluded] = useState(false);
  const highlightRef = useRef(null);

  useEffect(() => {
    setStatus({
      type: 'loading',
      message: 'Loading scores...',
    });
    firebase.getLeaderboard(challengeId).then(async (r) => {
      if (r) {
        setStatus({
          type: 'success',
          message: 'Scores loaded successfully',
        });
        if (scoreId) {
          setUserIncluded(!!r.find((s) => s.id === scoreId));
        }
        const el = r.map((s, i) => (
          <tr
            key={s.id}
            className="row"
            ref={!!scoreId && scoreId === s.id ? highlightRef : null}
          >
            <td>{i + 1}</td>
            <td>{s.name}</td>
            <td>{s.score}</td>
          </tr>
        ));
        setLeaderboard(el);
        setStatus({});
      }
    });
  }, [challengeId]);

  useEffect(() => {
    if (!userIncluded && scoreId && leaderboard) {
      firebase.getScore(scoreId).then((r) => {
        if (r) {
          setLeaderboard(
            leaderboard.concat(
              <tr key={r.id} className="row" ref={highlightRef}>
                <td>UnRanked</td>
                <td>{r.name}</td>
                <td>{r.score}</td>
              </tr>
            )
          );
        }
      });
      setUserIncluded(true);
    }
  }, [leaderboard]);

  useEffect(() => {
    setTimeout(() => {
      if (highlightRef.current) {
        highlightRef.current.scrollIntoView({ behavior: 'smooth' });
        highlightRef.current.classList.add('highlight');
        setTimeout(() => {
          highlightRef.current.classList.remove('highlight');
        }, 2000);
      }
    }, 1000); // wait for leaderboard to load
  }, [highlightRef.current]);

  return (
    <main className="leaderboard">
      <table>
        <caption>
          Data of the scores for the challenge id: {challengeId}
        </caption>
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Name</th>
            <th scope="col">
              Score <sub>(in seconds)</sub>
            </th>
          </tr>
        </thead>
        <tbody>
          {JSON.stringify(status) === '{}' ? (
            leaderboard
          ) : (
            <tr>
              <td className={status.type}>{status.message}</td>
            </tr>
          )}
        </tbody>
      </table>
      <GoHome />
    </main>
  );
}
export default Leaderboard;
