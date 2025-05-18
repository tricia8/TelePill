import * as Speech from 'expo-speech';

export const speak = (text) => {
    Speech.stop();
    Speech.speak(text, {
        pitch: 0.5,
    });
};


