import React from 'react'

function ResultCard({title,thumbnails,videoId}) {
  

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full sm:w-[320px] hover:shadow-lg transition-all duration-300">
      <img
        src={thumbnails}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h3>
        <div className="mt-4 flex flex-col gap-2">
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-[#FF4B2B] hover:bg-[#FFC107] transition-colors py-2 px-4 rounded text-center"
          >
            Watch Video
          </a>
          <button className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded">
            Give Feedback
          </button>
        </div>
      </div>
    </div>
  );

}

export default ResultCard