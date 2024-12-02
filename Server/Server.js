import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { SpeechClient } from '@google-cloud/speech';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Google Cloud Speech Client
const client = new SpeechClient();

// Route to analyze the pronunciation
app.post('/analyze', async (req, res) => {
    const { audioContent, word } = req.body;

    try {
        const audio = {
            content: audioContent,
        };

        const config = {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'en-US',
        };

        const request = {
            audio,
            config,
        };

        const [response] = await client.recognize(request);
        const transcript = response.results
            .map(result => result.alternatives[0].transcript)
            .join(' ');

        const pronunciationScore = transcript.toLowerCase() === word.toLowerCase() ? 100 : 0;
        
        const message = pronunciationScore === 100
            ? 'Great job! You pronounced it correctly!'
            : `Almost there! The correct pronunciation is "${word}". Keep trying!`;

        res.json({ success: true, message, pronunciationScore });
    } catch (error) {
        console.error('Error analyzing audio:', error);
        res.status(500).json({ success: false, message: 'Error processing audio' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
