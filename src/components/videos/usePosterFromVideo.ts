import { useEffect, useState } from 'react';

export function usePosterFromVideo(src?: string, second = 1, enabled = true) {
  const [poster, setPoster] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !src) return;
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.crossOrigin = 'anonymous';
    video.src = src;

    const onMeta = () => {
      video.currentTime = Math.min(Math.max(second, 0.1), (video.duration || 1) - 0.1);
    };

    const onSeeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 720;
      canvas.height = video.videoHeight || 1280;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const data = canvas.toDataURL('image/jpeg', 0.82);
        setPoster(data);
      }
      cleanup();
    };

    const onError = () => {
      cleanup();
    };

    const cleanup = () => {
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('error', onError);
    };

    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('error', onError);
    return cleanup;
  }, [src, second, enabled]);

  return poster;
}

