import { collection, addDoc, query, where, onSnapshot, orderBy, deleteDoc, doc } from 'firebase/firestore';
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
      //orderBy
      const q = query(
        collection(db, "locations"),
        where("userId", "==", userId)
      );

      return onSnapshot(q, 
        (snapshot) => {
          const locations = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          // 在 JavaScript 端排序
          locations.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
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

  static async deleteLocation(locationId) {
    try {
      await deleteDoc(doc(db, "locations", locationId));
      return { success: true };
    } catch (error) {
      console.error("Error deleting location:", error);
      return { success: false, error: error.message };
    }
  }
}

export default FirestoreController;