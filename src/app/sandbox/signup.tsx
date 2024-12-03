import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/fire";

export async function createUser(
  email: string,
  password: string,
  displayName: string,
  photoURL: string,
  location: string,
  interests: string[],
) {
  try {
    // Create user with email and password
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Update profile with display name and photo URL
    await updateProfile(user, {
      displayName: displayName,
      photoURL: photoURL,
    });

    // Store additional user data in Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      location: location,
      interests: interests,
    });

    console.log("User created successfully!");
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

// // Example usage:
// createUser(
//   "user@example.com",
//   "P@$$wOrd",
//   "John Doe",
//   "https://example.com/profile-picture.jpg",
//   "New York City",
//   ["music", "travel", "photography"]
// );
