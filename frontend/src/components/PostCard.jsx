
import {
  Send,
  Heart,
  MessageCircle,
  Eye,
  Bookmark,
  Briefcase,
  Clock,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { getCompanyLogo } from "../utils/getCompanyLogo";

const outcomeConfig = {
  selected: {
    label: "Selected",
    bg: "#dcfce7",
    color: "#15803d",
    dot: "#22c55e",
  },
  rejected: {
    label: "Rejected",
    bg: "#fee2e2",
    color: "#dc2626",
    dot: "#ef4444",
  },
  pending: {
    label: "Pending",
    bg: "#fef9c3",
    color: "#a16207",
    dot: "#eab308",
  },
};

const difficultyColor = {
  Easy: "#22c55e",
  Medium: "#f59e0b",
  Hard: "#ef4444",
  "Very Hard": "#7c3aed",
};

export default function PostCard({ post }) {
  const logos = getCompanyLogo(post.company);
  const navigate = useNavigate();
  const [likes, setLikes] = useState([]);
  const [saved, setSaved] = useState([]);
  const [hovered, setHovered] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
const [message, setMessage] = useState("");
const [file, setFile] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userId = currentUser?._id;

  useEffect(() => {
    setLikes(post?.likes || []);
    setSaved(post?.savedBy || []);
  }, [post]);

  useEffect(() => {
    if (!post?._id || post._id === "undefined") return;
    const trackView = async () => {
      try {
        await API.post(`/api/experiences/${post._id}/view`);
      } catch {}
    };
    trackView();
  }, [post?._id]);

  const isLiked = likes?.some((id) => id.toString() === userId);
  const isSaved = saved?.some((id) => id.toString() === userId);

  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      const res = await API.post(`/api/experiences/${post._id}/like`);
      setLikes(res.data.likes);
    } catch {}
  };

  const handleSave = async (e) => {
    e.stopPropagation();
    try {
      const res = await API.post(`/api/experiences/${post._id}/save`);
      setSaved(res.data.savedBy || []);
    } catch {}
  };

  const outcome = outcomeConfig[post.outcome] || null;
  const rounds = Array.isArray(post?.rounds) ? post.rounds : [];
  const tags = Array.isArray(post?.tags) ? post.tags.filter(Boolean) : [];
  const rating = post.rating || 0;
  const year = post.yoe || "Fresher";

  const getPlainText = (html) => {
    if (!html) return "";
    return html
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const initials = post.user?.name?.[0]?.toUpperCase() || "U";
  const avatarColors = [
    "#f97316",
    "#8b5cf6",
    "#06b6d4",
    "#ec4899",
    "#10b981",
    "#f59e0b",
  ];
  const avatarColor =
    avatarColors[(post.user?.name?.charCodeAt(0) || 0) % avatarColors.length];



  const handleSendReferral = async () => {
  try {
    if (!message) {
      alert("Please write a message");
      return;
    }

    if (!file) {
      alert("Please upload your resume");
      return;
    }

    const formData = new FormData();

    formData.append("message", message);
    formData.append("toEmail", post.user?.email); // 🔥 IMPORTANT
    formData.append("file", file);

    const res = await API.post("/referral/send", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Referral sent successfully 🚀");

    setShowReferral(false);
    setMessage("");
    setFile(null);

  } catch (error) {
    console.log("Referral error:", error);
    alert("Failed to send referral ❌");
  }
};
  return (
    <>
    <div
      onClick={() => navigate(`/post/${post._id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `1px solid ${hovered ? "#e2e8f0" : "#f1f5f9"}`,
        borderRadius: 20,
        padding: "20px 22px 16px",
        marginBottom: 14,
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: hovered
          ? "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)"
          : "0 1px 4px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {outcome && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: outcome.dot,
            borderRadius: "20px 20px 0 0",
            opacity: 0.8,
          }}
        />
      )}

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 14,
        }}
      >
        <div style={{ position: "relative", flexShrink: 0 }}>
          <img
            src={getCompanyLogo(post.company)}
            alt="logo"
            className="w-12 h-12 rounded-xl object-contain bg-white p-1"
          />
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 13,
              background: "linear-gradient(135deg,#f1f5f9,#e2e8f0)",
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              border: "1px solid #f1f5f9",
            }}
          >
            🏢
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: 3,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              letterSpacing: "-0.01em",
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>
              {post.company}
            </span>
            {post.role && (
              <>
                <span style={{ fontSize: 11, color: "#cbd5e1" }}>▸</span>
                <span style={{ fontSize: 12, color: "#64748b" }}>
                  {post.role}
                </span>
              </>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 6,
            flexShrink: 0,
          }}
        >
          {outcome && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: 20,
                background: outcome.bg,
                color: outcome.color,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: outcome.dot,
                }}
              />
              {outcome.label}
            </div>
          )}
          {post.difficulty && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: difficultyColor[post.difficulty] || "#94a3b8",
                textTransform: "uppercase",
              }}
            >
              {post.difficulty}
            </span>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 0,
          marginBottom: 14,
          flexWrap: "wrap",
          background: "#f8fafc",
          borderRadius: 12,
          padding: "8px 14px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 12,
            color: "#64748b",
            paddingRight: 12,
          }}
        >
          <Briefcase size={11} color="#94a3b8" />
          <span style={{ fontWeight: 500 }}>{year}</span>
        </div>

        <div
          style={{
            width: 1,
            height: 14,
            background: "#e2e8f0",
            marginRight: 12,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            paddingRight: 12,
          }}
        >
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              style={{
                fontSize: 11,
                color: s <= rating ? "#f59e0b" : "#e2e8f0",
              }}
            >
              ★
            </span>
          ))}
          <span
            style={{
              fontSize: 11,
              color: "#94a3b8",
              fontWeight: 500,
              marginLeft: 2,
            }}
          >
            {rating}/5
          </span>
        </div>

        <div
          style={{
            width: 1,
            height: 14,
            background: "#e2e8f0",
            marginRight: 12,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 12,
            color: "#64748b",
          }}
        >
          <Clock size={11} color="#94a3b8" />
          <span style={{ fontWeight: 500 }}>
            {rounds.length} round{rounds.length !== 1 ? "s" : ""}
          </span>
        </div>

        {post.package && (
          <>
            <div
              style={{
                width: 1,
                height: 14,
                background: "#e2e8f0",
                margin: "0 12px",
              }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <TrendingUp size={11} color="#22c55e" />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#15803d" }}>
                {post.package}
              </span>
            </div>
          </>
        )}
      </div>

      <div
        style={{
          fontSize: 13,
          color: "#475569",
          lineHeight: 1.7,
          marginBottom: 14,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {getPlainText(post.text)}
      </div>

      {rounds.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginBottom: 10,
          }}
        >
          {rounds.map((r, i) => (
            <span
              key={i}
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: 20,
                background: "#f0f9ff",
                color: "#0369a1",
                border: "1px solid #bae6fd",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span style={{ fontSize: 9, color: "#7dd3fc", fontWeight: 700 }}>
                R{i + 1}
              </span>
              {r}
            </span>
          ))}
        </div>
      )}

      {tags.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: 5,
            flexWrap: "wrap",
            marginBottom: 14,
          }}
        >
          {tags.map((t, i) => (
            <span
              key={i}
              style={{
                fontSize: 11,
                fontWeight: 500,
                padding: "3px 9px",
                borderRadius: 20,
                background: "#f1f5f9",
                color: "#64748b",
                border: "1px solid #e2e8f0",
              }}
            >
              #{t}
            </span>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          paddingTop: 12,
          borderTop: "1px solid #f8fafc",
        }}
      >
        <button
          onClick={handleLike}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 10px",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            color: isLiked ? "#e11d48" : "#94a3b8",
            cursor: "pointer",
            border: "none",
            background: isLiked ? "#fff1f2" : "none",
            fontFamily: "inherit",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) =>
            !isLiked && (e.currentTarget.style.background = "#f8fafc")
          }
          onMouseLeave={(e) =>
            !isLiked && (e.currentTarget.style.background = "none")
          }
        >
          <Heart
            size={13}
            fill={isLiked ? "#e11d48" : "none"}
            stroke={isLiked ? "#e11d48" : "currentColor"}
          />
          {likes.length}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/post/${post._id}`);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 10px",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            color: "#94a3b8",
            cursor: "pointer",
            border: "none",
            background: "none",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        >
          <MessageCircle size={13} />
          {post.comments?.length || 0}
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 10px",
            fontSize: 12,
            fontWeight: 600,
            color: "#94a3b8",
          }}
        >
          <Eye size={13} />
          {post.views?.length || 0}
        </div>

        <div style={{ flex: 1 }} />

       <button
  onClick={handleSave}
  style={{
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding: "5px 10px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 600,
    color: isSaved ? "#0f172a" : "#94a3b8",
    cursor: "pointer",
    border: "none",
    background: isSaved ? "#f1f5f9" : "none",
    fontFamily: "inherit",
    transition: "all 0.15s",
  }}
  onMouseEnter={(e) =>
    !isSaved && (e.currentTarget.style.background = "#f8fafc")
  }
  onMouseLeave={(e) =>
    !isSaved && (e.currentTarget.style.background = "none")
  }
>

  {/* ✅ FIXED: div instead of button */}
  <div
    onClick={(e) => {
      e.stopPropagation();
      setShowReferral(true);
    }}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 5,
      padding: "5px 10px",
      borderRadius: 8,
      fontSize: 12,
      fontWeight: 600,
      color: "#2563eb",
      cursor: "pointer",
      background: "#eff6ff",
      marginLeft: 6,
    }}
  >
    <Send size={13} />
    Ask Referral
  </div>

  <Bookmark
    size={13}
    fill={isSaved ? "#0f172a" : "none"}
    stroke={isSaved ? "#0f172a" : "currentColor"}
  />
  {isSaved ? "Saved" : "Save"}

</button>

        <div
          style={{
            width: 1,
            height: 14,
            background: "#f1f5f9",
            margin: "0 8px",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: avatarColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {initials}
          </div>
          <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>
            {post.user?.name || "User"}
          </span>
        </div>
      </div>
    </div>

    {showReferral && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    
    <div className="bg-white p-6 rounded-xl w-[400px]">

      <h2 className="text-lg font-semibold mb-4">
        Request Referral 🚀
      </h2>

      <textarea
        placeholder="Write your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <div className="flex justify-end gap-2">
        <button onClick={() => setShowReferral(false)}>
          Cancel
        </button>

        <button
          onClick={handleSendReferral}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>

    </div>
    </div>
)}

</>
);
}