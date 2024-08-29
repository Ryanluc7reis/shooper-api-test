import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error("GEMINI_API_KEY não definida no arquivo .env");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const fileManager = new GoogleAIFileManager(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const uploadImage = async () => {
  try {
    const uploadResponse = await fileManager.uploadFile("public/medidor.webp", {
      mimeType: "image/webp",
      displayName: "Medidor",
    });

    const getResponse = await fileManager.getFile(uploadResponse.file.name);
    const { uri, name, createTime, sha256Hash } = getResponse;
    const guid = name.split("/")[1];
    const date = createTime;
    const stringBase64 = sha256Hash;

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      { text: "Describe if measure is about water or gas and what the reads" },
    ]);

    const resultText = result.response.text();
    const matchNumber = resultText.match(/\b\d{5,}\b/);
    const matchString = resultText.match("gas" || "water");

    let numberRead;
    let stringRead;

    if (matchNumber && matchString) {
      numberRead = matchNumber[0];
      stringRead = matchString[0];
    } else {
      console.log("No characters found.");
    }
    return { uri, guid, numberRead, stringRead, date, stringBase64 };
  } catch (err) {
    throw err;
  }
};
