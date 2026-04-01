function Streak({ streakCount, habit }) {
    return (
        <div className="relative mt-4 bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/40">
            <p className="text-sm text-gray-500">Current streak</p>
            
            <h2 className="text-2xl font-bold text-pink-500">
              {streakCount? `${streakCount} day${streakCount > 1 ? 's' : ''}` : "Let's start again!"}
            </h2>
            <p className="absolute top-3 right-2 mr-2 text-sm text-gray-600">
            🚫 {habit}
            </p>
        </div>
    )
    
}
export default Streak;