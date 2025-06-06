import {geminiNames} from "../common/constant.js";
import {youtubeVideos} from "../common/constant.js";
import {useDispatch} from "react-redux";
import { addGeminiNamesAndYoutbeVideos } from "../Utils/Redux/geminiSlice";

const useMockYoutubeData = () =>{

    const dispatch = useDispatch();

    const handleGeminiSearchClick = () =>{

        dispatch(addGeminiNamesAndYoutbeVideos({geminiNames:geminiNames,youtubeVideos:youtubeVideos}));

        
    }

    return handleGeminiSearchClick;
}

export default useMockYoutubeData;