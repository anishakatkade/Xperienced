import { useEffect, useState } from "react";
import API from "../api/axios";
import PostCard from "../components/PostCard";
import socket from "../socket";

export default function Explore() {
  const [posts, setPosts] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await API.get("/experiences");
      setPosts(Array.isArray(res.data) ? res.data : []);
    };

    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await API.get("/experiences");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    socket.on("newComment", ({ postId, data }) => {
      setStories((prev) =>
        prev.map((item) => (item._id === postId ? data : item)),
      );
    });

    return () => socket.off("newComment");
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 py-10">
      <h1 className="text-5xl font-bold mb-6 mt-10 ml-5 text-green-700">
        Explore Experiences 🚀
      </h1>

      <div className="max-w-6xl mx-auto space-y-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} refresh={fetchPosts} />
        ))}
      </div>
    </div>
  );
}
