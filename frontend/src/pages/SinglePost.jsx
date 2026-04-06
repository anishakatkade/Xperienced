import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { Heart, MessageCircle, Bookmark, Eye } from "lucide-react";

export default function SinglePost() {
  const { id } = useParams();

  const [story, setStory] = useState(null);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchStory();
  }, []);

  const fetchStory = async () => {
    const res = await API.get(`/experience/${id}`);
    setStory(res.data);
  };

  const handleLike = async () => {
    if (liked) return;
    await API.post(`/experience/like/${id}`);
    setLiked(true);

    setStory((prev) => ({
      ...prev,
      likes: [...(prev.likes || []), "me"],
    }));
  };

  const handleSave = async () => {
    if (saved) return;
    await API.post(`/experience/save/${id}`);
    setSaved(true);
  };

  const handleComment = async () => {
    if (!comment) return;

    const res = await API.post(`/experience/comment/${id}`, {
      text: comment,
    });

    setStory((prev) => ({
      ...prev,
      comments: [...prev.comments, res.data],
    }));

    setComment("");
  };

  if (!story) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-10">
      <div className="max-w-3xl mx-auto bg-[#1a1a1a] p-6 rounded-xl">
        <div className="flex gap-4 items-center">
          <img
            src={`https://logo.clearbit.com/${story.company}.com`}
            className="w-14 h-14 rounded-lg"
          />

          <div>
            <p className="font-semibold text-lg">
              {story.user?.name || "Anonymous"}
            </p>
            <p className="text-gray-400 text-sm">
              {story.company} • {new Date(story.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <h1 className="text-2xl font-bold mt-6">{story.title}</h1>

        <p className="text-gray-300 mt-4 whitespace-pre-line">
          {story.description}
        </p>

        <div className="flex gap-6 mt-6 text-gray-400">
          <button onClick={handleLike} className={liked ? "text-red-500" : ""}>
            <Heart /> {story.likes?.length}
          </button>

          <span>
            <MessageCircle /> {story.comments?.length}
          </span>

          <span>
            <Eye /> {story.views}
          </span>

          <button
            onClick={handleSave}
            className={saved ? "text-green-500" : ""}
          >
            <Bookmark />
          </button>
        </div>

        <div className="mt-6">
          <div className="flex gap-2">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 bg-black border p-2 rounded-lg text-sm"
            />

            <button
              onClick={handleComment}
              className="bg-green-600 px-4 rounded-lg"
            >
              Post
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {story.comments?.map((c, i) => (
            <div key={i} className="bg-black p-3 rounded-lg">
              <p className="text-sm">
                <span className="font-semibold">{c.user?.name || "User"}:</span>{" "}
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
