import React, { useState } from 'react';
import { db, collection, addDoc } from '../Utils/firebase';

const AdminRoadmap = () => {
  const [jsonData, setJsonData] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (Array.isArray(parsed)) {
          setJsonData(parsed);
        } else {
          alert('JSON must be an array of roadmap objects.');
        }
      } catch (err) {
        alert('Invalid JSON file.');
        console.error(err);
      }
    };
    reader.readAsText(file);
  };

  const uploadRoadmapToFirestore = async () => {
    if (!jsonData) return;

    try {
      const promises = jsonData.map((roadmap) => {
        return addDoc(collection(db, 'roadmaps'), roadmap);
      });

      await Promise.all(promises);
      alert('All roadmaps uploaded successfully!');
      setJsonData(null);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload roadmaps.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 border shadow rounded">
      <h2 className="text-2xl font-bold mb-4">📤 Upload Roadmap via JSON</h2>

      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="mb-4"
      />

      {jsonData && (
        <div className="mb-4 p-2 border bg-gray-100 rounded text-sm max-h-60 overflow-y-scroll">
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}

      <button
        onClick={uploadRoadmapToFirestore}
        disabled={!jsonData}
        className={`w-full py-2 rounded text-white transition ${
          jsonData ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        🚀 Upload to Firestore
      </button>
    </div>
  );
};

export default AdminRoadmap;
