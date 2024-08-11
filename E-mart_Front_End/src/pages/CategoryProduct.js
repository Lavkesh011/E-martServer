import "../styles/CategoryProductStyles.css";
import Layout from "../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";

 

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart(); // Use the cart context
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `https://e-martserver.onrender.com/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="categoryss">
      <Layout>
        <div className="container mt-0 category">
          <h4 className="text-center">Category - {category?.name}</h4>
          <h6 className="text-center">{products?.length} result(s) found</h6>
          <div className="row">
            <div className="col-md-9 offset-1">
              <div className="d-flex flex-wrap">
                {products?.map((p) => (
                  <div className="card m-2" key={p._id}>
                    <img
                      src={`https://e-martserver.onrender.com/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <div className="card-name-price">
                        <h5 className="card-title">{p.name}</h5>
                        <h5 className="card-title card-price">
                          {p.price.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </h5>
                      </div>
                      <p className="card-text">
                        {p.description.substring(0, 60)}...
                      </p>
                      <div className="card-name-price">
                        <button
                          className="btn btn-info ms-1"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-dark ms-1"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item Added to cart");
                          }}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Add load more button if needed */}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CategoryProduct;
