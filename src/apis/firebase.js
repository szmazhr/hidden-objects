import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';

const firebase = (() => {
  const config = {
    apiKey: 'AIzaSyAiHlLh5VbWiHRHPWFDuPLtzVQ2-0vPgnQ',
    authDomain: 'whereiswaldo-83864.firebaseapp.com',
    projectId: 'whereiswaldo-83864',
    storageBucket: 'whereiswaldo-83864.appspot.com',
    messagingSenderId: '150463449883',
    appId: '1:150463449883:web:15c6f94fdc7d65a33d21be',
    measurementId: 'G-WE9J8W1XST',
  };

  // Initialize Firebase
  const app = initializeApp(config);
  const analytics = getAnalytics(app);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  async function getChallenges() {
    const results = [];
    const querySnapshot = await getDocs(collection(db, 'challenges'));
    querySnapshot.forEach((result) => {
      results.push({
        uid: result.id,
        ...result.data(),
      });
    });
    return results;
  }

  const sendLog = (content) => logEvent(analytics, content);

  const validateCords = async (id, cords) => {
    const { cordX, cordY } = cords;

    const docRef = doc(db, 'cords', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { cordX: objectiveCordX, cordY: objectiveCordY } = docSnap.data();
      if (
        cordX > objectiveCordX - 1.5 &&
        cordX < objectiveCordX + 1.5 &&
        cordY > objectiveCordY - 1.5 &&
        cordY < objectiveCordY + 1.5
      ) {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    }
    // doc.data() will be undefined in this case
    throw new Error(`Objective with id: ${id}, not found`);
  };
  return { validateCords, getChallenges, sendLog };
})();

export default firebase;
