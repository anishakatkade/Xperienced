import { useState } from "react";
import API from "../api/axios";
import { ThumbsUp } from "lucide-react";

export default function CommentItem({ comment, postId, postUser, updatePost }) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [likes, setLikes] = useState(comment.likes || []);
  const [replyToUserId, setReplyToUserId] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userId = currentUser?._id;

  const isAuthor = comment.user?._id === postUser;

  const isLiked = likes.some((id) => id.toString() === userId);

  const timeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 60000);
    if (diff < 60) return `${diff}m`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h`;
    return `${Math.floor(diff / 1440)}d`;
  };

  const handleLike = async () => {
    try {
      const res = await API.post(
        `/experiences/${postId}/comment/${comment._id}/like`,
      );
      setLikes(res.data.likes);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;

    try {
      await API.post(`/experiences/${postId}/comment/${comment._id}/reply`, {
        text: replyText,
        replyTo: replyToUserId,
      });

      const res = await API.get(`/experiences/${postId}`);

      updatePost(res.data);

      setReplyText("");
      setShowReply(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>

      <div className="flex-1">
        <div className="bg-gray-100 p-3 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{comment.user?.name}</span>

            {isAuthor && (
              <span className="text-xs bg-blue-500 text-white px-2 rounded">
                Author
              </span>
            )}

            <span className="text-xs text-gray-500">
              • {timeAgo(comment.createdAt)}
            </span>
          </div>

          <p className="text-sm mt-1">{comment.text}</p>
        </div>

        <div className="flex gap-4 text-xs mt-1 text-gray-500">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 ${
              isLiked ? "text-blue-500 font-semibold" : ""
            }`}
          >
            <ThumbsUp size={14} className={isLiked ? "fill-blue-500" : ""} />
            {likes.length}
          </button>

          <button
            onClick={() => {
              setShowReply(!showReply);
              setReplyToUserId(comment.user._id);
            }}
          >
            Reply
          </button>
        </div>

        {showReply && (
          <div className="mt-2 flex gap-2">
            <input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="flex-1 border p-2 rounded-full text-sm"
            />
            <button
              onClick={handleReply}
              className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm"
            >
              Send
            </button>
          </div>
        )}

        <div className="ml-10 mt-3 space-y-3 border-l border-gray-300 pl-4">
          {comment.replies?.map((r, i) => (
            <div key={i} className="flex gap-2">
              <div className="w-7 h-7 bg-gray-300 rounded-full flex-shrink-0"></div>

              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-gray-800">
                    {r.user?.name || "User"}
                  </span>

                  <span className="text-gray-500 text-xs">
                    • {timeAgo(r.createdAt)}
                  </span>
                </div>

                <div className="text-sm text-gray-700">
                  {r.replyTo && (
                    <span className="text-blue-500 font-medium mr-1">
                      @{r.replyTo?.name}
                    </span>
                  )}

                  {r.text}
                </div>

                <div className="flex gap-4 text-xs text-gray-500 mt-1">
                  <button className="hover:text-blue-500 transition">
                    Like
                  </button>

                  <button
                    onClick={() => {
                      setShowReply(true);
                      setReplyToUserId(r.user._id);
                    }}
                    className="hover:text-blue-500 transition"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
