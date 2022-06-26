import { useEffect, useState } from 'react';
import useStorage from './useStorage';

const { storeData, getData } = useStorage();
const body = document.querySelector('body');
const root = document.querySelector(':root');

/*
*---- Don't forget to add the following to your stylesheet ----*

.smooth-theme-transition *{
  transition: background-color 0.3s ease-out, color 0.3s ease-out !important;
}


*/

// Get initial state from localStorage or system theme
function getInitialState() {
  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches // window
    ? 'dark'
    : 'light';
  if (getData('xTheme')) {
    theme = getData('xTheme');
  }
  return theme;
}

function useTheme() {
  const [mode, setMode] = useState(getInitialState());

  // toggle theme on call
  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  // store theme in localStorage
  useEffect(() => {
    storeData('xTheme', mode);
  }, [mode]);

  useEffect(() => {
    // Add class for smooth transition
    body.classList.add('smooth-theme-transition');

    // Add attribute for theme
    root.setAttribute('color-scheme', `${mode}`);

    // remove transition class after transition has finished
    setTimeout(() => {
      body.classList.remove('smooth-theme-transition');
    }, 300);
  }, [mode]);

  return [mode, toggleMode];
}
export default useTheme;
