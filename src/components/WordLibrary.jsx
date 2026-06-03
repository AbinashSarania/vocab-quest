import { useMemo, useState } from "react";
import words from "../data/words.json";

function WordLibrary({ onBack }) {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  /* =========================
     FILTER STATES
  ========================= */

  const [dateFilter, setDateFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const today = new Date();

  /* =========================
     FILTER + SORT LOGIC
  ========================= */

  const processedWords = useMemo(() => {
    let result = [...words];

    /* SEARCH */
    if (search.trim()) {
      result = result.filter((w) =>
        w.word.toLowerCase().includes(search.toLowerCase()),
      );
    }

    /* DATE FILTER */
    if (dateFilter === "Today") {
      const todayStr = today.toISOString().split("T")[0];
      result = result.filter((w) => w.date === todayStr);
    }

    if (dateFilter === "Last 7 Days") {
      result = result.filter((w) => {
        if (!w.date) return false;
        const diff = (today - new Date(w.date)) / (1000 * 60 * 60 * 24);
        return diff <= 7;
      });
    }

    if (dateFilter === "Last 30 Days") {
      result = result.filter((w) => {
        if (!w.date) return false;
        const diff = (today - new Date(w.date)) / (1000 * 60 * 60 * 24);
        return diff <= 30;
      });
    }

    /* SORTING */
    if (sortBy === "A-Z") {
      result.sort((a, b) => a.word.localeCompare(b.word));
    }

    if (sortBy === "Z-A") {
      result.sort((a, b) => b.word.localeCompare(a.word));
    }

    if (sortBy === "Newest") {
      result.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    }

    if (sortBy === "Oldest") {
      result.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
    }

    return result;
  }, [search, dateFilter, sortBy]);

  /* =========================
     UI
  ========================= */

  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-6 py-8 sm:py-10 relative">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-[0.25em]">
          DICTIONARY
        </h1>

        <button
          onClick={onBack}
          className="text-xs uppercase border border-black px-3 py-2 hover:bg-black hover:text-white"
        >
          Back
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search word..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-black p-3 text-sm mb-4 outline-none"
      />

      {/* FILTERS */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* DATE FILTER */}
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border border-black p-2 text-sm"
        >
          <option>All</option>
          <option>Today</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>

        {/* SORT */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-black p-2 text-sm"
        >
          <option>Newest</option>
          <option>Oldest</option>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
      </div>

      {/* COUNT */}
      <div className="text-xs text-gray-500 mb-4 tracking-widest">
        TOTAL WORDS:{" "}
        <span className="text-black font-bold">{processedWords.length}</span>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {processedWords.map((w, i) => {
          const isOpen = openIndex === i;

          return (
            <div
              key={i}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="border border-black p-4 cursor-pointer"
            >
              {/* WORD */}
              <div className="flex justify-between">
                <p className="font-bold tracking-widest">{w.word}</p>
              </div>

              {/* MEANING */}
              <p className="text-sm text-gray-700 mt-2">{w.meaning}</p>

              {/* EXPANDED */}
              {isOpen && (
                <div className="mt-3 space-y-2 text-sm text-gray-700 border-t border-black pt-3">
                  {w.example && <p className="italic">"{w.example}"</p>}

                  {w.synonyms?.length > 0 && (
                    <p>
                      <b>Synonyms:</b> {w.synonyms.join(", ")}
                    </p>
                  )}

                  {w.antonyms?.length > 0 && (
                    <p>
                      <b>Antonyms:</b> {w.antonyms.join(", ")}
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
