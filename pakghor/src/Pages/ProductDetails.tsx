import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import "./ProductDetails.css";

interface Card {
  _id: string;
  title: string;
  subtitle: string;
  body: string;
  image: string;
  indicator: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Card | null>(null);

  useEffect(() => {
    // fetch(`http://localhost:5000/api/cards/${id}`)

    fetch(`https://pakghor-final-658f.vercel.app/api/cards/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p className="loading">Loading...</p>;

  return (
    <div className="product-wrapper">
      <section className="product-card">
        <h1 className="product-title">{product.title}</h1>
        <h4 className="product-subtitle">{product.subtitle}</h4>

        <span className="product-badge">✨ {product.indicator}</span>

        <img src={product.image} alt={product.title} className="product-img" />

        <p className="product-desc">{product.body}</p>

        <button className="product-btn">
          <PaperAirplaneIcon className="product-icon" />
          Order Now
        </button>
      </section>
    </div>
  );
};

export default ProductDetails;
