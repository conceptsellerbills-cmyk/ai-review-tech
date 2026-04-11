"use client"
import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

interface Comment {
  id: string
  name: string
  body: string
  created_at: string
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return "just now"
  if (m < 60) return m + "m ago"
  const h = Math.floor(m / 60)
  if (h < 24) return h + "h ago"
  return Math.floor(h / 24) + "d ago"
}

export function ArticleComments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState("")
  const [body, setBody] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    loadComments()
  }, [slug])

  async function loadComments() {
    const supabase = getSupabase()
    if (!supabase) return
    const { data } = await supabase
      .from("ai_comments")
      .select("id, name, body, created_at")
      .eq("slug", slug)
      .order("created_at", { ascending: true })
    if (data) setComments(data)
  }

  async function submitComment(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !body.trim()) return
    setSubmitting(true)
    setError("")
    setSuccess(false)

    const supabase = getSupabase()
    if (!supabase) { setError("Comments unavailable."); setSubmitting(false); return }

    const { error: err } = await supabase
      .from("ai_comments")
      .insert({ slug, name: name.trim(), body: body.trim() })

    if (err) {
      setError("Failed to post comment. Please try again.")
    } else {
      setSuccess(true)
      setBody("")
      await loadComments()
      setTimeout(() => setSuccess(false), 3000)
    }
    setSubmitting(false)
  }

  return (
    <div className="comments-section">
      <h2 className="comments-title">
        {comments.length > 0 ? comments.length + " Comment" + (comments.length !== 1 ? "s" : "") : "Comments"}
      </h2>

      {comments.length === 0 && (
        <p className="comments-empty">No comments yet. Be the first to share your thoughts.</p>
      )}

      {comments.length > 0 && (
        <div className="comments-list">
          {comments.map((c) => (
            <div key={c.id} className="comment-item">
              <div className="comment-header">
                <span className="comment-name">{c.name}</span>
                <span className="comment-time">{timeAgo(c.created_at)}</span>
              </div>
              <p className="comment-body">{c.body}</p>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={submitComment} className="comment-form">
        <h3 className="comment-form-title">Leave a Comment</h3>
        {error && <p className="comment-error">{error}</p>}
        {success && <p className="comment-success">Comment posted!</p>}
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={50}
          required
          className="comment-name-input"
        />
        <textarea
          placeholder="Share your thoughts..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={1000}
          rows={4}
          required
          className="comment-body-input"
        />
        <button type="submit" disabled={submitting} className="comment-submit">
          {submitting ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  )
}
