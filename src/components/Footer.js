import React from "react";
import { BsFacebook, BsLinkedin } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="footer-container">
      <div className="brand-name">Bigscreen</div>
      <div className="copyright">&copy; {year}</div>
      <div className="social_icons">
        <div className="facebook">
          <a
            href="https://www.facebook.com/risesumit"
            target="_blank"
            rel="noreferrer"
          >
            <BsFacebook />
          </a>
        </div>
        <div className="instagram">
          {" "}
          <a
            href="https://www.instagram.com/rise_sumit/"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillInstagram />
          </a>
        </div>
        <div className="linkedin">
          <a
            href="https://www.linkedin.com/in/sumitssr/"
            target="_blank"
            rel="noreferrer"
          >
            <BsLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
