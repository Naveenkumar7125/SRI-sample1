import React from "react";
import { ImageItem } from "./types";

type Props = {
  images?: ImageItem[];
};

export default function Garelly({ images = [] }: Props) {
  if (!images || images.length === 0) return <p className="text-xs text-muted-foreground">No images</p>;

  return (
    <div className="grid grid-cols-3 gap-2">
      {images.map((img) => (
        <div key={img.id} className="w-full h-28 overflow-hidden rounded-md border border-gray-700">
          <img src={img.url || img.preview} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}
