function FeedbackMsg({ message, submitted }){
    if (!submitted) return null;
    return(
    <span className="text-green-500 font-semibold text-sm mt-2">{message}</span>
    )
}
export default FeedbackMsg;