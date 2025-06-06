import React from "react";
import ResultCardList from "./ResultCardList";
import { useSelector } from "react-redux";

function ResultContainer() {
  const youtubeVideosData = useSelector((appStore) => appStore?.gemini);
  console.log(youtubeVideosData);
  return (

    (
    <div className=" p-2 flex flex-wrap gap-4 bg-gray-50">
     { youtubeVideosData?.youtubeVideos?.map((video) =>{
      return(
      <ResultCardList
        title={video?.title}
        thumbnails={video?.thumbnail}
        videoId={video?.videoId}
      />
      )})}
    </div>
    )
  );
}

export default ResultContainer;
