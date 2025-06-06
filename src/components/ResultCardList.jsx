import React from "react";
import ResultCard from "./ResultCard";

function ResultCardList({ title, thumbnails, videoId }) {
  return (
    <div>
      <ResultCard
        title={title}
        thumbnails={thumbnails}
        videoId={videoId}
      />
    </div>
  );
}

export default ResultCardList;
