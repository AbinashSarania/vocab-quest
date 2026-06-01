import { useState } from "react";
import words from "../data/words.json";

function WordLibrary({ onBack }) {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const filteredWords = words.filter((w) =>
    w.word.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10 relative">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold tracking-[0.4em]">DICTIONARY</h1>

        <button
          onClick={onBack}
          className="text-xs uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white"
        >
          Back
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search word..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-black p-3 text-sm outline-none"
        />
      </div>

      {/* WORD COUNT */}
      <div className="text-xs text-gray-500 tracking-widest mb-6">
        TOTAL WORDS: {filteredWords.length}
      </div>

      {/* WORD LIST */}
      <div className="space-y-4">
        {filteredWords.map((w, i) => {
          const isOpen = openIndex === i;

          return (
            <div
              key={i}
              className="border border-black p-4 cursor-pointer transition"
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              {/* WORD HEADER */}
              <div className="flex justify-between items-center">
                <p className="font-bold tracking-widest text-lg">{w.word}</p>

                <p className="text-xs text-gray-500 uppercase">
                  {w.difficulty || "unknown"}
                </p>
              </div>

              {/* MEANING ALWAYS VISIBLE */}
              <p className="text-sm text-gray-700 mt-2">{w.meaning}</p>

              {/* EXPANDED SECTION */}
              {isOpen && (
                <div className="mt-4 space-y-3 text-sm text-gray-700 border-t border-black pt-4">
                  {/* EXAMPLE */}
                  {w.example && <p className="italic">"{w.example}"</p>}

                  {/* SYNONYMS */}
                  {w.synonyms?.length > 0 && (
                    <p>
                      <span className="font-bold">Synonyms:</span>{" "}
                      {w.synonyms.join(", ")}
                    </p>
                  )}

                  {/* ANTONYMS */}
                  {w.antonyms?.length > 0 && (
                    <p>
                      <span className="font-bold">Antonyms:</span>{" "}
                      {w.antonyms.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WordLibrary;
