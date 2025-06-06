// firebaseSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { db } from '../firebase';
import {
  collection,
  doc,
  onSnapshot,
  getDoc,
  setDoc,
  updateDoc,
  increment
} from 'firebase/firestore';

// Get current user's unique ID (from Firebase auth)
const getUserId = () => {
  const user = JSON.parse(localStorage.getItem('userData'));  // Assuming userData is stored when logged in
  return user ? user.uid : 'anonymous'; // Use Firebase auth UID for user
};

// Like action (user can like only once)
export const updateLikeCount = (videoId, userId) => async () => {
  const likeRef = doc(db, 'likes', videoId);
  const userActionRef = doc(db, 'likes', videoId, 'userActions', userId);

  const userActionSnap = await getDoc(userActionRef);

  if (userActionSnap.exists()) {
    const { action } = userActionSnap.data();
    if (action === 'like') return; // Already liked
    if (action === 'dislike') {
      // Switch from dislike to like
      await updateDoc(likeRef, {
        likeCount: increment(1),
        dislikeCount: increment(-1)
      });
      await setDoc(userActionRef, { action: 'like' });
    }
  } else {
    // First time like
    const likeSnap = await getDoc(likeRef);
    if (likeSnap.exists()) {
      await updateDoc(likeRef, {
        likeCount: increment(1),
      });
    } else {
      await setDoc(likeRef, {
        likeCount: 1,
        dislikeCount: 0,
      });
    }
    await setDoc(userActionRef, { action: 'like' });
  }
};

// Dislike action (user can dislike only once)
export const updateDislikeCount = (videoId, userId) => async () => {
  const dislikeRef = doc(db, 'likes', videoId);
  const userActionRef = doc(db, 'likes', videoId, 'userActions', userId);

  const userActionSnap = await getDoc(userActionRef);

  if (userActionSnap.exists()) {
    const { action } = userActionSnap.data();
    if (action === 'dislike') return; // Already disliked
    if (action === 'like') {
      // Switch from like to dislike
      await updateDoc(dislikeRef, {
        dislikeCount: increment(1),
        likeCount: increment(-1)
      });
      await setDoc(userActionRef, { action: 'dislike' });
    }
  } else {
    // First time dislike
    const dislikeSnap = await getDoc(dislikeRef);
    if (dislikeSnap.exists()) {
      await updateDoc(dislikeRef, {
        dislikeCount: increment(1),
      });
    } else {
      await setDoc(dislikeRef, {
        likeCount: 0,
        dislikeCount: 1,
      });
    }
    await setDoc(userActionRef, { action: 'dislike' });
  }
};

// Combine like/dislike action
export const updateLikeDislikeStatus = ({ courseId, userId, type }) => async (dispatch) => {
  if (type === 'like') {
    await updateLikeCount(courseId, userId)();
  } else if (type === 'dislike') {
    await updateDislikeCount(courseId, userId)();
  }
};

// Real-time listener for likes/dislikes (per user)
export const listenForLikesAndDislikes = (userId) => (dispatch) => {
  return onSnapshot(collection(db, 'likes'), (snapshot) => {
    const likesData = {};
    const dislikesData = {};
    snapshot.forEach((doc) => {
      const data = doc.data();
      likesData[doc.id] = data.likeCount || 0;
      dislikesData[doc.id] = data.dislikeCount || 0;
    });

    dispatch(firebaseSlice.actions.setLikes(likesData));
    dispatch(firebaseSlice.actions.setDislikes(dislikesData));
  });
};

const firebaseSlice = createSlice({
  name: 'firebase',
  initialState: {
    likes: {},
    dislikes: {},
  },
  reducers: {
    setLikes: (state, action) => {
      state.likes = action.payload;
    },
    setDislikes: (state, action) => {
      state.dislikes = action.payload;
    },
  },
});

export const { setLikes, setDislikes } = firebaseSlice.actions;
export default firebaseSlice.reducer;
