import { mmss } from "../utils/format";

export default function RecorderControls({ recording, elapsed, onStart, onStop }) {
  return (
    <div className="card flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className={`h-3 w-3 rounded-full ${recording ? "bg-red-500 animate-pulse" : "bg-gray-300"}`} />
        <div className="text-sm text-gray-600">Timer</div>
        <div className="font-mono text-lg">{mmss(elapsed)}</div>
      </div>
      <div className="flex gap-3">
        {!recording ? (
          <button className="btn btn-primary" onClick={onStart}>Start Recording</button>
        ) : (
          <button className="btn btn-ghost" onClick={onStop}>Stop</button>
        )}
      </div>
    </div>
  );
}
