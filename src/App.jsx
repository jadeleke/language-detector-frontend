import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';

const labels = ['Akan', 'Ikposo', 'Dagbani'];

function App() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAudioUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    // Load model if not already loaded
    const model = await tf.loadLayersModel('/model/model.json');

    // Read the audio as array buffer
    const arrayBuffer = await file.arrayBuffer();
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const rawData = audioBuffer.getChannelData(0); // mono

    // Convert to mel spectrogram or fallback to zeroed dummy input
    let input;
    if (rawData.length > 0) {
      // Dummy input shape (1, 235, 32) — Replace with real mel-spectrogram processing
      input = tf.zeros([1, 235, 32]); // Replace with actual preprocessing
    }

    const output = model.predict(input);
    const data = await output.data();
    const topIndex = data.indexOf(Math.max(...data));
    setPrediction({ label: labels[topIndex], confidence: (data[topIndex] * 100).toFixed(2) });

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Language Detector</h1>
      <input type="file" accept="audio/*" onChange={handleAudioUpload} />
      {loading && <p>Loading...</p>}
      {prediction && (
        <p>
          Prediction: <strong>{prediction.label}</strong> <br />
          Confidence: <strong>{prediction.confidence}%</strong>
        </p>
      )}
    </div>
  );
}

export default App;
