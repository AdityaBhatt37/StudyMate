import React, { useState, useEffect } from 'react';
import { db } from '../Utils/firebase.js';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import ReactMarkdown from 'react-markdown';

const Roadmap = () => {
  const user = useAuth();
  const [query, setQuery] = useState('');
  const [roadmaps, setRoadmaps] = useState([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [completed, setCompleted] = useState({});
  const [bookmarked, setBookmarked] = useState({});

  useEffect(() => {
    const fetchRoadmaps = async () => {
      const roadmapCollection = collection(db, 'roadmaps');
      const snapshot = await getDocs(roadmapCollection);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRoadmaps(data);
    };
    fetchRoadmaps();
  }, []);

  useEffect(() => {
    if (user?.uid) {
      const fetchUserData = async () => {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setCompleted(data.roadmapProgress || {});
          setBookmarked(data.bookmarks || {});
        }
      };
      fetchUserData();
    }
  }, [user]);

  const saveProgress = async (updatedCompleted, updatedBookmarks) => {
    if (!user?.uid) return;
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      roadmapProgress: updatedCompleted,
      bookmarks: updatedBookmarks,
    }, { merge: true });
  };

  const handleComplete = (roadmapId, topic) => {
    const current = Array.isArray(completed[roadmapId]) ? completed[roadmapId] : [];
    const updated = current.includes(topic)
      ? current.filter(t => t !== topic)
      : [...current, topic];
    const updatedCompleted = { ...completed, [roadmapId]: updated };
    setCompleted(updatedCompleted);
    saveProgress(updatedCompleted, bookmarked);
  };

  const filteredRoadmaps = roadmaps.filter(roadmap =>
    roadmap.title.toLowerCase().includes(query.toLowerCase()) ||
    roadmap.topics.some(topic =>
      topic.toLowerCase().includes(query.toLowerCase())
    )
  );

  const progress = (id, total) => {
    const done = Array.isArray(completed[id]) ? completed[id].length : 0;
    return `${done}/${total} Completed`;
  };

  const progressPercentage = (id, total) => {
    const done = Array.isArray(completed[id]) ? completed[id].length : 0;
    return (done / total) * 100;
  };

  const renderProgressCard = (roadmap) => (
    <div
      key={roadmap.id}
      className="p-4 border rounded bg-white shadow hover:bg-gray-50 transition"
    >
      <h2 className="text-xl font-bold flex justify-between items-center">
        {roadmap.title}
      </h2>
      <p className="text-sm text-gray-500 mb-1">{progress(roadmap.id, roadmap.topics.length)}</p>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-green-500 transition-all"
          style={{ width: `${progressPercentage(roadmap.id, roadmap.topics.length)}%` }}
        />
      </div>
      <button
        onClick={() => setSelectedRoadmap(roadmap)}
        className="mt-1 text-sm text-blue-600"
      >
        View Roadmap →
      </button>
    </div>
  );

  return (
    <div className="p-4 max-w-3xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Roadmaps</h1>

      <input
        className="w-full p-2 mb-6 border rounded"
        type="text"
        placeholder="Search by roadmap or topic..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {selectedRoadmap ? (
        <div className="border p-4 rounded shadow bg-white">
          <button
            className="mb-4 text-sm text-blue-600"
            onClick={() => setSelectedRoadmap(null)}
          >
            ← Back to list
          </button>
          <h2 className="text-xl font-bold flex justify-between items-center">
            {selectedRoadmap.title}
          </h2>
          <p className="text-sm text-gray-500 mb-2">
            {progress(selectedRoadmap.id, selectedRoadmap.topics.length)}
          </p>
          <div className="h-2 bg-gray-200 rounded-full mb-4">
            <div
              className="h-2 bg-green-500 rounded-full"
              style={{
                width: `${progressPercentage(selectedRoadmap.id, selectedRoadmap.topics.length)}%`,
              }}
            />
          </div>
          <ul className="space-y-2">
            {selectedRoadmap.topics.map((topic) => (
              <li
                key={topic}
                className={`flex items-center justify-between p-2 border rounded ${
                  (Array.isArray(completed[selectedRoadmap.id]) ? completed[selectedRoadmap.id] : []).includes(topic)
                    ? 'bg-green-100 line-through'
                    : ''
                }`}
              >
                <ReactMarkdown>{`- ${topic}`}</ReactMarkdown>
                <button
                  onClick={() => handleComplete(selectedRoadmap.id, topic)}
                  className="text-sm text-blue-600"
                >
                  {(Array.isArray(completed[selectedRoadmap.id]) ? completed[selectedRoadmap.id] : []).includes(topic)
                    ? 'Undo'
                    : 'Complete'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          {query ? (
            <div className="grid gap-4">
              {filteredRoadmaps.map(renderProgressCard)}
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-2">Your Progress</h2>
              <div className="grid gap-4">
                {roadmaps
                  .filter(r => (Array.isArray(completed[r.id]) && completed[r.id].length > 0) || bookmarked[r.id])
                  .map(renderProgressCard)}
                {roadmaps.filter(r => (Array.isArray(completed[r.id]) && completed[r.id].length > 0) || bookmarked[r.id]).length === 0 && (
                  <p className="text-sm text-gray-500">No progress yet. Start exploring by searching roadmaps above.</p>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Roadmap;
