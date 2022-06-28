import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { ObjectiveContext } from './contexts';
import Challenge from './pages/Challenge';
import Error404 from './pages/Error404';
import Home from './pages/Home';

function RouterSwitch() {
  const [objectives, setObjectives] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ObjectiveContext.Provider value={objectives}>
              <App objectives={objectives} />
            </ObjectiveContext.Provider>
          }
        >
          <Route index element={<Home />} />
          <Route path="challenges" element={<Home />} />
          <Route
            path="challenge/:challengeId"
            element={
              <Challenge
                objectives={objectives}
                setObjectives={setObjectives}
              />
            }
          />
          <Route path="challenge" element={<Error404 />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default RouterSwitch;
