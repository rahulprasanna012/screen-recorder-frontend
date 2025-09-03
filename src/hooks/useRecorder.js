import { useEffect, useRef, useState } from "react";

const LIMIT_SECONDS = 180;

export function useRecorder() {
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [blobUrl, setBlobUrl] = useState("");
  const [chunks, setChunks] = useState([]);
  const [error, setError] = useState("");

  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    stopTracks();
  }, []);

  const stopTracks = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  const startTimer = () => {
    setElapsed(0);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1;
        if (next >= LIMIT_SECONDS) stopRecording();
        return next;
      });
    }, 1000);
  };

  const getMixedStream = async () => {
    const display = await navigator.mediaDevices.getDisplayMedia({
      video: { frameRate: 30 },
      audio: true
    });
    const mic = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true }
    });

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const dest = ctx.createMediaStreamDestination();

    const dTrack = display.getAudioTracks()[0];
    if (dTrack) ctx.createMediaStreamSource(new MediaStream([dTrack])).connect(dest);

    const mTrack = mic.getAudioTracks()[0];
    if (mTrack) ctx.createMediaStreamSource(new MediaStream([mTrack])).connect(dest);

    const tracks = [];
    const v = display.getVideoTracks()[0];
    if (v) tracks.push(v);
    const a = dest.stream.getAudioTracks()[0];
    if (a) tracks.push(a);

    return new MediaStream(tracks);
  };

  const startRecording = async () => {
    setError("");
    setChunks([]);
    setBlobUrl("");
    try {
      const stream = await getMixedStream();
      streamRef.current = stream;

      const mr = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9,opus" });
      const local = [];
      mr.ondataavailable = (e) => e.data && e.data.size > 0 && local.push(e.data);
      mr.onstop = () => {
        const blob = new Blob(local, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setChunks(local);
        setBlobUrl(url);
        stopTracks();
      };

      mr.start();
      recorderRef.current = mr;
      setRecording(true);
      startTimer();
    } catch (e) {
      console.error(e);
      setError("Failed to start recording. Check screen & mic permissions.");
    }
  };

  const stopRecording = () => {
    if (!recorderRef.current) return;
    try { recorderRef.current.stop(); } catch {}
    setRecording(false);
    if (timerRef.current) window.clearInterval(timerRef.current);
  };

  const toFile = () => {
    if (!chunks.length) return null;
    const blob = new Blob(chunks, { type: "video/webm" });
    return new File([blob], `recording_${Date.now()}.webm`, { type: "video/webm" });
  };

  return {
    recording,
    elapsed,
    blobUrl,
    error,
    startRecording,
    stopRecording,
    toFile,
    reset: () => { setChunks([]); setBlobUrl(""); setElapsed(0); }
  };
}
