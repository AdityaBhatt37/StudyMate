```jsx
import React from "react";
import { useRef } from "react";
import ai from "../Utils/gemini.js";
import {YOUTUBE_API_KEY} from "../common/constant.js";
import { useDispatch } from "react-redux";
import {addGeminiNamesAndYoutbeVideos} from "../Utils/Redux/geminiSlice.jsx";

function AiSearchContainer() {
  const userInput = useRef();
  const dispatch = useDispatch();
  
  const youtubeVideosSearchResult = async(title)=>{

    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
       title
      )}&key=${YOUTUBE_API_KEY}&maxResults=1&type=video`;
    
      const response = await fetch(searchUrl);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        return {
          title: title,
          videoId: data.items[0].id.videoId,
          thumbnail: data.items[0].snippet.thumbnails.medium.url,
        };
      } else {
        return null;
      }

  }

  const handleGeminiSearchClick = async () => {
    //Make an API call to Gemini API and get youtube videos Results
    const geminiQuery =
      "You are an AI assistant for a student learning platform called StudyMate. A student is searching for the topic: " +
      userInput.current.value +
      `. Suggest 5 to 10 of the most popular and highly recommended YouTube videos for this topic. 
   Each video should be a different style (like full course, one-shot, tutorial, detailed explanation, etc.) and must have good number of views or likes.
   Return only the **YouTube video titles**, separated by commas (no links or numbering). 
   Example: Java Full Course for Beginners, Java in One Shot by Apna College, Loops in C++ - Complete Guide, ...`;

    const geminiResults = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: geminiQuery,
    });

    const geminiResultsArray = geminiResults.text.split(",");

    const ArrayOfPromises = geminiResultsArray?.map((title) => youtubeVideosSearchResult(title));


    const youtubeResult = await Promise.all(ArrayOfPromises);

    dispatch(addGeminiNamesAndYoutbeVideos({geminiNames:geminiResultsArray,youtubeVideos:youtubeResult}));

  };

  return (
    <div className="pt-28 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-6">
          What do you want to learn today?
        </h1>

        <form
          className="flex items-center space-x-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={userInput}
            type="text"
            placeholder="Search topics like React, DSA, ML..."
            className="flex-grow px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            className="px-5 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            onClick={handleGeminiSearchClick}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default AiSearchContainer;
```