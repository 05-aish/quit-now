function Toast({ message, showToast }) {

    if (!showToast) return null;

    return (
        <div className="fixed bottom-30 left-1/2 -translate-x-1/2 bg-fuchsia-200 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
            {showToast ? message : ''}
        </div>
    );
}

export default Toast;