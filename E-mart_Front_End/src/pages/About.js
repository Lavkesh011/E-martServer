import Layout from "./../components/Layout/Layout";
import React from "react";

const About = () => {
  return (  <div className="categoryss">
    <Layout title={"About us - Ecommer app"}><h1 style={{height:"130px"}}></h1> 
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h4 className="text-justify mt-2 text-aline">
             E-mart is an innovative online shopping application designed to provide users with a 
             seamless and convenient shopping experience.
              The platform offers a wide range of products across various categories,
               allowing customers to browse, filter, and purchase items with ease.
               With a user-friendly interface, secure payment options, and responsive design,
                E-mart ensures that shoppers can enjoy a hassle-free shopping experience from any device, anytime,
                 anywhere.
          </h4>
        </div>
      </div>
    </Layout></div>
  );
};

export default About;
