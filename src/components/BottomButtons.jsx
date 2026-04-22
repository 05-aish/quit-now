function BottomButtons({ onResponseTwo, onAddClick, onRuinedDay }) {
    
    return (
        <div className="flex w-full justify-around items-center">

            <button
            className="p-3 flex items-center justify-center rounded-full bg-pink-500 text-white shadow-lg"
            onClick={onAddClick}
            title="Add new log."><svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#ffffff"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></button>


            <button
            className="p-3 rounded-full bg-pink-100 hover:bg-pink-200 transition"
            title="Motivation Logs"><svg 
            xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#f472b6"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></button>

            <button
            className="p-3 rounded-full bg-pink-100 hover:bg-pink-200 transition"
            onClick={onResponseTwo}
            title="Achievements"><svg
            className="pointer-events-none" xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#f472b6"><path d="M852-212 732-332l56-56 120 120-56 56ZM708-692l-56-56 120-120 56 56-120 120Zm-456 0L132-812l56-56 120 120-56 56ZM108-212l-56-56 120-120 56 56-120 120Zm246-75 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-361Z"/></svg></button>

            <button className="text-sm font-medium text-red-400 hover:text-red-500 bg-pink-100 rounded-lg p-4
            " onClick={onRuinedDay}>Today's Ruined</button>
        </div>
    );
}

export default BottomButtons;