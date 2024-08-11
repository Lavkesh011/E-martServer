import Layout from "../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (<div className="categoryss"> <div style={{height: "170px" }} ></div>
    <Layout title={"All Categories"}> 
      <div className="container" style={{ marginTop: "60px" }}>
        <div className="row container">
          {categories.map((c) => (
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <div className="card"style={{ background : "aqua"}}>
                <Link to={`/category/${c.slug}`} className="btn cat-btn">
                  {c.name}
                </Link>
              </div> 
            </div>
          ))} 
        </div>
      </div>
    </Layout></div>
  );
};

export default Categories;
