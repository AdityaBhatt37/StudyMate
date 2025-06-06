import React from "react";
import { useRef } from "react";
import useYoutubeGeminiResult from "../Hooks/useYoutubeGeminiResult.jsx";
import useMockYoutubeData from "../Hooks/useMockYoutbeData.jsx";
import DatabaseSearch from "./DatabaseSearch.jsx";
import Quiz from "./Quiz.jsx";
import QuizAdmin from "./QuizAdmin.jsx"


function AiSearchContainer() {
  // const userInput = useRef();
  
  // const handleGeminiSearchClick = useYoutubeGeminiResult(userInput);

  //   // const handleGeminiSearchClick = useMockYoutubeData();

  // return (
  //   <div className="pt-28 px-4 bg-gray-50 mb-9">
  //     <div className="max-w-4xl mx-auto">
  //       <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-6">
  //         What do you want to learn today?
  //       </h1>

  //       <form
  //         className="flex items-center space-x-2"
  //         onSubmit={(e) => e.preventDefault()}
  //       >
  //         <input
        
  //           ref={userInput}
  //           type="text"
  //           placeholder="Search topics like React, DSA, ML..."
  //           className="flex-grow px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
  //         />
  //         <button
  //           className="px-5 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
  //           onClick={handleGeminiSearchClick}
  //         >
  //           Search
  //         </button>
  //       </form>
  //     </div>
  //   </div>


  // );

  return(
 <>
     <DatabaseSearch/> 
    
     </>
  )
}

    

export default AiSearchContainer;