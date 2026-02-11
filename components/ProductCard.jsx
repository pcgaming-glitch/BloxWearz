export default function ProductCard({ product }) {
  const isSoon = new Date(product.release_date) > new Date();

  return (
    <a href={`/shop/${product.id}`} className="product-card">
      <img src={product.image} className="product-img" />

      <h3>{product.name}</h3>
      <p>{product.category}</p>

      {isSoon ? (
        <span className="soon-badge">SOON</span>
      ) : (
        <strong>${product.price}</strong>
      )}
    </a>
  );
}
