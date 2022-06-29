import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  where,
  orderBy,
  limit,
  query,
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

  const submitScore = async (challengeId, name, score) => {
    try {
      const docRef = await addDoc(collection(db, 'leaderboard'), {
        challengeId,
        score,
        name,
      });
      return docRef.id;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error adding document: ', e);
      return false;
    }
  };

  const getLeaderboard = async (challengeId) => {
    const results = [];
    const querySnapshot = await getDocs(
      query(
        collection(db, 'leaderboard'),
        where('challengeId', '==', challengeId),
        orderBy('score'),
        limit(50)
      )
    );
    querySnapshot.forEach((result) => {
      results.push({
        id: result.id,
        ...result.data(),
      });
    });
    return results;
  };

  const getScore = async (scoreId) => {
    const docSnap = await getDoc(doc(db, 'leaderboard', scoreId));
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  };

  const sendLog = (content) => logEvent(analytics, content);

  const validateCords = async (id, cords) => {
    const { cordX, cordY } = cords;

    const docSnap = await getDoc(doc(db, 'cords', id));
    if (docSnap.exists()) {
      const { cordX: objectiveCordX, cordY: objectiveCordY } = docSnap.data();
      if (
        cordX > objectiveCordX - 1.5 &&
        cordX < objectiveCordX + 1.5 &&
        cordY > objectiveCordY - 1.5 &&
        cordY < objectiveCordY + 1.5
      ) {
        return true;
      }
      return false;
    }
    // doc.data() will be undefined in this case
    throw new Error(`Objective with id: ${id}, not found`);
  };

  return {
    validateCords,
    getChallenges,
    sendLog,
    submitScore,
    getLeaderboard,
    getScore,
  };
})();

export default firebase;
