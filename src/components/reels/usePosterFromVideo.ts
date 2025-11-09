"use client";
import { useEffect, useRef, useState } from "react";

export function usePosterFromVideo(fileUrl: string | undefined, second = 1, enabled = true) {
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled || !fileUrl) return;
    setStatus("loading");

    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    videoRef.current = video;
    canvasRef.current = canvas;

    video.preload = "metadata";
    video.src = fileUrl;
    video.muted = true;
    video.playsInline = true as any;
    video.crossOrigin = "anonymous";

    const onLoaded = () => {
      try {
        video.currentTime = Math.max(0.1, second);
      } catch (e) {
        setStatus("error");
      }
    };

    const onSeeked = () => {
      try {
        const w = video.videoWidth;
        const h = video.videoHeight;
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, w, h);
          const url = canvas.toDataURL("image/jpeg", 0.8);
          setPosterUrl(url);
          setStatus("ready");
        } else {
          setStatus("error");
        }
      } catch (e) {
        setStatus("error");
      }
    };

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("seeked", onSeeked);

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("seeked", onSeeked);
      videoRef.current = null;
      canvasRef.current = null;
    };
  }, [fileUrl, second, enabled]);

  return { posterUrl, status };
}

