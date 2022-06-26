import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Error404 from './pages/Error404';
import Home from './pages/Home';

function RouterSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="challenges" element={<Home />}>
            <Route path=":challengeId" element={<Error404 />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default RouterSwitch;
