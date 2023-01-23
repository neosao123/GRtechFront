import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Select, { components } from "react-select";
import swal from "sweetalert";
import userImage from "../../images/Profile_Pic/Group 5227.png";
import uploadimage from "../../images/upload.png";
import {
  getComplainCategories,
  storeComplain,
} from "../../networkcalls/Complain";
import ComplainList from "./ComplainList";
const { Option } = components;
function IconOption(props) {
  const {
    data: { value, label },
  } = props;

  return (
    <Option {...props} value={value}>
      <div className="d-flex align-items-center justify-content-start">
        <span className="">{label}</span>
      </div>
    </Option>
  );
}

const Complain = () => {
  let { state } = useLocation();

  if (state !== null) {
    let { referenceid } = state;
  } else {
    state = "";
  }

  let clientCode = sessionStorage.getItem("clientCode");

  // state provides object from mobile transaction and dth transaction - {referenceId:referenceid}
  const [transactionId, setTransactionId] = useState(state?.referenceId);

  // set Description
  const [description, setDescription] = useState();

  // React-Select - options for services -
  const [selectedService, setSelectedService] = useState();
  const [servicesList, setServicesList] = useState();

  // for image 1, image 2 and image 3 (reference code = profile.jsx) -
  const [picture1, setPicture1] = useState(uploadimage); // picture is in src tag
  const [upPhoto1, setupPhoto1] = useState(); // upPhoto to append formdata
  const [picture2, setPicture2] = useState(uploadimage);
  const [upPhoto2, setupPhoto2] = useState();
  const [picture3, setPicture3] = useState(uploadimage);
  const [upPhoto3, setupPhoto3] = useState();

  // set errors
  const [serviceErr, setServiceErr] = useState();
  const [descriptionErr, setDescriptionErr] = useState();
  const [transactionIdErr, setTransactionIdErr] = useState();
  const [imgErr1, setImgErr1] = useState();
  const [imgErr2, setImgErr2] = useState();
  const [imgErr3, setImgErr3] = useState();

  //loader
  const loader = document.querySelector("div.loader");

  //code started
  //.match(/\.(jpg|jpeg|png|gif)$/)

  const setImage1 = (e) => {
    const file = e.target.files[0];
    if ((file.type.slice(6) === "png") | "jpg" | "jpeg" | "gif") {
      setImgErr1("");
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result != null) {
          setPicture1(reader.result.toString());
        }
      };
      setupPhoto1(file);
    } else {
      setImgErr1("Please select image of png,jpg,jpeg,gif format");
    }
  };

  const setImage2 = (e) => {
    const file = e.target.files[0];
    if ((file.type.slice(6) === "png") | "jpg" | "jpeg" | "gif") {
      setImgErr2("");
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result != null) {
          setPicture2(reader.result.toString());
        }
      };
      setupPhoto2(file);
    } else {
      setImgErr2("Please select image of png,jpg,jpeg,gif format");
    }
  };

  const setImage3 = (e) => {
    const file = e.target.files[0];
    if ((file.type.slice(6) === "png") | "jpg" | "jpeg" | "gif") {
      setImgErr3("");
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result != null) {
          setPicture3(reader.result.toString());
        }
      };
      setupPhoto3(file);
    } else {
      setImgErr3("Please select image of png,jpg,jpeg,gif format");
    }
  };

  // get complain categories API
  useEffect(() => {
    getComplainCategories().then(
      (res) => {
        // console.log(res.result);
        var result = res?.result;
        var servicesLive = [];
        result.forEach((element) => {
          var nm = element.categoryTitle.toLowerCase();
          servicesLive.push({
            value: element.categoryCode,
            label: element.categoryTitle,
          });
        });
        setServicesList(servicesLive);
      },
      (err) => {}
    );
  }, []);

  // handle for React Select
  function handleService(e) {
    setSelectedService(e.value);
    setDescriptionErr("");
    setServiceErr("");
    setTransactionIdErr("");
  }
  if (upPhoto1 === undefined) {
    setupPhoto1("");
  }
  if (upPhoto2 === undefined) {
    setupPhoto2("");
  }
  if (upPhoto3 === undefined) {
    setupPhoto3("");
  }

  const submit = (e) => {
    e.preventDefault();
    let validate = true;

    if (
      selectedService === null ||
      selectedService === "" ||
      selectedService === undefined
    ) {
      setServiceErr("Please select service");
      validate = false;
    }
    if (
      description === "" ||
      description?.length < 50 ||
      description === undefined
    ) {
      setDescriptionErr("The description must be at least 50 characters ");
      validate = false;
    }
    if (selectedService !== "CAT_14" || selectedService === undefined) {
      if (transactionId === undefined) {
        setTransactionIdErr("Please enter transactionid");
        validate = false;
      }
    }

    if (validate) {
      //form data
      setDescriptionErr("");
      setServiceErr("");
      setTransactionIdErr("");
      var formData = new FormData();
      formData.append("clientCode", clientCode);
      formData.append("categoryCode", selectedService);
      formData.append("transactionNumber ", transactionId);
      formData.append("description", description);

      formData.append("imageOne", upPhoto1);
      formData.append("imageTwo", upPhoto2);
      formData.append("imageThree", upPhoto3);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      console.log("transactionNumber ", transactionId);

      loader.classList.remove("d-none");
      storeComplain(formData, config).then(
        (res) => {
          loader.classList.add("d-none");
          if (res.status === 200) {
            swal("Success", res.message, "success").then((ok) => {
              if (ok) {
                window.location.reload();
              }
            });
          } else {
            swal("Warning", res.message, "warning");
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  return (
    <div>
      <div className="container mb-5" id="unloader">
        <div className="row mt-3 mb-3 ms-1">
          <div className="col-md-6 col-6">
            <h4 className=" text-success">Raise complains</h4>
          </div>
          <div className="col-md-6 col-6 text-end"></div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <form
              className="card p-4"
              style={{
                boxShadow: "#00000012 0pt 2pt 8pt",
                backgroundColor: "#FFFFFF",
              }}
            >
              <h5 className="text-success ms-2 ">Raise a complain</h5>
              <div className="mb-3 mt-2">
                {/* Services dropdown */}
                <div className="input-group mb-1 ms-2">
                  <label>Services</label> &nbsp;
                  <br />
                </div>
                <Select
                  options={servicesList}
                  placeholder={
                    <div className="select-placeholder-text">
                      Select service
                    </div>
                  }
                  value={servicesList?.find((obj) => obj === selectedService)}
                  onChange={handleService}
                  isSearchable={true}
                />

                <div className="text-danger">{serviceErr}</div>
              </div>

              {/* Transaction Id or reference Id */}
              <div className="mb-3">
                <div className="input-group mb-1 ms-2">
                  <label>Transaction Id</label> &nbsp;
                  <br />
                </div>
                <input
                  type="text"
                  value={transactionId}
                  placeholder="Enter transaction id"
                  className="form-control"
                  onChange={(e) => setTransactionId(e.target.value)}
                />

                <div className="text-danger">{transactionIdErr}</div>
              </div>

              {/* Description */}
              <div className="mb-3">
                <div className="input-group mb-1 ms-2">
                  <label>Description</label> &nbsp;
                  <br />
                </div>
                <textarea
                  rows="4"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                  cols="60"
                  name="text"
                  placeholder="Enter querry"
                ></textarea>

                <div className="">
                  <span className="text-danger text-start">
                    {descriptionErr}
                  </span>{" "}
                  <div className="text-end text-light" disabled>
                    remainingWords
                  </div>
                </div>
              </div>

              {/* Image 1 */}
              <div className="form-outline mb-4">
                <img
                  src={picture1}
                  alt="image"
                  type="file"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
                <br />
                <br />
                <label htmlFor="" className="input-group mb-1 ms-2">
                  Upload screenshot 1
                </label>
                <input
                  type="file"
                  autoComplete="false"
                  className="form-control"
                  onChange={setImage1}
                />
                <span className="text-danger">{imgErr1}</span>
              </div>

              {/* Image 2 */}
              <div className="form-outline mb-4">
                <img
                  src={picture2}
                  alt="image"
                  type="file"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
                <br />
                <br />
                <label htmlFor="" className="input-group mb-1 ms-2">
                  Upload screenshot 2
                </label>
                <input
                  type="file"
                  autoComplete="false"
                  className="form-control"
                  onChange={setImage2}
                />
                <span className="text-danger">{imgErr2}</span>
              </div>

              {/* Image 3 */}
              <div className="form-outline mb-4">
                <img
                  src={picture3}
                  alt="image"
                  type="file"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
                <br />
                <br />
                <label htmlFor="" className="input-group mb-1 ms-2">
                  Upload screenshot 3
                </label>
                <input
                  type="file"
                  autoComplete="false"
                  className="form-control"
                  onChange={setImage3}
                />
                <span className="text-danger">{imgErr3}</span>
              </div>

              {/* submit */}

              <div className="form-outline mb-3">
                <button className="btn w-100 gradient_class" onClick={submit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-8">
            <ComplainList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complain;
