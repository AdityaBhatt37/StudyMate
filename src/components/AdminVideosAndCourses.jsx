import React, { useState } from 'react';
import { db, collection, addDoc } from '../Utils/firebase';

function AdminVideosAndCourses() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [bulkPlatform, setBulkPlatform] = useState('youtube');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const coursesData = JSON.parse(reader.result);
        setUploading(true);
        for (const courseData of coursesData) {
          await addDoc(collection(db, 'courses'), { ...courseData, platform: bulkPlatform });
        }
        alert('Bulk upload successful!');
      } catch (error) {
        console.error('Error during bulk upload: ', error);
        alert('Bulk upload failed. Check console for errors.');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="admin-panel max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Bulk Upload Courses</h2>

      <form onSubmit={handleBulkUpload} className="space-y-6">
        <select
          value={bulkPlatform}
          onChange={(e) => setBulkPlatform(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        >
          <option value="youtube">YouTube</option>
          <option value="udemy">Udemy</option>
          <option value="coursera">Coursera</option>
        </select>

        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {uploading ? 'Uploading...' : 'Upload JSON'}
        </button>
      </form>
    </div>
  );
}

export default AdminVideosAndCourses;
