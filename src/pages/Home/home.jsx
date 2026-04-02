import { useEffect, useState } from "react";
import useTheme from "../../app/theme/theme-context";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../providers/reducer/Products/products";
import Loading from "../../app/components/Layout/Loading/Loading";
import Box from "@mui/material/Box";
import iphone1 from "../../app/assets/dde156768866e096de511779e65c7299-removebg-preview.png";
import iphone2 from "../../app/assets/iphon2.png";
import cloth from "../../app/assets/bab5383ed16c1f082e3a26be99731221-removebg-preview.png";
import CarouselMenu from "../../app/components/ui/carusel";
import { Carousel } from "antd";
import AppleIcon from "@mui/icons-material/Apple";
import { ArrowLeft, ArrowRight, Shirt } from "lucide-react";
import Time from "../../app/components/ui/time";
import Button from "@mui/material/Button";
import BannerCategory from "../../app/components/ui/bannerCategory";
import Features from "../../app/components/ui/features";
import Arival from "../../app/components/ui/arival";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Product from "../../app/components/ui/products";
import Categories from "../../app/components/ui/categories";

export default function Home() {
  const { theme } = useTheme();
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [ratings, setRatings] = useState({});

  const limit = 6;
  const products = useSelector((store) => store.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getProducts()).finally(() => setLoading(false));
  }, [dispatch]);

  const handleNext = () => {
    if (start + limit < (products?.length || 0)) {
      setStart((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (start > 0) {
      setStart((prev) => prev - 1);
    }
  };

  const sortedProducts = Array.isArray(products)
    ? [...products].sort((a, b) => new Date(b.dateAt) - new Date(a.dateAt))
    : [];

  useEffect(() => {
    if (products?.length) {
      const obj = {};
      products?.forEach((product) => {
        obj[product.productId] = Math.floor(Math.random() * 5) + 1;
      });
      setRatings(obj);
    }
  }, [products]);

  if (loading) {
    return <Loading />;
  }
  return (
    <Box className="pb-20 pt-0 md:pt-10 max-w-[1248px] mx-auto">
      <Box className="md:flex block gap-10 items-center">
        <Box className="flex md:flex-col flex-wrap gap-3 py-6 border-r-0 md:border-r-2 pr-6">
          {[
            "Woman's Fashion",
            "Men's Fashion",
            "Electronics",
            "Home & Lifestyle",
            "Medicine",
            "Sports & Outdoor",
            "Baby's & Toys",
            "Groceries & Pets",
            "Health & Beauty",
          ].map((item, i) => (
            <p
              key={i}
              className={`relative text-[16px] cursor-pointer px-4 py-2 rounded-md transition-all duration-200 ${theme ? "bg-gray-800 text-white dark:hover:bg-blue-900 hover:text-blue-400 " : "bg-gray-100 text-black hover:bg-blue-100 hover:text-blue-600"} flex items-center justify-between`}
            >
              {item}
              {(i === 0 || i === 1) && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mt-[2px] ml-[3px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              )}
            </p>
          ))}
        </Box>
        <Box className="w-full md:w-[70%]">
          <Carousel
            className="w-full max-w-[980px] mx-auto"
            autoplay={{ dotDuration: true }}
            autoplaySpeed={3000}
          >
            <CarouselMenu
              icon={
                <AppleIcon className="!text-[40px] md:!text-[60px] text-white" />
              }
              title="iPhone 14 Series"
              subtitle="Up to 10% off Voucher"
              imgSrc={iphone1}
            />
            <CarouselMenu
              icon={
                <AppleIcon className="!text-[40px] md:!text-[60px] text-white" />
              }
              title="iPhone 17 Promax"
              subtitle="Make your dreams come true."
              imgSrc={iphone2}
            />
            <CarouselMenu
              icon={
                <Shirt className="!text-[40px] md:!text-[60px] text-white" />
              }
              title="Winter coat"
              subtitle="On sale at 15% off"
              imgSrc={cloth}
            />
          </Carousel>
        </Box>
      </Box>

      <Box className="flex justify-between px-10 pt-20 items-center flex-col md:flex-row">
        <Time />
        <Box className="flex">
          <Button onClick={handlePrev} disabled={start === 0}>
            <ArrowLeft />
          </Button>
          <Button
            onClick={handleNext}
            disabled={start + limit > (products?.length || 0)}
          >
            <ArrowRight />
          </Button>
        </Box>
      </Box>
      <Box className="flex justify-center px-10 pt-5 pb-3">
        <Box className="flex justify-center gap-4 pl-20">
          {sortedProducts.length > 0 ? (
            sortedProducts.slice(start, start + limit).map((el, i) => {
              const isHovered = hoveredId === el.productId;
              return (
                <Link to={`/product/get-product-by-id/${el.productId}`} key={el.productId}>
                  <Product
                    el={el}
                    setHoveredId={setHoveredId}
                    isHovered={isHovered}
                    ratings={ratings}
                    i={i}
                  />
                </Link>
              );
            })
          ) : (
            <Box>
              <Typography color="error" variant="h6">
                Not Product avilable
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Box className="pt-10 px-10">
        <Categories />
      </Box>
      <BannerCategory />
      <Box className="py-12">
        <Box className="flex flex-col px-10">
          <div className="flex flex-col md:flex-row gap-[10px] items-center mb-6">
            <div className="border-[#DB4444] border-[1px] bg-[#DB4444] w-[20px] h-[40px] rounded-md shadow-md" />
            <h1 className="text-[#DB4444] text-[20px] font-semibold">
              Our Products
            </h1>
          </div>
          <div className="flex justify-between flex-col md:flex-row">
            <h1 className="w-[180px] md:w-auto text-[36px] font-bold mb-6">
              Explore Our Products
            </h1>
          </div>
          <Box className="flex gap-6 flex-wrap justify-center">
            {products?.length > 0 ? (
              products.map((el) => {
                const isHovered = hoveredId === el.productId;
                return (
                  <Link to={`/product/get-product-by-id/${el.productId}`} key={el.productId}>
                    <Product
                      el={el}
                      setHoveredId={setHoveredId}
                      isHovered={isHovered}
                      ratings={ratings}
                    />
                  </Link>
                );
              })
            ) : (
              <Box>
                <Typography color="error" variant="h6">
                  Not Product available
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Arival />
      <Features />
    </Box>
  );
}
