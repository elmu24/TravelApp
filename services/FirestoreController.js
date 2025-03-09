import { collection, addDoc, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

class FirestoreController {
  // Add a new location
  static async addLocation(userId, locationData) {
    try {
      const docRef = await addDoc(collection(db, "locations"), {
        userId,
        ...locationData,
        createdAt: new Date().toISOString()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get locations for a specific user
  static subscribeToUserLocations(userId, callback) {
    const q = query(
      collection(db, "locations"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {
      const locations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(locations);
    });
  }
}

export default FirestoreController;