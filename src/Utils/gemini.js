import { GoogleGenAI } from "@google/genai";
import { geminiApiKey } from "../common/constant"

const ai = new GoogleGenAI({ apiKey: geminiApiKey});

export default ai;