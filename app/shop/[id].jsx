"use client";
import { useEffect, useState } from "react";
import ReviewCard from "@/components/ReviewCard";

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/api/products/get-product", {
      method: "POST",
      body: JSON.stringify({ id: params.id })
    })
      .then((res) => res.json())
      .then((data) => setProduct(data));

    fetch("/api/reviews/get-reviews", {
      method: "POST",
      body: JSON.stringify({ productId: params.id })
    })
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  if (!product) return <p>Loading...</p>;

  const isSoon =
    new Date(product.release_date) > new Date();

  return (
    <div className="product-page">
      <img src={product.image} className="product-img" />

      <h1>{product.name}</h1>
      <p>Category: {product.category}</p>

      {isSoon ? (
        <div className="soon-badge">
          SOON! Releases on {new Date(product.release_date).toLocaleString()}
        </div>
      ) : (
        <h2>${product.price}</h2>
      )}

      <h3>Reviews</h3>
      {reviews.length === 0 && <p>No reviews yet.</p>}

      {reviews.map((r) => (
        <ReviewCard key={r.id} review={r} />
      ))}
    </div>
  );
}
