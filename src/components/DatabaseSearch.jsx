import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listenForLikesAndDislikes, updateLikeDislikeStatus } from '../Utils/Redux/firebaseSlice';
import { db } from '../Utils/firebase';//(a) DATABASE CONNECTIVITY – How React connects to Firestore
import { collection, query, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Utils/firebase';  // Assuming Firebase auth is set up

function DatabaseSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [userId, setUserId] = useState(null);  // Store user ID

  const likes = useSelector((state) => state.firebase.likes);
  const dislikes = useSelector((state) => state.firebase.dislikes);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        localStorage.setItem('userData', JSON.stringify(user));  // Store user data in localStorage
      } else {
        setUserId(null);
        localStorage.removeItem('userData');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      const unsubscribe = dispatch(listenForLikesAndDislikes(userId));
      return () => unsubscribe();
    }
  }, [userId, dispatch]);


  //(b) FETCHING COURSE DATA FROM FIRESTORE
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const q = query(collection(db, 'courses'));
        const snapshot = await getDocs(q);
        const allCourses = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(allCourses);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCourses([]);
      return;
    }

    const lowerSearch = searchTerm.toLowerCase();
    const filtered = courses.filter((course) =>
      course.tags?.toLowerCase().includes(lowerSearch)
    );

    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  const handleReaction = (courseId, type) => {
    if (userId) {
      dispatch(updateLikeDislikeStatus({ courseId, userId, type }));
    } else {
      alert('Please log in to give feedback');
    }
  };

  const groupedCourses = {
    youtube: [],
    udemy: [],
    coursera: [],
  };

  filteredCourses.forEach((course) => {
    const platform = course.platform?.toLowerCase();
    if (platform.includes('youtube')) {
      groupedCourses.youtube.push(course);
    } else if (platform.includes('udemy')) {
      groupedCourses.udemy.push(course);
    } else if (platform.includes('coursera')) {
      groupedCourses.coursera.push(course);
    }
  });

  const getVideoURL = (platform, videoId, videoLink) => {
    if (platform.toLowerCase().includes('youtube')) {
      return `https://www.youtube.com/watch?v=${videoId}`;
    } else {
      return videoLink;
    }
  };

  const renderCourses = (platformName, courseList) =>
    courseList.length > 0 && (
      <div className="mb-10">
        <h3 className="text-xl font-bold mb-4">{platformName} Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseList.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow-lg rounded-xl p-4 flex flex-col gap-3 border border-gray-200 transition-transform hover:scale-[1.02]"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold">{course.title}</h3>

              <div className="text-sm text-gray-600">
                <p>
                  👍 {likes[course.videoId] || 0} | 👎 {dislikes[course.videoId] || 0}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                  onClick={() => window.open(getVideoURL(course.platform, course.videoId, course.videoLink), '_blank')}
                >
                  {platformName === 'YouTube' ? 'Watch Video' : 'Check Course'}
                </button>

                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  onClick={() => handleReaction(course.videoId, 'like')}
                >
                  Like
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={() => handleReaction(course.videoId, 'dislike')}
                >
                  Dislike
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white pt-24 px-4 md:px-8">
      {/* Search Bar */}
      <div className="mb-10 max-w-2xl mx-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for topics..."
          className="w-full p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Render Filtered Courses */}
      {filteredCourses.length > 0 ? (
        <>
          {renderCourses('YouTube', groupedCourses.youtube)}
          {renderCourses('Udemy', groupedCourses.udemy)}
          {renderCourses('Coursera', groupedCourses.coursera)}
        </>
      ) : (
        <p>No courses found for "{searchTerm}".</p>
      )}
    </div>
  );
}

export default DatabaseSearch;
