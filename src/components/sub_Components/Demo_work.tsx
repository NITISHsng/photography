import React from "react";

const Demo_work = () => {
  const demoVideos = [
    {
      title: "Wedding Highlights",
      description: "Cinematic wedding coverage with emotional storytelling",
      iframe: (
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/ZfbgjfZjXSw"
          title="wedding highlights 2024 || JISHNU & RITIKA || FOTOFRAME STUDIO"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="rounded-t-2xl"
        ></iframe>
      ),
    },
    {
      title: "Corporate Events",
      description: "Professional business event documentation",
      iframe: (
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Corporate Event Sample"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="rounded-t-2xl"
        ></iframe>
      ),
    },
    {
      title: "Music Videos",
      description: "Creative music video production with artistic vision",
      iframe: (
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/ScMzIvxBSi4"
          title="Music Video Sample"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="rounded-t-2xl"
        ></iframe>
      ),
    },
  ];

  return (
    <div className="my-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {demoVideos.map((video, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Video Embed */}
            <div className="aspect-video">{video.iframe}</div>

            {/* Text */}
            <div className="p-6">
              <h4 className="font-bold text-lg text-gray-800 dark:text-white mb-2">
                {video.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Demo_work;
