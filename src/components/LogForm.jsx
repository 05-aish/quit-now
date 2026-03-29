function LogForm({ userInput, handleSubmit, textFieldInput, setTextFieldInput, clicked, onToggle }) {
    if(!clicked) return null;
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full flex-col relative justify-center">
                <form onSubmit={handleSubmit}>
                <label htmlFor="reason" className="block text-m font-normal text-gray-700">{!userInput? "Hey, what's up?" : "Great! Tell me about it!" }</label>

                <input type="text"
                        minLength={10} required
                        maxLength={100}
                        className="border border-gray-300 rounded px-4 py-2 mt-4 w-full max-w-lg " 
                        placeholder="Type here..." 
                        value={textFieldInput} 
                        onChange={(e) => setTextFieldInput(e.target.value)}/>
                <button className="bg-gradient-to-br from-pink-300 to-blue-200 text-white font-bold py-2 px-4 rounded mt-4 hover:scale-105 transition-transform duration-200"
                type='submit'>Submit</button>
                </form>
                <button 
            className="absolute right-2 top-2 mr-2 font-bold text-red-400"
            onClick={onToggle}
            >X</button>

            </div>
        </div>
    )
};

export default LogForm;