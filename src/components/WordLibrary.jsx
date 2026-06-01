import { useState } from "react";
import words from "../data/words.json";

function WordLibrary({ onBack }) {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const filteredWords = words.filter((w) =>
    w.word.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-6 py-8 sm:py-10 relative">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-[0.25em] sm:tracking-[0.4em]">
          DICTIONARY
        </h1>

        <button
          onClick={onBack}
          className="
            text-[10px] sm:text-xs uppercase tracking-widest
            border border-black px-3 sm:px-4 py-2
            active:scale-95 transition
            hover:bg-black hover:text-white
          "
        >
          Back
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-6 sm:mb-10">
        <input
          type="text"
          placeholder="Search word..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full border border-black
            p-3 text-sm
            outline-none
            focus:scale-[1.01] transition
          "
        />
      </div>

      {/* COUNT */}
      <div className="text-[10px] sm:text-xs text-gray-500 tracking-widest mb-5 sm:mb-6">
        TOTAL WORDS: <span className="text-black font-bold">{filteredWords.length}</span>
      </div>

      {/* LIST */}
      <div className="space-y-3 sm:space-y-4">

        {filteredWords.map((w, i) => {
          const isOpen = openIndex === i;

          return (
            <div
              key={i}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="
                border border-black
                p-3 sm:p-4
                cursor-pointer
                transition active:scale-[0.99]
              "
            >

              {/* TOP ROW */}
              <div className="flex justify-between items-start gap-4">
                <p className="font-bold tracking-widest text-base sm:text-lg break-words">
                  {w.word}
                </p>

                <p className="text-[10px] sm:text-xs text-gray-500 uppercase whitespace-nowrap">
                  {w.difficulty || "unknown"}
                </p>
              </div>

              {/* MEANING */}
              <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                {w.meaning}
              </p>

              {/* EXPANDED */}
              {isOpen && (
                <div className="mt-4 space-y-3 text-sm text-gray-700 border-t border-black pt-4">

                  {/* EXAMPLE */}
                  {w.example && (
                    <p className="italic leading-relaxed">
                      "{w.example}"
                    </p>
                  )}

                  {/* SYNONYMS */}
                  {w.synonyms?.length > 0 && (
                    <p className="leading-relaxed">
                      <span className="font-bold">Synonyms:</span>{" "}
                      {w.synonyms.join(", ")}
                    </p>
                  )}

                  {/* ANTONYMS */}
                  {w.antonyms?.length > 0 && (
                    <p className="leading-relaxed">
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