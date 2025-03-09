import { collection, addDoc, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

class FirestoreController {
  static async addLocation(userId, locationData) {
    try {
      const docRef = await addDoc(collection(db, "locations"), {
        userId,
        ...locationData,
        createdAt: new Date().toISOString()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error adding location:", error);
      return { success: false, error: error.message };
    }
  }

  static subscribeToUserLocations(userId, callback, onError) {
    try {
      const q = query(
        collection(db, "locations"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );

      return onSnapshot(q, 
        (snapshot) => {
          const locations = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          callback(locations);
        },
        (error) => {
          console.error("Locations subscription error:", error);
          if (onError) onError(error);
          callback([]);
        }
      );
    } catch (error) {
      console.error("Error setting up subscription:", error);
      if (onError) onError(error);
      return () => {};
    }
  }
}

export default FirestoreController;