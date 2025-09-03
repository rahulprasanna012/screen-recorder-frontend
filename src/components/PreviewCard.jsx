export default function PreviewCard({ blobUrl, onDownload, onUpload, uploading, onReset }) {
  if (!blobUrl) return null;
  return (
    <div className="card space-y-4">
      <h3 className="text-lg font-semibold">Preview</h3>
      <video src={blobUrl} controls className="w-full max-h-[420px] rounded-lg bg-black" />
      <div className="flex flex-wrap gap-3">
        <button className="btn btn-ghost" onClick={onDownload}>Download .webm</button>
        <button className="btn btn-primary disabled:opacity-70" onClick={onUpload} disabled={uploading}>
          {uploading ? "Uploading…" : "Upload"}
        </button>
        <button className="btn btn-ghost" onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}
