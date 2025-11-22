import React from "react";
import { PersonRecord } from "./types";

type Props = {
  person: PersonRecord;
  onClick?: () => void;
};

export default function PersonCard({ person, onClick }: Props) {
  const firstImage = person.images && person.images.length > 0 ? person.images[0].url || person.images[0].preview : null;

  return (
    <div className="p-4 border border-gray-700 rounded-md bg-black/20 cursor-pointer" onClick={onClick}>
      <div className="flex items-center gap-3">
        <div className="w-20 h-20 bg-gray-900 rounded overflow-hidden flex-shrink-0">
          {firstImage ? <img src={firstImage} alt={person.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">No Image</div>}
        </div>

        <div>
          <h3 className="text-lg font-semibold">{person.name}</h3>
          <p className="text-sm">Status: {person.status}</p>
          <p className="text-sm">Age: {person.age}</p>
          {person.location && <p className="text-sm">Location: {person.location}</p>}
        </div>
      </div>
    </div>
  );
}
