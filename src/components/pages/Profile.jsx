import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userImage from "../../images/Profile_Pic/Group 5227.png";
import coverImage from "../../images/draw2.webp";
import logo from "../../images/GR_tech_logo/GRTECH PAYMENT Final-2.png";
import { CompleteProfile } from "../../networkcalls/ClientApi";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import { ThreeDots } from "react-loader-spinner";

const Profile = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const image = userImage;
  // to change state of pic-
  const [profilePic, setProfilePic] = useState(image);
  // to upload pic in dataBase -
  const [profilephoto, setProfilePhoto] = useState();
  let mobile = sessionStorage.getItem("mobile");

  const [emailError, setEmailError] = useState();
  const [fnameErrorMessage, setFnameErrorMessage] = useState();
  const [imageErrorMessage, setImageErrorMessage] = useState();

  const setImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result != null) {
        setProfilePic(reader.result.toString());
      }
    };
    setProfilePhoto(file);
    setImageErrorMessage("");
  };

  const [data, setData] = useState({
    email: "",
    fullname: "",
    refernumber: "",
    mobilenumber: "",
  });

  function handleChange(e) {
    e.preventDefault();
    if (!/^[a-zA-Z ]*$/.test(data.fullname)) {
      setFnameErrorMessage("Only alphabets are allowed!");
    } else {
      setFnameErrorMessage("");
    }
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    setEmailError("");
  }

  const submit = async (e) => {
    e.preventDefault();
    let validate = true;
    var formData = new FormData();
    formData.append("email", data.email);
    formData.append("fullname", data.fullname);
    formData.append("refernumber", data.refernumber);
    formData.append("mobileNumber", mobile);
    formData.append("profilephoto", profilephoto);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    if (!profilephoto?.name?.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
      setImageErrorMessage("Please select valid image");
      validate = false;
    }
    if (data.fullname === "") {
      setFnameErrorMessage("Please enter your full name.");
      validate = false;
    }
    // if (!/^[a-zA-Z]+[a-zA-Z]+[a-zA-Z]$/.test(data.fullname)) {
    //   setFnameErrorMessage("Please enter valid full name.");
    //   validate = false;
    // }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
      setEmailError("Please enter valid email");
      validate = false;
    }
    if (validate) {
      setEmailError("");
      setFnameErrorMessage("");
      setImageErrorMessage("");

      let clientData = sessionStorage.getItem("clientData");
      setLoading(true);
      CompleteProfile(formData, config).then(
        (res) => {
          console.log(res);
          sessionStorage.setItem("clientCode", res?.result?.code);
          sessionStorage.setItem("panVerify", res?.result?.panVerify);
          sessionStorage.setItem("fullname", res?.result?.fullname);
          JSON.stringify(sessionStorage.setItem("clientData", res.result));
          if (res.status === 200) {
            console.log("Message from Server" + JSON.stringify(res));
            setLoading(false);
            swal(
              `Profile Created Successfully!`,
              "Please Go ahead with KYC validation!",
              "success"
            ).then((willdelete) => {
              if (willdelete) {
                navigate("/kyc");
              }
            });
          } else if (res.status === 500) {
            swal("Failure!!", res.message, "warning").then(setLoading(false));
          } else if (res.status === 300) {
            swal("Failure!!", res.message, "warning").then(setLoading(false));
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
    <div>
      <section className="mt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-7 my-auto">
              <img src={coverImage} className="img-fluid" alt="" />
            </div>
            <div className="col-lg-3 card p-4 mb-3">
              <div className="">
                <div className="mb-2">
                  <img src={logo} alt="" style={{ height: "30px" }} />
                </div>
                <h4>Complete your Profile</h4>
                <p>To complete your profile, please fill the below details </p>
              </div>
              <form>
                <div className="form-outline mb-4">
                  <img
                    src={profilePic}
                    alt="image"
                    type="file"
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                    }}
                  />
                  <br />
                  <br />
                  <label htmlFor="" className="mb-2">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    autoComplete="false"
                    className="form-control"
                    onChange={setImage}
                  />
                  <span className="text-danger">{imageErrorMessage}</span>
                </div>
                <div className="form-outline mb-4">
                  <label htmlFor="">Enter Full Name</label>
                  <input
                    type="text"
                    id="fullname"
                    autoComplete="false"
                    className="form-control form-control"
                    placeholder="Example:. David Jones"
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="text-danger"> {fnameErrorMessage}</span>
                </div>
                <div className="form-outline mb-4">
                  <label htmlFor="">Enter Email Address</label>
                  {/* <span className="text-danger" style={{fontWeight:1200}}>*</span> */}
                  <input
                    type="email"
                    id="email"
                    autoComplete="false"
                    className="form-control form-control"
                    placeholder="Example:. davidjones123@gmail.com"
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="text-danger"> {emailError}</span>
                </div>
                <div className="form-outline mb-4">
                  <label htmlFor="">Enter Mobile Number</label>
                  <input
                    type="number"
                    id="mobilenumber"
                    autoComplete="false"
                    className="form-control form-control"
                    placeholder="Example:. 9091929394"
                    onChange={(e) => handleChange(e)}
                    value={!null ? mobile : ""}
                    disabled
                  />
                </div>
                <div className="form-outline mb-4">
                  <label htmlFor="">Enter Referral Number</label>
                  <input
                    type="number"
                    id="refernumber"
                    autoComplete="false"
                    className="form-control form-control"
                    placeholder="Example:. 9091929394"
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
                      className=" text-uppercase gradient_class btn btn-block"
                      type="button"
                      onClick={submit}
                    >
                      {" "}
                      Save And Proceed{" "}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
