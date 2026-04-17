
import { useState } from "react";
import API from "../api/axios";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";

const inputStyle = {
  width: "100%",
  height: 40,
  padding: "0 12px",
  border: "0.5px solid rgba(0,0,0,0.12)",
  borderRadius: 10,
  fontSize: 14,
  fontFamily: "inherit",
  background: "#fafaf9",
  color: "#1a1a1a",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
};

const labelStyle = {
  fontSize: 12,
  fontWeight: 500,
  color: "#888",
  marginBottom: 6,
  display: "block",
};

const sectionStyle = {
  marginBottom: 20,
};

export default function CreateExperience() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [outcome, setOutcome] = useState("pending");
  const [difficulty, setDifficulty] = useState("");
  const [rating, setRating] = useState(0);
  const [yoe, setYoe] = useState("");
  const [pkg, setPkg] = useState("");
  const [roundInput, setRoundInput] = useState("");
  const [rounds, setRounds] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const handleRoundKey = (e) => {
    if (e.key === "Enter" && roundInput.trim()) {
      e.preventDefault();
      setRounds([...rounds, roundInput.trim()]);
      setRoundInput("");
    }
  };

  const removeRound = (i) => setRounds(rounds.filter((_, idx) => idx !== i));

  const handleTagKey = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim().toLowerCase()]);
      setTagInput("");
    }
  };

  const removeTag = (i) => setTags(tags.filter((_, idx) => idx !== i));

  const handleSubmit = async () => {
    if (!title || !company || !role || !content) {
      return alert("Please fill title, company, role and experience");
    }

    try {
      setLoading(true);
      const res = await API.post("/experiences", {
        title,
        company,
        role,
        text: content,
        outcome,
        difficulty,
        rating,
        yoe,
        package: pkg,
        rounds,
        tags,
      });

      navigate(`/post/${res.data._id}`);
    } catch (err) {
      console.log(err);
      alert("Error posting experience");
    } finally {
      setLoading(false);
    }
  };

  const outcomeOptions = [
    { value: "selected", label: "✓ Selected", bg: "#e6f4ee", color: "#1a7a4a" },
    { value: "rejected", label: "✕ Rejected", bg: "#fdecea", color: "#c0392b" },
    { value: "pending", label: "⏳ Pending", bg: "#fef8e7", color: "#b7860b" },
  ];

  const difficultyOptions = ["Easy", "Medium", "Hard", "Very Hard"];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f6f3",
        padding: "40px 24px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 18,
          border: "0.5px solid rgba(0,0,0,0.08)",
          padding: "32px 32px 28px",
        }}
      >
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#1a1a1a",
              marginBottom: 4,
            }}
          >
            Share your experience
          </div>
          <div style={{ fontSize: 13, color: "#aaa" }}>
            Help others prepare by sharing your real interview story
          </div>
        </div>

        <div style={sectionStyle}>
          <label style={labelStyle}>Experience title *</label>
          <input
            style={inputStyle}
            placeholder="e.g. Google SWE Intern Interview 2024"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.3)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.12)")}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <div>
            <label style={labelStyle}>Company *</label>
            <input
              style={inputStyle}
              placeholder="e.g. Google"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.3)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.12)")}
            />
          </div>
          <div>
            <label style={labelStyle}>Role *</label>
            <input
              style={inputStyle}
              placeholder="e.g. SWE Intern"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.3)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.12)")}
            />
          </div>
        </div>

        <div style={sectionStyle}>
          <label style={labelStyle}>Outcome *</label>
          <div style={{ display: "flex", gap: 8 }}>
            {outcomeOptions.map((o) => (
              <button
                key={o.value}
                onClick={() => setOutcome(o.value)}
                style={{
                  padding: "6px 16px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  border:
                    outcome === o.value
                      ? "none"
                      : "0.5px solid rgba(0,0,0,0.12)",
                  background: outcome === o.value ? o.bg : "#fafaf9",
                  color: outcome === o.value ? o.color : "#aaa",
                  transition: "all 0.15s",
                }}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <div>
            <label style={labelStyle}>Difficulty</label>
            <select
              style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">Select</option>
              {difficultyOptions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Experience</label>
            <input
              style={inputStyle}
              placeholder="e.g. Fresher, 2 yrs"
              value={yoe}
              onChange={(e) => setYoe(e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.3)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.12)")}
            />
          </div>
          <div>
            <label style={labelStyle}>Package (if selected)</label>
            <input
              style={inputStyle}
              placeholder="e.g. ₹28 LPA"
              value={pkg}
              onChange={(e) => setPkg(e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.3)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.12)")}
            />
          </div>
        </div>

        <div style={sectionStyle}>
          <label style={labelStyle}>Rate your experience</label>
          <div style={{ display: "flex", gap: 4 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{
                  fontSize: 24,
                  cursor: "pointer",
                  color: star <= rating ? "#f0a500" : "#e0deda",
                  transition: "color 0.1s",
                }}
              >
                ★
              </span>
            ))}
            {rating > 0 && (
              <span
                style={{
                  fontSize: 12,
                  color: "#aaa",
                  alignSelf: "center",
                  marginLeft: 6,
                }}
              >
                {rating}/5
              </span>
            )}
          </div>
        </div>

        <div style={sectionStyle}>
          <label style={labelStyle}>Interview rounds</label>

          <div style={{ display: "flex", gap: 8 }}>
            <input
              style={{ ...inputStyle, flex: 1 }}
              placeholder="e.g. DSA Round, HR Round, System Design"
              value={roundInput}
              onChange={(e) => setRoundInput(e.target.value)}
              onKeyDown={handleRoundKey}
              onFocus={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.3)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.12)")}
            />
            <button
              onClick={() => {
                if (roundInput.trim()) {
                  setRounds([...rounds, roundInput.trim()]);
                  setRoundInput("");
                }
              }}
              style={{
                height: 40,
                padding: "0 16px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "inherit",
                background: "#1a1a1a",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              + Add
            </button>
          </div>

          {rounds.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                marginTop: 10,
              }}
            >
              {rounds.map((r, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    padding: "4px 10px",
                    borderRadius: 20,
                    background: "#f2f1ee",
                    color: "#555",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span style={{ fontSize: 10, color: "#aaa" }}>R{i + 1}</span>
                  {r}
                  <span
                    onClick={() => removeRound(i)}
                    style={{
                      cursor: "pointer",
                      color: "#bbb",
                      fontSize: 13,
                      lineHeight: 1,
                    }}
                  >
                    ×
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>

        <div style={sectionStyle}>
          <label style={labelStyle}>Tags</label>
          <input
            style={inputStyle}
            placeholder="Type tag and press Enter — e.g. google, dsa, intern"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKey}
            onFocus={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.3)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.12)")}
          />
          {tags.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                marginTop: 10,
              }}
            >
              {tags.map((t, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    padding: "4px 10px",
                    borderRadius: 20,
                    background: "#1a1a1a",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  #{t}
                  <span
                    onClick={() => removeTag(i)}
                    style={{
                      cursor: "pointer",
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 13,
                    }}
                  >
                    ×
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>

        <div style={sectionStyle}>
          <label style={labelStyle}>Your experience *</label>
          <div
            style={{
              border: "0.5px solid rgba(0,0,0,0.12)",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <Editor content={content} setContent={setContent} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 20,
            borderTop: "0.5px solid rgba(0,0,0,0.06)",
          }}
        >
          <span style={{ fontSize: 12, color: "#bbb" }}>
            Your story helps someone prepare better ✨
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                height: 38,
                padding: "0 16px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 500,
                fontFamily: "inherit",
                background: "#f2f1ee",
                color: "#666",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                height: 38,
                padding: "0 20px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "inherit",
                background: loading ? "#ccc" : "#1a1a1a",
                color: "#fff",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.15s",
              }}
            >
              {loading ? "Posting..." : "Post experience 🚀"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}