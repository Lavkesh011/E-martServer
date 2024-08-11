import DropIn from "braintree-web-drop-in-react";
import Layout from "./../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.js";
import { useCart } from "../context/cart.js";

  
 import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(true); // Toggle state
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("https://e-martserver.onrender.com/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("https://e-martserver.onrender.com/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Toggle Cart Summary visibility
  const toggleSummary = () => {
    setShowSummary(!showSummary);
  };

  return (
    <div className="cart-page">
      <Layout> 


        <div className="row">
          <div className="col-md-12">
            <h1
              className="text-center p-2 mb-1"
              style={{ color: "black", fontSize: "60px" }}
            >
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p
                className="text-center"
                style={{ color: "black", fontSize: "40px" }}
              >
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>

               

            




        <div className="container11"> 
          <div className="row"><div className="col-md-1"></div>
            <div className="col-md-6">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`https://e-martserver.onrender.com/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price : {p.price}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

<div className="col-md-1"></div>

               <div className="col-3"  >
              <button
                className="payment_card "
                onClick={toggleSummary}
              >
                {showSummary ? "Hide Payment" : "Show Payment"}
              </button>
              {showSummary && (<div className="flex11">
               
                  <h2>Cart Summary</h2>
                  <p>Total | Checkout | Payment</p>
                  <hr />
                  <h4>Total : {totalPrice()} </h4>
                  {auth?.user?.address ? (
                    <>
                      <div className="mb-4">
                        <h4>Current Address</h4>
                        <h5>{auth?.user?.address}</h5>
                        <button
                          className="btn btn-outline-warning"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="mb-4">
                      {auth?.token ? (
                        <button
                          className="btn btn-outline-warning"
                          onClick={() =>
                            navigate("/dashboard/user/profile")
                          }
                        >
                          Update Address
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-warning"
                          onClick={() =>
                            navigate("/login", {
                              state: "/cart",
                            })
                          }
                        >
                          Please Login to checkout
                        </button>
                      )}
                    </div>
                  )}
                  <div className="mt-4">
                    {!clientToken || !auth?.token || !cart?.length ? (
                      ""
                    ) : (
                      <>
                        <DropIn
                          options={{
                            authorization: clientToken,
                            paypal: {
                              flow: "vault",
                            },
                          }}
                          onInstance={(instance) =>
                            setInstance(instance)
                          }
                        />
                        <button
                          className="btn btn-primary"
                          onClick={handlePayment}
                          disabled={
                            loading || !instance || !auth?.user?.address
                          }
                        >
                          {loading
                            ? "Processing ...."
                            : "Make Payment"}
                        </button>
                      </>
                    )}
                  </div>
               
            </div>  )
              }
            </div> 
           
          </div><h1></h1><h1></h1><h1></h1>
        </div>
      </Layout>
    </div>
  );
};

export default CartPage;
