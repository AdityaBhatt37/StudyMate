
import { addGeminiNamesAndYoutbeVideos } from "../Utils/Redux/geminiSlice.jsx";
import axios from "axios";
import ai from "../Utils/gemini.js";
import { useDispatch } from "react-redux";

const useYoutubeGeminiResult = (userInput) =>{
    const dispatch = useDispatch();

    const youtubeVideosSearchResult = async (title) => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/youtube?q=${encodeURIComponent(title)}`
          );
          const video = response.data.items?.[0]; // Get top video only
          if (video) {
            return {
              title: title,
              videoId: video.id.videoId,
              thumbnail: video.snippet.thumbnails.medium.url,
            };
          } else {
            return null;
          }
        } catch (err) {
          console.error("Backend YouTube search failed:", err);
          return null;
        }
      };
    
      const handleGeminiSearchClick = async () => {
        const userTopic = userInput.current.value.trim();
        if (!userTopic) return; //early return
    
        const geminiQuery = `
          You are an AI assistant for a student learning platform called StudyMate.
          A student is searching for the topic: ${userTopic}.
          Suggest 10 to 15 of the most popular and highly recommended YouTube videos for this topic.
          Each video should be a different style (full course, one-shot, tutorial, etc.).
          Return only the **YouTube video titles**, separated by commas.
        `;
    
        try {
          const geminiResults = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: geminiQuery,
          });
    
          const geminiResultsArray = geminiResults.text.split(",").map(title => title.trim());
    
          const videoPromises = geminiResultsArray.map(title => youtubeVideosSearchResult(title));
            
          const youtubeResults = await Promise.all(videoPromises);
    
          dispatch(addGeminiNamesAndYoutbeVideos({
            geminiNames: geminiResultsArray,
            youtubeVideos: youtubeResults.filter(Boolean) // remove nulls
          }));
        } catch (error) {
          console.error("Gemini or YouTube fetch failed:", error);
        }
      };

      return handleGeminiSearchClick;
}

export default useYoutubeGeminiResult;