import Layout from "./../components/Layout/Layout";
import React from "react";

const Policy = () => {
  return (   <div className="categoryss">  
    <Layout title={"Privacy Policy"}><h1 style={{height:"130px"}}></h1> 
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h4>
E-mart is committed to protecting your privacy. We collect personal information such as your name, email,
 and payment details to provide and improve our services, communicate with you, and enhance security. Your data is safeguarded with strong
  security measures and is shared only with trusted service providers and for legal compliance when necessary. You have the right to access,
   update, delete your data, and opt-out of marketing communications. We use cookies to enhance your experience,
 and by using E-mart, you agree to this privacy policy. For any concerns, contact us at support@e-mart.com.</h4>
          
        </div>
      </div>
    </Layout></div>
  );
};

export default Policy;
