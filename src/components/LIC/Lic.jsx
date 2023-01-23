import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import swal from "sweetalert";
import { fetchLicBill, payLicBill } from "../../networkcalls/LIC";

const Lic = () => {
  const loader = document.querySelector("div.loader");
  const [canumber, setCaNumber] = useState();
  const [ad1, setAd1] = useState();
  const [details, setDetails] = useState();
  const [amount, setAmount] = useState();
  const [response, setResponse] = useState();
  const [modalopen, setModalOpen] = useState();
  const [show, setShow] = useState(false);

  //err hooks
  const [canumberErr, setCaNumberErr] = useState();
  const [ad1Err, setAd1Err] = useState();
  const [amountErr, setAmountErr] = useState();

  let lattitude = sessionStorage.getItem("lat");
  let longitude = sessionStorage.getItem("lng");
  let clientCode = sessionStorage.getItem("clientCode");
  const handleviewBill = (e) => {
    e.preventDefault();
    let validate = true;
    let data = {
      canumber: canumber,
      ad1: ad1,
      mode: "offline",
    };
    if (data.canumber === undefined || data.canumber === "") {
      setCaNumberErr("Please enter insurance number");
      validate = false;
    }
    if (data.ad1 === undefined || data.ad1 === "") {
      setAd1Err("Please enter ad1 address");
      validate = false;
    }
    if (!/^\d{9,}$/.test(data.canumber)) {
      setCaNumberErr("Please enter atleast 9 digits");
      validate = false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.ad1)) {
      setAd1Err("Please enter valid email address");
      validate = false;
    }
    if (validate) {
      setCaNumberErr("");
      setAd1Err("");
      loader.classList.remove("d-none");
      fetchLicBill(data).then(
        (res) => {
          loader.classList.add("d-none");
          if (res?.status === 200) {
            setDetails(res?.result);
            setAmount(res?.result?.bill_fetch?.billAmount);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };
  const handlePayBill = (e) => {
    let validate = true;
    e.preventDefault();
    let bill_fetch = {
      billNumber: "LICI2122000037468013",
      billAmount: "1548.00",
      billnetamount: "1548.00",
      billdate: "25-05-2021 00:44:29",
      acceptPayment: true,
      acceptPartPay: false,
      cellNumber: "905514651",
      dueFrom: "11/05/2021",
      dueTo: "11/05/2021",
      validationId: "HGA8V00A110382264047",
      billId: "HGA8V00A110382264047B",
    };
    let data = {
      canumber: canumber,
      mode: "offline",
      amount: amount,
      ad1: ad1,
      ad2: "HDC610532",
      ad3: "HDC416601",
      latitude: lattitude,
      longitude: longitude,
      bill_fetch: JSON.stringify(bill_fetch),
      clientCode: clientCode,
    };
    if (
      data.amount === "" ||
      data.amount === "0" ||
      data.amount === undefined
    ) {
      setAmountErr("Please enter amount");
      validate = false;
    }

    if (validate) {
      setAmountErr("");
      loader.classList.remove("d-none");
      payLicBill(data).then(
        (res) => {
          loader.classList.add("d-none");
          if (res?.status === 200) {
            setShow(true);
            setModalOpen(true);
            setResponse(res?.result);
          } else {
            swal("Warning", res?.message, "warning");
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
    setModalOpen(false);
    window.location.reload();
  };
  return (
    <div>
      <div className="container">
        <div className="row mt-3 mb-3 ms-1">
          <div className="col-md-6 col-6">
            <h4 className=" text-success">LIC Bill Payment</h4>
          </div>
          <div className="col-md-6 col-6 text-end">
            <Link
              className="text-success border border-success rounded-2 p-2"
              to="/lic/transactions"
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              Transactions
            </Link>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <form
                className="border card p-4"
                style={{
                  boxShadow: "#00000012 0pt 2pt 8pt",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <div className="mt-3">
                  <div className="input-group mb-1 ms-2">
                    <label>Insurance Premium No.</label> &nbsp;
                    <br />
                  </div>
                  <input
                    type="text"
                    value={canumber || ""}
                    placeholder="Enter Insurance premium no."
                    className="form-control"
                    onChange={(e) => setCaNumber(e.target.value)}
                  />
                  <div className="text-danger">{canumberErr}</div>
                </div>
                <div className="mt-3">
                  <div className="input-group mb-1 ms-2">
                    <label>Email address</label> &nbsp;
                    <br />
                  </div>
                  <input
                    type="text"
                    value={ad1 || ""}
                    placeholder="Enter Email Address"
                    className="form-control"
                    onChange={(e) => setAd1(e.target.value)}
                  />
                  <div className="text-danger">{ad1Err}</div>
                </div>
                {details ? (
                  <>
                    <div className="mt-3">
                      <div className=" mb-1 ms-2">
                        <label>Amount</label> &nbsp;
                        <br />
                      </div>
                      <input
                        type="text"
                        value={amount || ""}
                        placeholder="Enter amount"
                        className="form-control"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <div className="text-danger">{amountErr}</div>
                    </div>
                    <div className="mt-3">
                      <button
                        className="btn gradient_class text-white w-100"
                        onClick={handlePayBill}
                      >
                        Pay Bill
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mt-3">
                    <button
                      className="btn rounded-end text-white w-100"
                      style={{ backgroundColor: "#3d24f5" }}
                      onClick={handleviewBill}
                    >
                      View Bill
                    </button>
                  </div>
                )}
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
                            <p>{response?.message}</p>
                            <p>
                              <strong> Operator Id :</strong> &nbsp;
                              {response?.operatorid}
                            </p>
                            <p>
                              <strong> Refference Id :</strong> &nbsp;
                              {response?.ackno}
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
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lic;
