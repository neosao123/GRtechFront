import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select, { components } from "react-select";
import swal from "sweetalert";
import {
  dthrecharge,
  getdthcircle,
  getdthinfo,
  getdthoperator,
} from "../../networkcalls/dthApi";
import ViewPlans from "../Mobile Recharge/ViewPlans";
import ViewDthPlans from "./ViewDthPlans";
const { Option } = components;

function IconOption(props) {
  const {
    data: { value, label, Icon },
  } = props;

  return (
    <Option {...props} value={value}>
      <div className="d-flex align-items-center justify-content-start">
        <img src={Icon} className="optr" />
        <span className="">{label}</span>
      </div>
    </Option>
  );
}

const Dth = () => {
  const loader = document.querySelector("div.loader");
  const [open, setOpen] = useState(false);
  const [operatorList, setOperatorList] = useState();
  const [selectedOprator, setSelectedOprator] = useState();
  const [circleList, setCircleList] = useState();
  const [selectedCircle, setSelectedCircle] = useState();
  const [canumber, setCanumber] = useState();
  const [info, setInfo] = useState();
  const [openAmount, setOpenAmount] = useState();
  const [canumberErr, setCaNumberErr] = useState();
  const [operatorErr, setOperatorErr] = useState();
  const [validate, setValidate] = useState(false);
  // const [showInfo, setShowInfo] = useState(true);
  useEffect(() => {
    getdthcircle().then(
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

  useEffect(() => {
    getdthoperator().then((data) => {
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
  }, []);
  function handleCircle(e) {
    setSelectedCircle(e);
  }
  function handleOperator(e) {
    setSelectedOprator(e);
  }

  const HandleUserInfo = (e) => {
    e.preventDefault();
    setValidate(false);
    let data = {
      canumber: canumber,
      operator: selectedOprator?.value,
    };
    console.log(data);
    // if(!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-.]?([0-9]{4})$/.test(data.canumber)){
    //   setValidate(false);
    //   setCaNumberErr("Please enter Number");
    // }
    if (data.canumber === undefined && data.operator === undefined) {
      setValidate(false);
      setCaNumberErr("Please enter registered mobile number or subscriber Id");
      setOperatorErr("Please select operator");
    } else {
      setCaNumberErr("");
      setOperatorErr("");
      loader.classList.remove("d-none");
      getdthinfo(data).then(
        (res) => {
          setValidate(true);
          loader.classList.add("d-none");
          setInfo(res.result[0]);
        },
        (err) => {
          console.log(err);
        }
      );
      setOpenAmount(true);
      setOpen(true);
    }
  };
  let clientCode = sessionStorage.getItem("clientCode");
  const handleRecharge = (e) => {
    e.preventDefault();
    let RechargeData = {
      mobileNumber: canumber,
      operator: selectedOprator?.id,
      rechargeamount: info?.MonthlyRecharge,
      clientCode: clientCode, //clientCode === sessionStorage
      rechargeplan: info?.planname,
    };
    loader.classList.remove("d-none");
    dthrecharge(RechargeData).then(
      (res) => {
        console.log(res);
        loader.classList.add("d-none");
        if (res.status === 200) {
          swal("Recharge Done", res.message, "success").then((res) => {
            if (res) {
              window.location.reload();
            }
          });
        } else if (res.status === 300) {
          swal("Error", res.message, "warning");
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <div className="container" id="unloader">
      <div className="row mt-3 mb-3 ms-1">
        <div className="col-md-6 col-6">
          <h4 className=" text-success">DTH Recharge</h4>
        </div>
        <div className="col-md-6 col-6 text-end">
          <Link
            className="text-success border border-success rounded-2 p-2"
            to="/dth/trasactions"
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
            className="border card p-4"
            style={{
              boxShadow: "#00000012 0pt 2pt 8pt",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div className="mb-3">
              <label>Operator</label>
              <Select
                options={operatorList}
                components={{ Option: IconOption }}
                placeholder="Select Operator"
                className="text-start"
                value={operatorList?.find(
                  (obj) => obj.value === selectedOprator
                )}
                onChange={handleOperator}
              />
              <span className="text-danger">{operatorErr}</span>
            </div>

            <div className="mb-3">
              <label>Enter Reg. Mobile/ Sub. Id</label>
              <input
                type="number"
                id="canumber"
                placeholder="Registered Mobile Number / Subscriber Id"
                className="form-control"
                value={canumber}
                onChange={(e) => setCanumber(e.target.value)}
              />
              <span className="text-danger">{canumberErr}</span>
            </div>
            {open && validate === true ? (
              <div></div>
            ) : (
              <div className="mb-3">
                <button
                  className="form-control border-0 rounded-2 text-white"
                  style={{ backgroundColor: "#3d24f5" }}
                  onClick={HandleUserInfo}
                >
                  View Info
                </button>
              </div>
            )}

            {/* <div className="mb-3">
              <Select
                options={circleList}
                className="text-start"
                placeholder="Select Circle"
                value={circleList?.find((obj) => obj.value === selectedCircle)}
                onChange={handleCircle}
                isSearchable={true}
              />
            </div> */}
            {openAmount && validate === true ? (
              <>
                <div className="mb-4">
                  <label>Recharge Amount</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Amount"
                    value={info?.MonthlyRecharge}
                  />
                </div>
                <div className="">
                  <button
                    className="gradient_class w-100 btn"
                    onClick={handleRecharge}
                  >
                    Proceed To Recharge
                  </button>
                </div>
              </>
            ) : (
              <>
                <div></div>
              </>
            )}
          </form>
        </div>
        <div className="col-lg-8">
          {open && validate === true ? (
            <>
              <div
                className="card "
                style={{
                  boxShadow: "#00000012 0pt 2pt 8pt",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <div className="card-body">
                  <div className="row">
                    <h5 className="text-success">DTH Info</h5>
                    <div className="col-md-12 col-12 mt-3">
                      <b>Customer Name </b>: <br /> {info?.customerName}
                    </div>

                    <div className="col-md-12 col-12 mt-2">
                      <b>Balance </b> : <br /> Rs. {info?.Balance} /-
                    </div>

                    <div className="col-md-12 col-12 mt-2">
                      <b> Status </b>: <br /> {info?.status}
                    </div>

                    <div className="col-md-12 col-12 mt-2">
                      <b>Next Recharge Date </b> : <br />{" "}
                      {info?.NextRechargeDate}
                    </div>

                    <div className="col-md-12 col-12 mt-2">
                      <b>Monthly Recharge </b> : <br /> Rs.{" "}
                      {info?.MonthlyRecharge}.00 /-
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dth;
