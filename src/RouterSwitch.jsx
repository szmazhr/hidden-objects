import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import firebase from './apis/firebase';
import App from './App';
import { ObjectiveContext } from './contexts';
import Challenge from './pages/Challenge';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';

const emptyArray = [];
function RouterSwitch() {
  const [challenges, setChallenges] = useState([]);
  const [activeChallenge, setActiveChallenge] = useState({});

  const enterChallenge = (id) => {
    setActiveChallenge(challenges.find((challenge) => challenge.uid === id));
  };
  const exitChallenge = () => {
    setActiveChallenge({});
  };

  const setFound = (id) => {
    const index = activeChallenge.objectives.findIndex((o) => o.id === id);
    setActiveChallenge((prev) => {
      const newItem = { ...prev.objectives[index], found: true };

      return {
        ...prev,
        objectives: [
          ...prev.objectives
            .slice(0, index) // before the item
            .concat([newItem]) // add the new item
            .concat(prev.objectives.slice(index + 1)), // after the item
        ],
      };
    });
  };

  useEffect(() => {
    firebase
      .getChallenges()
      .then((result) => {
        setChallenges(result);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ObjectiveContext.Provider
              value={activeChallenge ? activeChallenge.objectives : emptyArray}
            >
              <App />
            </ObjectiveContext.Provider>
          }
        >
          <Route index element={<Home challenges={challenges} />} />
          <Route path="challenges" element={<Home challenges={challenges} />} />
          <Route
            path="challenge/:challengeId"
            element={
              <Challenge
                setFound={setFound}
                enterChallenge={enterChallenge}
                exitChallenge={exitChallenge}
                activeChallenge={activeChallenge || {}}
              />
            }
          />
          <Route path="leaderboard" element={<Error404 />} />
          <Route path="leaderboard/:challengeId" element={<Leaderboard />} />
          <Route
            path="leaderboard/:challengeId/:scoreId"
            element={<Leaderboard />}
          />
          <Route path="challenge" element={<Error404 />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default RouterSwitch;
