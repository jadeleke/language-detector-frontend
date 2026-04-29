import React, { useState } from 'react';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);

    try {
      const res = await fetch('https://your-backend.onrender.com/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ error: 'Failed to get prediction' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="w-full max-w-md">
      <input
        type="file"
        accept=".wav,.mp3"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        type="submit"
        disabled={!file}
        className="bg-blue-600 text-white py-2 px-4 rounded"
      >
        {loading ? 'Uploading...' : 'Upload & Predict'}
      </button>

      {result && (
        <div className="mt-4 bg-white shadow p-4 rounded">
          {result.error ? (
            <p className="text-red-600">{result.error}</p>
          ) : (
            <>
              <p><strong>Language:</strong> {result.language}</p>
              <p><strong>Confidence:</strong> {result.confidence}%</p>
            </>
          )}
        </div>
      )}
    </form>
  );
}

export default UploadForm;
