import React, { useEffect } from "react";
import logo from "../images/GR_tech_logo/GRTECH PAYMENT Final-2.png";
import { AiOutlineHome, AiOutlineForm } from "react-icons/ai";
import { SiHiveBlockchain } from "react-icons/si";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModalSearch from "../utils/ModalSearch";
import useCookies from "react-cookie/cjs/useCookies";

const Header = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  let navigate = useNavigate();
  function onhandleClick() {
    sessionStorage.clear();

    setCookie("token", "", { path: "/" });
    navigate("/");
  }
  useEffect(() => {
    if (
      sessionStorage.getItem("client") === null ||
      sessionStorage.getItem("client") === ""
    ) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-light bg-backGround">
        <div className="container">
          <a className="navbar-brand">
            <img src={logo} alt="" style={{ height: "30px" }} />
          </a>

          <div className="d-flex">
            <div className="nav-item dropdown onhoverdropdown">
              <a
                href="#"
                className="nav-link d-flex lh-1 text-reset p-0"
                data-bs-toggle="dropdown"
                aria-label="Open user menu"
              >
                <span
                  className="avatar avatar-sm"
                  style={{ backgroundImage: "url(./static/avatars/000m.jpg)" }}
                ></span>
                <div className="d-none d-xl-block ps-5">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                      style={{ height: "35px" }}
                      className="img-fluid rounded-circle "
                      alt=""
                    />{" "}
                  </div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <Link to="/myprofile" className="dropdown-item">
                  View Profile
                </Link>
                <Link href="#" className="dropdown-item">
                  Update Profile
                </Link>
                <button
                  onClick={(e) => onhandleClick()}
                  className="dropdown-item"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <hr style={{ margin: "0px" }} />
      <nav
        className="navbar navbar-expand-lg p-0"
        style={{ backgroundColor: "#351fd3", color: "white" }}
      >
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item dropdown">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>{" "}
              </li>
              <li className="nav-item dropdown onhoverdropdown">
                <a
                  className="nav-link dropdown"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Recharge
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to="/mobile" className="dropdown-item">
                      Mobile
                    </Link>
                  </li>
                  <li>
                    <Link to="/dth" className="dropdown-item">
                      DTH
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Postpaid
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Fastag
                    </a>
                  </li>
                </ul>
              </li>
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  AEPS
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li> */}
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Help
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li> */}
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  DMT
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li> */}
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  BBPS
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li> */}
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Complaints
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      New Complaints
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Previous Complaints
                    </a>
                  </li>
                </ul>
              </li> */}
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Profile
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link
                      to="/profile/myprofile"
                      className="dropdown-item"
                      href="#"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      PANKYC
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Bank KYC
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Adhaar KYC
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Video KYC
                    </a>
                  </li>
                </ul>
              </li> */}

              <li className="nav-item dropdown onhoverdropdown">
                <a
                  className="nav-link dropdown"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Transactions
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link
                      to="/mobile/transactions"
                      className="dropdown-item"
                      href="#"
                    >
                      Mobile Transactions
                    </Link>
                    <Link
                      to="/dth/transactions"
                      className="dropdown-item"
                      href="#"
                    >
                      DTH Transactions
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            {/* <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form> */}
          </div>
        </div>
      </nav>
      <hr style={{ margin: "0px" }} className="bg-backGround" />{" "}
    </div>
  );
};

export default Header;
