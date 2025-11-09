"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { usePosterFromVideo } from "./usePosterFromVideo";

type Props = {
  title: string;
  kind: 'video' | 'image';
  imageUrl?: string;
  videoUrl?: string;
  videoMime?: string;
  thumbUrl?: string;
  posterSecond?: number;
};

export default function ReelCard({ title, kind, imageUrl, videoUrl, videoMime = 'video/mp4', thumbUrl, posterSecond = 1 }: Props) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const ref = useRef<HTMLVideoElement>(null);

  const posterAuto = usePosterFromVideo(videoUrl, posterSecond, kind === 'video' && !thumbUrl);
  const poster = thumbUrl ?? posterAuto ?? undefined;

  const onPlay = () => {
    if (kind !== 'video') return;
    setPlaying(true);
    // ensure DOM updated before calling play (mobile browsers)
    setTimeout(() => {
      const v = ref.current;
      if (v) {
        v.muted = true;
        v.play().catch(() => {
          // revert if play was blocked
          setPlaying(false);
        });
      }
    }, 0);
  };

  const toggleMute = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm flex-shrink-0 basis-[72%] md:basis-[42%] lg:basis-[28%] mr-4 md:mr-6">
      <div className="relative aspect-[9/16] w-full">
        {kind === 'image' && imageUrl && (
          <Image src={imageUrl} alt={title} fill className="object-cover" sizes="(max-width:768px) 80vw, (max-width:1280px) 40vw, 25vw" />
        )}
        {kind === 'video' && videoUrl && (
          <>
            {!playing && (
              <>
                {poster && (
                  <Image src={poster} alt={title} fill className="object-cover" sizes="(max-width:768px) 80vw, (max-width:1280px) 40vw, 25vw" unoptimized={poster.startsWith('data:')} />
                )}
                <button aria-label={`Play video: ${title}`} onClick={onPlay} type="button" className="absolute inset-0 grid place-items-center z-10">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/70 focus-visible:ring-2">▶</span>
                </button>
              </>
            )}
            <video
              ref={ref}
              className={`absolute inset-0 h-full w-full object-cover ${playing ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              preload="metadata"
              playsInline
              controls={playing}
              muted={muted}
              poster={typeof poster === 'string' ? poster : undefined}
            >
              <source src={videoUrl} type={videoMime || 'video/mp4'} />
            </video>
            {playing && (
              <button onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'} type="button" className="absolute right-2 top-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur z-10">
                {muted ? 'Unmute' : 'Mute'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
