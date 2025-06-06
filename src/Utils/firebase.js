// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl1iqezXUK9kKf8fAmzlRg-NQnMmFp9K8",
  authDomain: "studymate-e9825.firebaseapp.com",
  projectId: "studymate-e9825",
  storageBucket: "studymate-e9825.appspot.com",
  messagingSenderId: "348727818592",
  appId: "1:348727818592:web:7befb0f07f2024979b0605",
  measurementId: "G-YK4YZ9LYGW"
};

// Initialize Firebase (connects our React app with the firebase)
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);// (a) DATABASE CONNECTIVITY – How React connects to Firestore
/*
This is the exact line where your React app connects to the Firestore database.

getFirestore(app) takes the Firebase app and returns the Firestore instance (a db object).

This db object is then used throughout your app to perform database operations like reading, writing, updating, etc.
*/
export const storage = getStorage(app);




// ----------------- QUIZ UTILITIES -----------------

// Save quiz score
export async function saveQuizScore(userId, subjectId, score, total) {
  try {
    await addDoc(collection(db, "scores"), {
      userId,
      subject: subjectId,
      score,
      total,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error saving quiz score:", error);
  }
}

// Fetch quiz questions by subject
// Fetch quiz questions by subject
export async function fetchQuestionsBySubject(subjectId) {
  try {
    const subjectRef = doc(db, "quizzes", subjectId);  // Reference to the subject document
    const questionsRef = collection(subjectRef, "questions");  // Access the questions subcollection

    const q = query(questionsRef);
    const snapshot = await getDocs(q);

    // Map the fetched data
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

// Save user quiz answers and score
export async function submitQuizWithAnswers(userId, subjectId, answers, score, total) {
  try {
    await addDoc(collection(db, "quizSubmissions"), {
      userId,
      subject: subjectId,
      answers, // Object like { questionId: selectedOption }
      score,
      total,
      submittedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error submitting quiz with answers:", error);
  }
}


// ----------------- ROADMAP UTILITIES -----------------

// Save user roadmap progress
export async function saveUserProgress(userId, topicId, completed) {
  try {
    const progressRef = doc(db, "userProgress", userId);
    await setDoc(progressRef, {
      [topicId]: completed
    }, { merge: true });
  } catch (error) {
    console.error("Error saving progress:", error);
  }
}

// Load user roadmap progress
export async function loadUserProgress(userId) {
  try {
    const progressRef = doc(db, "userProgress", userId);
    const progressSnap = await getDoc(progressRef);
    if (progressSnap.exists()) {
      return progressSnap.data();
    } else {
      return {};
    }
  } catch (error) {
    console.error("Error loading progress:", error);
    return {};
  }
}

// Export Firebase utilities
export {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  ref,
  uploadBytes,
  getDownloadURL,
  serverTimestamp // important for timestamps
};
