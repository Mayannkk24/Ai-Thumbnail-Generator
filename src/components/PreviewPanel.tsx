import React from "react";
import type { AspectRatio, IThumbnail } from "../assets/assets";
import {
  DownloadIcon,
  ImageIcon,
  Loader2Icon,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

type Props = {
  thumbnail: IThumbnail | null;
  isLoading: boolean;
  aspectRatio: AspectRatio;
  onImprove: () => void;
};

const PreviewPanel = ({
  thumbnail,
  isLoading,
  aspectRatio,
  onImprove,
}: Props) => {
  const aspectClasses = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  } as Record<AspectRatio, string>;

  const onDownload = () => {
    if (!thumbnail?.image_url) return;
    const link = document.createElement("a");
    link.href = thumbnail.image_url.replace(
      "/upload",
      "upload/f1_attachment"
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const onLike = () => {
    if (!thumbnail) return;
    console.log("Thumbnail liked:", thumbnail._id);
  };

  const onDislike = () => {
    if (!thumbnail) return;
    onImprove();
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div
        className={`relative overflow-hidden rounded-xl ${aspectClasses[aspectRatio]}`}
      >
        {/* Loading */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/30">
            <Loader2Icon className="size-8 animate-spin text-zinc-300" />
            <div className="text-center">
              <p className="text-sm font-medium text-zinc-200">
                AI is generating your thumbnail…
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                This may take 10–20 seconds
              </p>
            </div>
          </div>
        )}

        {/* Image Preview */}
        {!isLoading && thumbnail?.image_url && (
          <div className="group relative h-full w-full">
            <img
              src={thumbnail.image_url}
              alt={thumbnail.title}
              className="h-full w-full object-cover"
            />

            {/* Action Buttons */}
            <div className="absolute inset-0 flex items-end justify-center gap-3 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={onLike}
                className="mb-6 flex items-center gap-2 rounded-md bg-white/30 px-4 py-2 text-xs font-medium backdrop-blur ring-1 ring-white/40 hover:bg-white/40"
              >
                <ThumbsUp className="size-4" />
                Like
              </button>

              <button
                onClick={onDislike}
                className="mb-6 flex items-center gap-2 rounded-md bg-white/30 px-4 py-2 text-xs font-medium backdrop-blur ring-1 ring-white/40 hover:bg-white/40"
              >
                <ThumbsDown className="size-4" />
                Improve
              </button>

              <button
                onClick={onDownload}
                className="mb-6 flex items-center gap-2 rounded-md bg-white/40 px-5 py-2.5 text-xs font-medium backdrop-blur ring-2 ring-white/50 hover:scale-105 active:scale-95"
              >
                <DownloadIcon className="size-4" />
                Download
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !thumbnail?.image_url && (
          <div className="absolute inset-0 m-2 flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-white/20 bg-black/25">
            <div className="hidden sm:flex size-20 items-center justify-center rounded-full bg-white/30">
              <ImageIcon className="size-10 text-white/50" />
            </div>
            <div className="px-4 text-center">
              <p className="text-zinc-200 font-medium">
                Generate your first thumbnail
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                Fill the form and click Generate
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
