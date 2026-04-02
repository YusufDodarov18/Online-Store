import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Product from "../../app/components/ui/products";
import { useEffect, useState } from "react";

function Search() {
  const { query } = useParams();
  const [ratings, setRatings] = useState({});
  const [hoveredId, setHoveredId] = useState(null);
  const products = useSelector((store) => store.products?.products);

  useEffect(() => {
    if (products?.length) {
      const obj = {};
      products?.forEach((product) => {
        obj[product.productId] = Math.floor(Math.random() * 5) + 1;
      });
      setRatings(obj);
    }
  }, [products]);

  return (
    <div className="py-20 max-w-[1248px] mx-auto">
      <div className="flex justify-around flex-wrap gap-3">
        {products?.filter((product) =>
          product.productName?.toLowerCase().includes(query.toLowerCase()),
        ).length > 0 ? (
          products
            .filter((product) =>
              product.productName?.toLowerCase().includes(query.toLowerCase()),
            )
            .map((product, i) => {
              const isHovered = hoveredId === product.productId;
              return (
                <Link to={`/product/get-product-by-id/${product.productId}`}>
                  <Product
                    el={product}
                    setHoveredId={setHoveredId}
                    isHovered={isHovered}
                    ratings={ratings}
                    i={i}
                  />
                </Link>
              );
            })
        ) : (
          <Typography color="error">No product avilable: "{query}"</Typography>
        )}
      </div>
    </div>
  );
}

export default Search;
