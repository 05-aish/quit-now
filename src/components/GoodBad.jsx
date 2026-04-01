function GoodBad({ onResponse, canSelectResponse, submitted }) {
    if (!canSelectResponse) return (
    <div>
        <div className="text-gray-400 mt-2 ml-2">You've already logged today's progress.</div>
    </div>
    );
    return (
    <div>
        <div>How did you do today?</div>

        <div className="flex space-x-4 mt-4">
            <button
            className="bg-gradient-to-tl from-green-200 to-green-300 text-white font-semibold py-2 px-4 rounded-lg shadow-md shadow-green-200 
            hover:shadow-green-300 hover:-translate-y-0.5 active:scale-95 transition duration-200"
            onClick={() => onResponse(true)}
            >
            Good!
            </button>

            <button
            className="bg-gradient-to-tl from-red-300 to-red-400 text-white font-semibold py-2 px-4 rounded-lg shadow-sm 
            hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition duration-200"
            onClick={() => onResponse(false)}
            >
            Bad!
            </button>
        </div>
    </div>
)};

export default GoodBad;