function Entries({ entries, deleteEntry }) {
  return (
    <div className="space-y-4">
      {(entries || []).slice().reverse().map((entry) => (
        <div
          key={entry.id}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
        >
          <p className="text-xs text-gray-400">{new Date(entry.date).toDateString()}</p>

          <p className="mt-1">
            {entry.response ? (
              <span className="text-green-500 font-medium text-sm">
                Good Day ✨
              </span>
            ) : (
              <span className="text-red-400 font-medium text-sm">
                Bad Day ☁️
              </span>
            )}
          </p>

          <p className="mt-2 text-gray-700 break-words">
            {entry.log}
          </p>

          <div className="flex justify-end mt-3">
            <button
              onClick={() => deleteEntry(entry.id)}
              className="text-red-400 hover:text-red-600 hover:scale-110 transition"
            >
              🗑
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Entries;