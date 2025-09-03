import { useEffect, useState } from "react";
import RecorderControls from "../components/RecorderControls.jsx";
import PreviewCard from "../components/PreviewCard.jsx";
import RecordingList from "../components/RecordingList.jsx";
import { useRecorder } from "../hooks/useRecorder.js";
import { listRecordings, uploadRecording } from "../lib/api.js";

export default function RecorderPage() {
  const rec = useRecorder();
  const [items, setItems] = useState([]);
  const [uploading, setUploading] = useState(false);

  const refresh = async () => {
    try {
      const rows = await listRecordings();
      setItems(rows);
    } catch {
      setItems([]);
    }
  };

  useEffect(() => { refresh(); }, []);

  const handleUpload = async () => {
    const file = rec.toFile();
    if (!file) return;
    setUploading(true);
    try {
      await uploadRecording(file);
      await refresh();
    } catch (e) {
      alert(e.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = () => {
    const file = rec.toFile();
    if (!file) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = file.name;
    a.click();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
      <RecorderControls
        recording={rec.recording}
        elapsed={rec.elapsed}
        onStart={rec.startRecording}
        onStop={rec.stopRecording}
      />

      {rec.error && (
        <div className="card border border-red-200 bg-red-50 text-red-700">
          {rec.error}
        </div>
      )}

      <PreviewCard
        blobUrl={rec.blobUrl}
        onDownload={handleDownload}
        onUpload={handleUpload}
        uploading={uploading}
        onReset={rec.reset}
      />

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Uploaded Recordings</h3>
        <RecordingList items={items} onRefresh={refresh} />
      </div>
    </div>
  );
}
