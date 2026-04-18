import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import CommentItem from "../components/CommentItem";
import {
  ArrowLeft,
  Heart,
  Bookmark,
  Eye,
  MessageCircle,
  Briefcase,
  Clock,
  TrendingUp,
  Star,
  Send,
} from "lucide-react";

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
  Easy: { color: "#15803d", bg: "#dcfce7" },
  Medium: { color: "#b45309", bg: "#fef3c7" },
  Hard: { color: "#dc2626", bg: "#fee2e2" },
  "Very Hard": { color: "#7c3aed", bg: "#ede9fe" },
};

const roundColors = [
  { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  { bg: "#fdf4ff", color: "#7e22ce", border: "#e9d5ff" },
  { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
  { bg: "#f0fdfa", color: "#0f766e", border: "#99f6e4" },
];

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [text, setText] = useState("");
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState([]);
  const [activeTab, setActiveTab] = useState("experience");
  const [submitting, setSubmitting] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userId = currentUser?._id;

  useEffect(() => {
    fetchPost();
    trackView();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await API.get(`/api/experiences/${id}`);
      setPost(res.data);
      setLikes(res.data.likes || []);
      setLiked(res.data.likes?.some((l) => l.toString() === userId));
      setSaved(res.data.savedBy?.some((s) => s.toString() === userId));
    } catch (err) {
      console.log(err);
    }
  };

  const trackView = async () => {
    try {
      await API.post(`/api/experiences/${id}/view`);
    } catch {}
  };

  const handleComment = async () => {
    if (!text.trim()) return;
    setSubmitting(true);
    try {
      await API.post(`/api/experiences/${id}/comment`, { text });
      setText("");
      fetchPost();
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async () => {
    try {
      const res = await API.post(`/api/experiences/${id}/like`);
      setLikes(res.data.likes);
      setLiked(res.data.likes?.some((l) => l.toString() === userId));
    } catch {}
  };

  const handleSave = async () => {
    try {
      const res = await API.post(`/api/experiences/${id}/save`);
      setSaved(res.data.savedBy?.some((s) => s.toString() === userId));
    } catch {}
  };

  if (!post)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily: "'DM Sans', sans-serif",
          color: "#94a3b8",
          fontSize: 14,
        }}
      >
        Loading...
      </div>
    );

  const outcome = outcomeConfig[post.outcome] || null;
  const diffStyle = difficultyColor[post.difficulty] || null;
  const rounds = Array.isArray(post.rounds) ? post.rounds : [];
  const tags = Array.isArray(post.tags) ? post.tags.filter(Boolean) : [];
  const rating = post.rating || 0;

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

  const tabs = [
    { key: "experience", label: "Experience" },
    post.prepTips ? { key: "tips", label: "Prep Tips" } : null,
    post.questions ? { key: "questions", label: "Questions" } : null,
  ].filter(Boolean);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #f1f5f9",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            fontSize: 13,
            fontWeight: 600,
            color: "#64748b",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            padding: "6px 0",
          }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 17,
            fontWeight: 700,
            color: "#0f172a",
          }}
        >
          X'perienced
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={handleLike}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "7px 14px",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              border: `1.5px solid ${liked ? "#fecdd3" : "#f1f5f9"}`,
              background: liked ? "#fff1f2" : "#fff",
              color: liked ? "#e11d48" : "#64748b",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}
          >
            <Heart
              size={14}
              fill={liked ? "#e11d48" : "none"}
              stroke={liked ? "#e11d48" : "currentColor"}
            />
            {likes.length}
          </button>

          <button
            onClick={handleSave}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "7px 14px",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              border: `1.5px solid ${saved ? "#e2e8f0" : "#f1f5f9"}`,
              background: saved ? "#f1f5f9" : "#fff",
              color: saved ? "#0f172a" : "#64748b",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}
          >
            <Bookmark
              size={14}
              fill={saved ? "#0f172a" : "none"}
              stroke={saved ? "#0f172a" : "currentColor"}
            />
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "28px 20px",
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: 24,
          alignItems: "start",
        }}
      >
        <div>
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #f1f5f9",
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              marginBottom: 16,
            }}
          >
            {outcome && <div style={{ height: 4, background: outcome.dot }} />}

            <div style={{ padding: "24px 28px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  marginBottom: 20,
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <img
                    src={`https://logo.clearbit.com/${post.company?.toLowerCase()}.com`}
                    alt="logo"
                    className="w-12 h-12 rounded-full border object-contain bg-white p-1"
                    onError={(e) => {
                      e.target.src =
                        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                    }}
                  />
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: "linear-gradient(135deg,#f1f5f9,#e2e8f0)",
                      display: "none",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                    }}
                  >
                    🏢
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <h1
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#0f172a",
                      margin: 0,
                      marginBottom: 6,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                    }}
                  >
                    {post.title}
                  </h1>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#334155",
                      }}
                    >
                      {post.company}
                    </span>
                    {post.role && (
                      <>
                        <span style={{ color: "#cbd5e1" }}>▸</span>
                        <span style={{ fontSize: 14, color: "#64748b" }}>
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
                    gap: 8,
                    alignItems: "flex-end",
                    flexShrink: 0,
                  }}
                >
                  {outcome && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        fontWeight: 700,
                        padding: "5px 12px",
                        borderRadius: 20,
                        background: outcome.bg,
                        color: outcome.color,
                      }}
                    >
                      <div
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: outcome.dot,
                        }}
                      />
                      {outcome.label}
                    </div>
                  )}
                  {diffStyle && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: 20,
                        background: diffStyle.bg,
                        color: diffStyle.color,
                        letterSpacing: "0.04em",
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
                  flexWrap: "wrap",
                  background: "#f8fafc",
                  borderRadius: 14,
                  padding: "10px 16px",
                  alignItems: "center",
                }}
              >
                {[
                  {
                    icon: <Briefcase size={12} color="#94a3b8" />,
                    label: post.yoe || "Fresher",
                  },
                  {
                    icon: <Eye size={12} color="#94a3b8" />,
                    label: `${post.views?.length || 0} views`,
                  },
                  {
                    icon: <MessageCircle size={12} color="#94a3b8" />,
                    label: `${post.comments?.length || 0} comments`,
                  },
                  post.package
                    ? {
                        icon: <TrendingUp size={12} color="#22c55e" />,
                        label: post.package,
                        color: "#15803d",
                        bold: true,
                      }
                    : null,
                ]
                  .filter(Boolean)
                  .map((item, i, arr) => (
                    <div
                      key={i}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          fontSize: 12,
                          color: item.color || "#64748b",
                          fontWeight: item.bold ? 700 : 500,
                          padding: "0 14px",
                        }}
                      >
                        {item.icon}
                        {item.label}
                      </div>
                      {i < arr.length - 1 && (
                        <div
                          style={{
                            width: 1,
                            height: 16,
                            background: "#e2e8f0",
                          }}
                        />
                      )}
                    </div>
                  ))}

                <div style={{ width: 1, height: 16, background: "#e2e8f0" }} />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "0 14px",
                  }}
                >
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: 12,
                        color: s <= rating ? "#f59e0b" : "#e2e8f0",
                      }}
                    >
                      ★
                    </span>
                  ))}
                  <span
                    style={{ fontSize: 11, color: "#94a3b8", marginLeft: 2 }}
                  >
                    {rating}/5
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #f1f5f9",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              overflow: "hidden",
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", borderBottom: "1px solid #f1f5f9" }}>
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    padding: "14px 24px",
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    border: "none",
                    background: "none",
                    color: activeTab === tab.key ? "#0f172a" : "#94a3b8",
                    borderBottom: `2px solid ${activeTab === tab.key ? "#0f172a" : "transparent"}`,
                    transition: "all 0.15s",
                    marginBottom: -1,
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div style={{ padding: "24px 28px" }}>
              {activeTab === "experience" && (
                <div
                  style={{ fontSize: 15, color: "#334155", lineHeight: 1.8 }}
                  dangerouslySetInnerHTML={{
                    __html: post.text || "<p>No content</p>",
                  }}
                />
              )}
              {activeTab === "tips" && (
                <div
                  style={{
                    fontSize: 15,
                    color: "#334155",
                    lineHeight: 1.8,
                    whiteSpace: "pre-line",
                  }}
                >
                  {post.prepTips}
                </div>
              )}
              {activeTab === "questions" && (
                <div
                  style={{
                    fontSize: 15,
                    color: "#334155",
                    lineHeight: 1.8,
                    whiteSpace: "pre-line",
                  }}
                >
                  {post.questions}
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #f1f5f9",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "18px 28px",
                borderBottom: "1px solid #f8fafc",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <MessageCircle size={16} color="#64748b" />
              <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>
                {post.comments?.length || 0} Comments
              </span>
            </div>

            <div
              style={{
                padding: "16px 28px",
                borderBottom: "1px solid #f8fafc",
                display: "flex",
                gap: 10,
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: avatarColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                {currentUser?.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div style={{ flex: 1, position: "relative" }}>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleComment();
                    }
                  }}
                  placeholder="Add a comment… (Enter to post)"
                  rows={2}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1.5px solid #f1f5f9",
                    borderRadius: 12,
                    fontSize: 13,
                    fontFamily: "inherit",
                    color: "#0f172a",
                    background: "#f8fafc",
                    outline: "none",
                    resize: "none",
                    boxSizing: "border-box",
                    lineHeight: 1.6,
                    transition: "border-color 0.15s",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#94a3b8";
                    e.target.style.background = "#fff";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#f1f5f9";
                    e.target.style.background = "#f8fafc";
                  }}
                />
              </div>
              <button
                onClick={handleComment}
                disabled={!text.trim() || submitting}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  border: "none",
                  background: text.trim() ? "#0f172a" : "#f1f5f9",
                  color: text.trim() ? "#fff" : "#94a3b8",
                  cursor: text.trim() ? "pointer" : "default",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.15s",
                }}
              >
                <Send size={14} />
              </button>
            </div>

            <div style={{ padding: "8px 28px 20px" }}>
              {post.comments?.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "32px 0",
                    color: "#cbd5e1",
                    fontSize: 13,
                  }}
                >
                  No comments yet — be the first!
                </div>
              ) : (
                [...(post.comments || [])]
                  .reverse()
                  .map((c) => (
                    <CommentItem
                      key={c._id}
                      comment={c}
                      postId={id}
                      postUser={post.user?._id}
                      updatePost={setPost}
                    />
                  ))
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            position: "sticky",
            top: 80,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              border: "1px solid #f1f5f9",
              padding: "20px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#94a3b8",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Posted by
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: avatarColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {post.user?.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <div
                  style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}
                >
                  {post.user?.name || "Anonymous"}
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>
                  {new Date(post.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>

          {rounds.length > 0 && (
            <div
              style={{
                background: "#fff",
                borderRadius: 18,
                border: "1px solid #f1f5f9",
                padding: "20px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#94a3b8",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Interview Rounds · {rounds.length}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {rounds.map((r, i) => {
                  const c = roundColors[i % roundColors.length];
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 12px",
                        borderRadius: 12,
                        background: c.bg,
                        border: `1px solid ${c.border}`,
                      }}
                    >
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: c.color,
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 10,
                          fontWeight: 800,
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </div>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: c.color,
                        }}
                      >
                        {r}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tags.length > 0 && (
            <div
              style={{
                background: "#fff",
                borderRadius: 18,
                border: "1px solid #f1f5f9",
                padding: "20px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#94a3b8",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Tags
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {tags.map((t, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      padding: "5px 12px",
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
            </div>
          )}

          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              border: "1px solid #f1f5f9",
              padding: "20px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#94a3b8",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Stats
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {[
                {
                  icon: <Heart size={14} color="#e11d48" />,
                  val: likes.length,
                  label: "Likes",
                },
                {
                  icon: <Eye size={14} color="#0369a1" />,
                  val: post.views?.length || 0,
                  label: "Views",
                },
                {
                  icon: <MessageCircle size={14} color="#7c3aed" />,
                  val: post.comments?.length || 0,
                  label: "Comments",
                },
                {
                  icon: <Star size={14} color="#f59e0b" />,
                  val: `${rating}/5`,
                  label: "Rating",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "12px 8px",
                    borderRadius: 12,
                    background: "#f8fafc",
                    border: "1px solid #f1f5f9",
                    gap: 4,
                  }}
                >
                  {s.icon}
                  <div
                    style={{ fontSize: 16, fontWeight: 800, color: "#0f172a" }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "#94a3b8",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}