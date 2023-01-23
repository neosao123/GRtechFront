import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import Select, { components } from "react-select";
import swal from "sweetalert";
import {
  fastTagRecharge,
  getConsumerDetails,
  getFastTagOperator,
} from "../../networkcalls/Fastag";
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
const FastTag = () => {
  const loader = document.querySelector("div.loader");
  const [displayname, setDisplayName] = useState();
  const [canumber, setCaNumber] = useState();
  const [viewBill, setViewBill] = useState();
  const [amount, setAmount] = useState();
  const [details, setDetails] = useState();
  const [rechargeResult, setRechargeResult] = useState();
  const [show, setShow] = useState(false);

  let lattitude = sessionStorage.getItem("lat");
  let longitude = sessionStorage.getItem("lng");
  let clientCode = sessionStorage.getItem("clientCode");

  //for operator
  const [selectedOprator, setSelectedOprator] = useState();
  const [operatorList, setOperatorList] = useState();

  //for err
  const [operatorErr, setOpratorErr] = useState();
  const [canumberErr, setCaNumberErr] = useState();
  const [amountErr, setAmountErr] = useState();

  const [modalopen, setModalOpen] = useState(false);

  useEffect(() => {
    // const loader = document.querySelector("div.loader");
    // loader.classList.remove("d-none");
    getFastTagOperator().then(
      (res) => {
        // loader.classList.add("d-none");
        var result = res?.result;
        var operatorLive = [];
        result.forEach((element) => {
          var nm = element?.name?.toLowerCase();
          operatorLive.push({
            value: element.id,
            label: element.name,
            displayname: element.displayname,
            regex: element.regex,
            viewbill: element.viewbill,
            ad1_regex: element.ad1_regex,
          });
        });
        setOperatorList(operatorLive);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const handleOperator = (e) => {
    setSelectedOprator(e.value);
    setDisplayName(e.displayname);
    setViewBill(e.viewbill);
    setOpratorErr("");
    setCaNumberErr("");
    setAmountErr("");
  };

  const handleviewBill = (e) => {
    let validate = true;
    e.preventDefault();
    let data = { operator: selectedOprator, canumber: canumber };

    if (data.canumber === undefined || data.canumber === "") {
      setCaNumberErr("please enter vehicle registration number");
      validate = false;
    }
    if (!/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/.test(data.canumber)) {
      setCaNumberErr("Please enter valid vehicle registration number");
      validate = false;
    }
    loader.classList.remove("d-none");
    getConsumerDetails(data).then(
      (res) => {
        loader.classList.add("d-none");
        setOpratorErr("");
        setCaNumberErr("");
        setAmountErr("");
        if (res?.status === 200) {
          setDetails(res?.result);
          setAmount(res?.result?.bill_fetch?.billAmount);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const handleRecharge = (e) => {
    let validate = true;

    e.preventDefault();
    let bill_fetch;
    if (viewBill === "1") {
      bill_fetch = {
        billAmount: "1000.0",
        billnetamount: "1000.0",
        dueDate: "2021-09-21",
        maxBillAmount: 1000,
        acceptPayment: true,
        acceptPartPay: true,
        cellNumber: "DL12CB4685",
        userName: "NITESH  KUMAR SHARMA",
      };
    } else {
      bill_fetch = {};
    }

    let data = {
      operator: selectedOprator,
      canumber: canumber,
      amount: amount,
      latitude: lattitude,
      longitude: longitude,
      bill_fetch: JSON.stringify(bill_fetch),
      clientCode: clientCode,
    };

    if (data.operator === undefined || data.operator === "") {
      setOpratorErr("Please select operator");
      validate = false;
    }
    if (data.canumber === undefined || data.canumber === "") {
      setCaNumberErr("Please enter vehicle registration number");
      validate = false;
    }
    if (!/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/.test(data.canumber)) {
      setCaNumberErr("Please enter valid vehicle registration number");
      validate = false;
    }

    if (data.amount === undefined || data.amount === "") {
      setAmountErr("please enter amount");
      validate = false;
    }

    if (validate) {
      loader.classList.remove("d-none");
      fastTagRecharge(data).then(
        (res) => {
          loader.classList.add("d-none");
          setOpratorErr("");
          setCaNumberErr("");
          setAmountErr("");
          if (res?.status === 200) {
            setShow(true);
            console.log(res);
            setRechargeResult(res?.result);
            setModalOpen(true);
          } else {
            swal("warning", res?.message, "warning");
          }
        },
        (err) => {
          swal("warning", "server Error", "danger");
        }
      );
    }
  };

  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };

  return (
    <div>
      <div className="container" id="unloader">
        <div className="row mt-3 mb-3 ms-1">
          <div className="col-md-6 col-6">
            <h4 className=" text-success">Fastag Recharge</h4>
          </div>
          <div className="col-md-6 col-6 text-end">
            <Link
              className="text-success border border-success rounded-2 p-2"
              to="/fastag/transactions"
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
              <div className="mt-3">
                <label htmlFor="" className="ms-2">
                  Select Operator
                </label>
                <Select
                  options={operatorList}
                  components={{ Option: IconOption }}
                  placeholder={
                    <div className="select-placeholder-text">
                      Select options
                    </div>
                  }
                  className="text-start"
                  value={operatorList?.find(
                    (obj) => obj.value === selectedOprator
                  )}
                  onChange={handleOperator}
                />
                <span className="text-danger">{operatorErr}</span>
              </div>
              {displayname ? (
                <>
                  <div className="mt-3">
                    <div className="input-group mb-1 ms-2">
                      <label>{displayname}</label> &nbsp;
                      <br />
                    </div>
                    <input
                      type="text"
                      value={canumber}
                      placeholder={"Enter " + displayname}
                      className="form-control"
                      onChange={(e) => setCaNumber(e.target.value)}
                    />
                    <div className="text-danger">{canumberErr}</div>
                  </div>

                  <div className="mt-3">
                    <div className="mb-1 ms-2">
                      <label>Enter Amount</label> &nbsp;
                      <br />
                    </div>
                    <div className="input-group">
                      <input
                        type="number"
                        value={amount}
                        placeholder={"Enter amount"}
                        className="form-control"
                        onChange={(e) => setAmount(e.target.value)}
                      />

                      {viewBill === "1" ? (
                        <div className="">
                          <button
                            className="btn rounded-end text-white w-100"
                            style={{ backgroundColor: "#3d24f5" }}
                            onClick={handleviewBill}
                          >
                            View Bill
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <span className="text-danger">{amountErr}</span>
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="mt-4">
                <div className="">
                  <button
                    className="btn gradient_class w-100"
                    onClick={handleRecharge}
                  >
                    Proceed to Recharge
                  </button>
                </div>
              </div>
              {modalopen ? (
                <>
                  <Modal show={show} className="center" onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title className="text-success">
                        Recharge Success!
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="container">
                        <div className="row">
                          <p>{rechargeResult?.message}</p>
                          <p>
                            <strong> Operator Id :</strong> &nbsp;
                            {rechargeResult?.operatorid}
                          </p>
                          <p>
                            <strong> Refference Id :</strong> &nbsp;
                            {rechargeResult?.ackno}
                          </p>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              ) : (
                <></>
              )}
            </form>
          </div>
          {details ? (
            <div className="col-lg-8">
              {" "}
              <div
                className="card "
                style={{
                  boxShadow: "#00000012 0pt 2pt 8pt",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <div className="card-body">
                  <div className="row">
                    <h5 className="text-success">Bill Details</h5>
                    <div className="col-md-12 col-12 mt-3">
                      <b>Customer Name </b>: <br /> {details?.name}
                    </div>
                    <div className="col-md-12 col-12 mt-2">
                      <b>Amount </b> : <br /> Rs. {details?.amount} /-
                    </div>
                    <div className="col-md-12 col-12 mt-2">
                      <b> Cell Number </b>: <br />{" "}
                      {details?.bill_fetch?.cellNumber}
                    </div>
                    <div className="col-md-12 col-12 mt-2">
                      <b>Due date </b> : <br /> {details?.bill_fetch?.dueDate}
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default FastTag;
