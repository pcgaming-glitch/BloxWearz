export default function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="stars">
        {"★".repeat(review.stars)}
        {"☆".repeat(5 - review.stars)}
      </div>

      <p>{review.text}</p>

      <small>{new Date(review.created_at).toLocaleDateString()}</small>
    </div>
  );
}
