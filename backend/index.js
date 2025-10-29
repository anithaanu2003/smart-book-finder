import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PredictionServiceClient } from "@google-cloud/aiplatform";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PROJECT_ID = "<YOUR_PROJECT_ID>";      // Replace with your Google Cloud Project ID
const LOCATION = "us-central1";              // Replace with your model's region
const MODEL_ID = "<YOUR_MODEL_ID>";          // Replace with your deployed Gemini model ID

// Initialize the Vertex AI Prediction client
const client = new PredictionServiceClient();

app.post("/api/ai-recommendations", async (req, res) => {
  const { title } = req.body;

  if (!title) return res.status(400).json({ error: "Missing title" });

  try {
    const request = {
      endpoint: `projects/${PROJECT_ID}/locations/${LOCATION}/models/${MODEL_ID}`,
      instances: [
        {
          content: `Suggest 3 books similar to "${title}" with a one-line description each. Number them.`
        }
      ],
    };

    const [response] = await client.predict(request);

    const recommendations = response.predictions?.[0]?.content || "⚠️ No recommendations generated.";

    res.json({ recommendations });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Could not fetch AI recommendations", details: error.toString() });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
