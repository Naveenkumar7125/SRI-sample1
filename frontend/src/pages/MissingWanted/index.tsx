import React, { useState } from "react";
import AddPersonModal from "./AddPersonModal";
import PersonCard from "./PersonCard";
import Garelly from "./Garelly";
import { PersonRecord } from "./types";

export default function MissingWantedPage() {
  const [open, setOpen] = useState(false);
  const [people, setPeople] = useState<PersonRecord[]>([]);

  const uid = (prefix = "") => prefix + Math.random().toString(36).slice(2, 9);

  const handleAdd = (rec: PersonRecord) => {
    setPeople((p) => [rec, ...p]);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Missing & Wanted</h1>
        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md">
          + Add Person
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {people.length === 0 ? (
          <div className="text-white/70">No records yet. Click "Add Person" to create one.</div>
        ) : (
          people.map((p) => (
            <div key={p.id}>
              <PersonCard person={p} />
              {p.images && p.images.length > 0 && <div className="mt-2"><Garelly images={p.images} /></div>}
            </div>
          ))
        )}
      </div>

      <AddPersonModal open={open} onClose={() => setOpen(false)} onAdd={(rec) => { handleAdd(rec); setOpen(false); }} uid={uid} />
    </div>
  );
}
