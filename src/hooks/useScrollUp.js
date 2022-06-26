import { useEffect, useState } from 'react';

function useScrollUp(init = false) {
  const [isScrollingUp, setIsScrollingUp] = useState(init);
  const [wheel, setWheel] = useState(0);

  function handleScroll(event) {
    setWheel(event.deltaY);
  }

  useEffect(() => {
    if (wheel > 15 && isScrollingUp && window.scrollY > 30) {
      setIsScrollingUp(false);
    }
    if (wheel < -25 && !isScrollingUp) {
      setIsScrollingUp(true);
    }
  }, [wheel]);

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return [isScrollingUp, setIsScrollingUp];
}
export default useScrollUp;
