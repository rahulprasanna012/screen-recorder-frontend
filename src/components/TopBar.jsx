export default function TopBar() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white grid place-items-center font-bold">SR</div>
          <div>
            <h1 className="text-lg font-semibold">Screen Recorder</h1>
            <p className="text-xs text-gray-500">Tab + Mic • 3-minute cap</p>
          </div>
        </div>
        <span className="badge">Cloudinary + Multer + SQLite</span>
      </div>
    </header>
  );
}
