import { collection, addDoc, query, where, onSnapshot, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

// Class to handle the firestore interactions
class FirestoreController {
  // add new location to firestore database
  static async addLocation(userId, locationData) {
    try {
      // add new document to locations collection in firestore
      const docRef = await addDoc(collection(db, "locations"), {
        // Store UserID to connect with user
        userId,
        // Spread provided location data
        ...locationData,
        // Time when location was created
        createdAt: new Date().toISOString()
      });

      // Error Messages
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error adding location:", error);
      return { success: false, error: error.message };
    }
  }

  // realtime updates of user`s locations
  static subscribeToUserLocations(userId, callback, onError) {
    try {
      // Getting locations that match given userID
      const q = query(
        collection(db, "locations"),
        // Filter locations for user
        where("userId", "==", userId)
      );

      // Listen for real-time updates on the queried locations 
      return onSnapshot(q, 
        (snapshot) => {
          // Convert Firestore documents to an array of location objects
          const locations = snapshot.docs.map(doc => ({
            // Add document ID 
            id: doc.id,
            ...doc.data()
          }));
          // Order by rating (highest first)
          locations.sort((a, b) => {
            if (b.rating !== a.rating) {
              return b.rating - a.rating;
            }
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          callback(locations);
        },
        // Error-handling
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

  // Deletes a location from Firestore by its document ID
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