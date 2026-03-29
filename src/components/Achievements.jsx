function Achievements({ achievements, onResponseTwo}){
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full flex-col relative justify-center">
            {[...achievements].map((achievement) => (
                <div 
                    className="border border-[#fab157] shadow-lg rounded-md px-4 py-2 mt-4 relative" 
                    key={achievement.id}> 
                    
                    <svg 
                    className="my-2"
                    xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#F9DB78"><path d="m363-310 117-71 117 71-31-133 104-90-137-11-53-126-53 126-137 11 104 90-31 133ZM480-28 346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm0-112 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z"/></svg>
                    <span
                    className="text-[#ffb41e] font-semibold mx-3"
                    >{achievement.milestone}</span>
                    <span
                    className="text-gray-400 text-sm absolute right-2">{achievement.date}</span>
                </div>
            ))}
            <button 
            className="absolute right-2 top-2 mr-2 font-bold text-red-400"
            onClick={onResponseTwo}>X</button>
        </div>
        
        </div>
        
    )
};

export default Achievements;