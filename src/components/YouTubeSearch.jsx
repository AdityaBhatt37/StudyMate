import React, { useState } from "react";
import axios from "axios";

const YouTubeSearch = () => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);

  const searchYouTube = async () => {
    if (!query.trim()) return;

    try {
      const response = await axios.get(`http://localhost:5000/api/youtube?q=${query}`);
      setVideos(response.data.items);
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchYouTube();  
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>📚 Study Topic Search</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="What do you want to learn?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "10px",
            width: "70%",
            maxWidth: "400px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            marginLeft: "10px",
            backgroundColor: "#FF4B2B",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Search
        </button>
      </form>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={video.snippet.thumbnails.high.url}
              alt={video.snippet.title}
              style={{ width: "100%", height: "auto" }}
            />
            <div style={{ padding: "10px" }}>
              <h4>{video.snippet.title}</h4>
              <p style={{ fontSize: "0.9em", color: "#666" }}>
                {video.snippet.channelTitle}
              </p>
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#FF4B2B", textDecoration: "none", fontWeight: "bold" }}
              >
                ▶️ Watch on YouTube
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeSearch;
