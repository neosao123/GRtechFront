import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/GR_tech_logo/GRTECH PAYMENT Final-2.png";
import { LoginWithOtp } from "../../networkcalls/ClientApi";
import swal from "sweetalert";
import { ThreeDots } from "react-loader-spinner";

const Login = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState();

  const [data, setData] = useState({
    mobile: "",
    refmobile: "",
  });

  function handleChange(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  const submit = async (e) => {
    e.preventDefault();
    let validate = true;
    if (data.mobile === "") validate = false;
    if (
      !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-.]?([0-9]{4})$/.test(data.mobile)
    ) {
      setPhoneErrorMessage("Please enter valid mobile number");
      validate = false;
      setLoading = false;
    }

    if (validate) {
      setPhoneErrorMessage("");
      setLoading(true);
      await LoginWithOtp(data).then(
        (res) => {
          sessionStorage.setItem("mobile", res.mobile);
          if (res.status === 200) {

            setLoading(false);
            swal(
              "OTP was sent successfully!",
              "check your phone!",
              "success"
            ).then((willdelete) => {
              if (willdelete) {
                navigate("/otpverification");
              }
            });
          } else {
            setLoading(false);
            swal("Failure!!", res.message, "warning");
          }
        },
        (err) => {
          swal("Failure!!", "Something went wrong!..", "error").then(
            setLoading(false)
          );
        }
      );
    }
  };

  return (
    <section className="d-flex align-items-center vh-100 justify-content-center">
      <div className="container">
        <div className="row g-0">
          <div className="col-lg-4"></div>
          <div className="col-lg-4 card rounded-3  p-4">
            <div className="App mb-3 mt-2">
              <img src={logo} alt="" style={{ height: "30px" }} />
            </div>
            <div className="text-center mt-2 mb-3">
              <h5>Sign In </h5>
            </div>
            <form>
              <div className="form-outline mb-3">
                <label htmlFor="">Enter Mobile Number</label>
                <input
                  type="number"
                  autoComplete="false"
                  className="form-control form-control"
                  placeholder="Example:. 9999988888"
                  id="mobile"
                  autoFocus
                  value={data?.mobile}
                  onChange={(e) => handleChange(e)}
                />
                <span className="text-danger">{phoneErrorMessage}</span>
              </div>
              <div className="form-outline mb-4">
                <label htmlFor="">Refferal Code</label>
                <input
                  type="number"
                  autoComplete="false"
                  className="form-control form-control"
                  placeholder="Example:. 9999988888"
                  id="refmobile"
                  value={data?.refmobile}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="pt-1 mb-4 App d-grid">
                {loading ? (
                  <div className="mx-auto">
                    <ThreeDots />
                  </div>
                ) : (
                  <button
                    className=" gradient_class btn btn-block"
                    type="button"
                    onClick={submit}
                  >
                    {" "}
                    Continue{" "}
                  </button>
                )}
              </div>
            </form>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    </section>
  );
};
export default Login;
