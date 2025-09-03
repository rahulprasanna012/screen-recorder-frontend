import { bytesToMB } from "../utils/format";
import { deleteRecording } from "../lib/api";

export default function RecordingList({ items, onRefresh }) {
  if (!items.length) return <div className="card">No uploads yet.</div>;

  return (
    <div className="grid gap-4">
      {items.map((r) => (
        <div key={r.id} className="card space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="font-semibold">{r.filename}</div>
              <div className="text-xs text-gray-500">
                {bytesToMB(r.filesize)} MB • {new Date(r.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="flex gap-2">
              <span className="badge">{r.format || "video"}</span>
              {r.duration ? <span className="badge">{r.duration.toFixed(1)}s</span> : null}
            </div>
          </div>
          <video src={r.secure_url} controls className="w-full rounded-lg bg-black max-h-[360px]" />
          <div className="flex gap-3">
            <a className="btn btn-ghost" href={r.secure_url} target="_blank" rel="noreferrer">Open on CDN</a>
            <button
              className="btn btn-ghost"
              onClick={async () => { await deleteRecording(r.id).catch(() => {}); onRefresh(); }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
