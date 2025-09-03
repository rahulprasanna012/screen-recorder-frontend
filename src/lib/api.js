const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function listRecordings() {
  const r = await fetch(`${API}/api/recordings`);
  if (!r.ok) throw new Error("Failed to fetch recordings");
  return r.json();
}

export async function uploadRecording(file) {
  const fd = new FormData();
  fd.append("video", file);
  const r = await fetch(`${API}/api/recordings`, { method: "POST", body: fd });
  if (!r.ok) {
    let m = "Upload failed";
    try { m = (await r.json()).error || m; } catch {}
    throw new Error(m);
  }
  const data = await r.json();
  return data.recording;
}

export async function deleteRecording(id) {
  const r = await fetch(`${API}/api/recordings/${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error("Delete failed");
}
