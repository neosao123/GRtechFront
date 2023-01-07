import React, { useEffect, useState } from "react";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import {
  browseplan,
  getCircle,
  getOprator,
  getPhoneInfo,
  mobileReacharge,
} from "../../networkcalls/MobileRechargeApi";
import Select, { components } from "react-select";
import ModalSearch from "../../utils/ModalSearch";
import swal from "sweetalert";

const { Option } = components;

function IconOption(props) {
  const {
    data: { value, label, Icon, id },
  } = props;

  return (
    <Option {...props} value={value}>
      <div className="d-flex align-items-center justify-content-start">
        <img src={Icon} id={id} className="optr" />
        <span className="">{label}</span>
      </div>
    </Option>
  );
}

const MobileRecharge = () => {
  const [selectedOprator, setSelectedOprator] = useState();
  const [operator, setOpenOPerator] = useState(false);
  const [operatorList, setOperatorList] = useState();
  const [opencircle, setOpenCircle] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState();
  const [circleList, setCircleList] = useState();
  const loader = document.querySelector("div.loader");
  const message = document.getElementById("message");
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [activeTab, setactiveTab] = useState(false);
  const [amount, setAmount] = useState();
  const [talkTimedesc, setTalkTimeDesc] = useState();
  const [rechargeLoading, setRechargeLoading] = useState(false);
  const [mobileError, setMobileError] = useState();
  const [optError, setOptError] = useState();
  const [circleError, setCircleError] = useState();
  const [validate, setValidate] = useState();
  const [rechargeErr, setRechargeErr] = useState();
  const [amountErr, setAmountErr] = useState();
  const [operatorId, setOperatorId] = useState();
  const [object, setObject] = useState();
  const [BrowseDataResponse, setBrowseDataResponse] = useState(null);

  const [styles, setStyles] = useState("");

  useEffect(() => {
    getOprator().then((data) => {
      //console.log(data.result.map((data) => data.image));
      var result = data.result;
      var operatorsLive = [];
      result.forEach((element) => {
        var nm = element.name.toLowerCase();

        if (nm !== "idea")
          operatorsLive.push({
            value: element.name,
            label: element.name,
            Icon: element.image,
            id: element.id,
          });
      });
      setOperatorList(operatorsLive);
    });

    getCircle().then(
      (data) => {
        var result = data.circle;

        var circleLive = [];
        result.forEach((element) => {
          var cm = element?.toLowerCase();

          if (cm !== "idea")
            circleLive.push({
              value: element,
              label: element,
            });
        });
        setCircleList(circleLive);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  // data send to api
  const [data, setData] = useState({
    mobileNumber: "",
    type: "mobile",
  });

  //data recieve from api
  const [result, setResult] = useState({
    circle: selectedCircle,
    operator: selectedOprator,
  });

  function handleOperator(e) {
    setSelectedOprator(e);
  }

  function handleCircle(e) {
    setSelectedCircle(e);
  }

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  useEffect(() => {
    let mounted = true;
    setMobileError("");
    setCircleError("");
    setOptError("");
    setAmountErr("");
    if (
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-.]?([0-9]{4})$/.test(
        data.mobileNumber
      )
    ) {
      setloading(true);
      loader.classList.remove("d-none");

      // message.innerHTML = `<h3>Geting Circle and Operator</h3>`;
      getPhoneInfo(data).then(
        (res) => {
          loader.classList.add("d-none");
          setResult(res.result[0]);
          setSelectedOprator(res.result[0].operator);
          setSelectedCircle(res.result[0].circle);
          setloading(false);
          mounted = false;
        },
        (err) => {
          mounted = false;
          console.log(err);
        }
      );
    }

    return function cleanup() {
      mounted = false;
    };
  }, [data]);

  const onClickHandle = () => {
    setOpen(true);
    let browsedata = {
      circle: result.circle,
      operator: result.operator,
      mobileNumber: data.mobileNumber,
    };
    // console.log();
    // console.log(operatorList);
    // console.log("object", object);q
    // console.log(browsedata.operator);
    if (
      browsedata.circle === undefined &&
      browsedata.operator === undefined &&
      browsedata.mobileNumber === ""
    ) {
      setValidate(false);
      setMobileError("Please enter mobile number");
      setOptError("Please select operator");
      setCircleError("Please select cricle");
      // setAmountErr("Please enter amount");
    } else {
      setValidate(true);
      loader.classList.remove("d-none");
      // message.innerHTML = `<h3>Geting View Plans</h3>`;
      browseplan(browsedata).then(
        (res) => {
          setMobileError("");
          loader.classList.add("d-none");
          setBrowseDataResponse(res.result);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  const handlePlanAmount = (rs, talkTimedescription) => {
    setAmount(rs);
    setTalkTimeDesc(talkTimedescription);
  };

  let clientCode = sessionStorage.getItem("clientCode");

  const handleRecharge = (e) => {
    let rechargeValidate = true;

    e.preventDefault();
    let rechargeData = {
      mobileNumber: data.mobileNumber,
      mobileoperator: selectedOprator,
      rechargeamount: amount,
      clientCode: clientCode,
      rechargeplan: talkTimedesc,
      servicecode: "SER_7",
    };

    if (rechargeData.mobileNumber === "") {
      rechargeValidate = false;
      setMobileError("Please enter mobile number");
      setOptError("Please select operator");
      setCircleError("Please select circle");
      setAmountErr("Please select amount");
    }

    if (
      rechargeData.rechargeamount === undefined &&
      rechargeData.rechargeplan === undefined
    ) {
      rechargeValidate = false;
      setAmountErr("Please select amount");
    }

    if (rechargeValidate) {
      setAmountErr("");
      loader.classList.remove("d-none");
      // message.innerHTML = `<h3>Recharge in progress</h3>`;
      setRechargeLoading(true);
      mobileReacharge(rechargeData).then(
        (res) => {
          console.log(res);
          if (res.status === 300) {
            setRechargeLoading(false);
            loader.classList.add("d-none");
            swal("Please Try Later", res.message, "warning");
          }
          if (res.status === 200) {
            swal("Recharge done!", res.message, "success").then((res) => {
              if (res) loader.classList.add("d-none");
            });
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
      <div className="container" id="unloader" style={styles.container}>
        <div className="row mt-3 mb-3 ms-1">
          <div className="col-md-6 col-6">
            <h4 className=" text-success">Prepaid Mobile Recharge</h4>
          </div>
          <div className="col-md-6 col-6 text-end">
            <Link
              className="text-success border border-success rounded-2 p-2"
              to="/mobile/trasactions"
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              Transactions
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <form
              action=""
              className="card p-4"
              style={{
                boxShadow: "#00000012 0pt 2pt 8pt",
                backgroundColor: "#FFFFFF",
              }}
            >
              <div className="mb-3">
                <div className="input-group mb-1 ms-2">
                  <label>Enter Mobile</label> &nbsp;
                  <br />
                </div>
                <input
                  type="text"
                  id="mobileNumber"
                  value={data.mobileNumber}
                  onChange={(e) => handleChange(e)}
                  placeholder="Example:. 9091929394"
                  className="form-control"
                />
                <div className="text-danger">{mobileError}</div>
              </div>
              <div className="mb-3">
                <div className="input-group mb-1 ms-2">
                  <label>Operator</label> <br />
                </div>
                <Select
                  options={operatorList}
                  components={{ Option: IconOption }}
                  placeholder="Select option"
                  className="text-start"
                  value={operatorList?.find(
                    (obj) => obj.value === selectedOprator
                  )}
                  onChange={handleOperator}
                />
                <div className="text-danger">{optError}</div>
              </div>
              <div className="mb-3">
                <div className="input-group mb-1 ms-2">
                  <label>Circle</label> <br />
                </div>

                <Select
                  options={circleList}
                  className="text-start"
                  placeholder="Select option"
                  value={circleList?.find(
                    (obj) => obj.value === selectedCircle
                  )}
                  onChange={handleCircle}
                  isSearchable={true}
                />
                <div className="text-danger">{circleError}</div>
              </div>
              <div className="mb-4">
                <div className="input-group">
                  <div className="input-group mb-1 ms-2">
                    <label>Enter Amount</label> <br />
                  </div>
                  <input
                    type="text"
                    className="form-control rounded-2"
                    placeholder="Example:. 10"
                    value={amount}
                    aria-label="Recipient's username with two button addons"
                  />
                  <button
                    type="button"
                    className="border-0 rounded-2 text-white"
                    style={{ backgroundColor: "#3d24f5" }}
                    onClick={onClickHandle}
                  >
                    View Plans
                  </button>
                </div>
                <span className="text-danger">{amountErr}</span>
              </div>

              <div className="">
                <button
                  className="gradient_class w-100 btn"
                  onClick={(e) => handleRecharge(e)}
                >
                  Proceed To Recharge
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-8">
            {open && validate === true ? (
              <div
                className="card"
                style={{
                  boxShadow: "#00000012 0pt 2pt 8pt",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <div className="card-body">
                  <div className="row mt-3 mb-3">
                    <div className="col-lg-5">
                      <h5 className="text-success">
                        View Plans &nbsp; &nbsp; <ModalSearch />
                      </h5>
                    </div>
                  </div>
                  <hr />
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {BrowseDataResponse?.map((data, index) => {
                      return (
                        <li
                          className="nav-item"
                          role="presentation"
                          key={"lk" + index}
                        >
                          <button
                            key={"lnk" + index}
                            className={
                              index === 0 ? "nav-link active" : "nav-link"
                            }
                            id={index + "-tab"}
                            data-bs-toggle="tab"
                            data-bs-target={"#pln" + index}
                            type="button"
                            role="tab"
                            aria-controls={data.tabTitle}
                            aria-selected="false"
                          >
                            {data.tabTitle}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    {BrowseDataResponse?.map((data, index) => {
                      return (
                        <div
                          key={"tb" + index}
                          className={
                            index === 0
                              ? "tab-pane fade show active"
                              : "tab-pane fade"
                          }
                          id={"pln" + index}
                          role="tabpanel"
                          aria-labelledby="home-tab"
                        >
                          <div className="row">
                            {data.tablPlans.map((tabPlan, index1) => {
                              return (
                                <div className=" mt-3" key={"bx" + index1}>
                                  <div className="card">
                                    <div className="card-body">
                                      <div className="row">
                                        <div className="col-md-2 col-sm-2 mt-2 col-3">
                                          <div className="">
                                            <b>Rs.</b>
                                            {tabPlan.rs} .00
                                          </div>
                                        </div>
                                        <div className="col-md-8 col-sm-8 col-5 mt-2">
                                          <b>Description :</b>
                                          <p className="mb-0">
                                            {tabPlan.desc.split("", 30)}
                                          </p>
                                          <p className="mb-0">
                                            Validity :
                                            <strong>
                                              {tabPlan.validity ?? ""}
                                            </strong>
                                          </p>
                                        </div>
                                        <div className="col-md-2 col-sm-2 col-2 mt-3">
                                          {" "}
                                          <button
                                            className="btn btn-outline-success"
                                            onClick={(e) =>
                                              handlePlanAmount(
                                                tabPlan.rs,
                                                tabPlan.desc
                                              )
                                            }
                                          >
                                            Select
                                          </button>
                                        </div>
                                        {/* <div className="col-md-2 col-sm-2 col-xs-2 d-flex align-items-center justify-content-center">
                                          
                                        </div>
                                        <div className="col-md-8 col-sm-8 col-xs-8">
                                          
                                        </div>
                                        <div className="col-md-1 col-sm-1 col-xs-1 d-flex align-items-center justify-content-center">
                                         
                                        </div> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileRecharge;
