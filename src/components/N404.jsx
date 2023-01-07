import React from "react";
import { Link, useNavigate } from "react-router-dom";

const N404 = () => {
  let navigate = useNavigate();
  return (
    <div>
      404 Not Found <br />
      <br />
      Go back to Login <br /> <br />
      <Link to="/" className="gradient_class btn">
        Login
      </Link>
    </div>
  );
};

export default N404;
