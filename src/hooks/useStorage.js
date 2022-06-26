const useStorage = () => {
  let storage;
  try {
    const x = '__storage_test__';
    window.localStorage.setItem(x, x);
    window.localStorage.removeItem(x);
    // storage.clear()
    storage = true;
  } catch (e) {
    storage = false;
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }

  function storeData(key, data) {
    if (storage) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }
  function getData(key) {
    if (storage) {
      return JSON.parse(localStorage.getItem(key));
    }
    return null;
  }
  return { storeData, getData };
};
export default useStorage;
