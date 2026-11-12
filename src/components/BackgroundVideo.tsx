"use client";

export default function BackgroundVideo() {
  return (
    <div className="video-background">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/bg.jpg"
        onLoadedData={(e) => {
          const video = e.currentTarget;
          video.playbackRate = 0.5; // 0.5 = half speed (slow motion)
        }}
      >
        <source src="/bg-video.mp4" type="video/mp4" />
        <source src="/bg-video.webm" type="video/webm" />
      </video>
    </div>
  );
}
