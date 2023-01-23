import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchElectricityBill,
  getelectricityoperator,
  payElectricityBill,
} from "../../networkcalls/ElectricityApi";
import Select, { components } from "react-select";
import swal from "sweetalert";
import { Button, Modal } from "react-bootstrap";
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
const Electricity = () => {
  let clientCode = sessionStorage.getItem("clientCode");
  let latitude = sessionStorage.getItem("lat");
  let longitude = sessionStorage.getItem("lng");
  const loader = document.querySelector("div.loader");
  //for operator
  const [selectedOprator, setSelectedOprator] = useState();
  const [operatorList, setOperatorList] = useState();

  //to fetch customer bill data
  const [consumerNumber, setConsumerNumber] = useState();
  const [ad1, setad1] = useState();
  const [ad2, setad2] = useState();
  const [ad3, setad3] = useState();
  const [displayname, setDisplayName] = useState();
  const [regexForDisplayname, setRegexForDisplayName] = useState();
  const [ad1_d_name, setad1_d_name] = useState();
  const [ad1_name, setad1_name] = useState();
  const [ad1_regex, setad1_regex] = useState();
  const [ad2_d_name, setad2_d_name] = useState();
  const [ad2_name, setad2_name] = useState();
  const [ad2_regex, setad2_regex] = useState();
  const [ad3_d_name, setad3_d_name] = useState();
  const [ad3_name, setad3_name] = useState();
  const [ad3_regex, setad3_regex] = useState();

  //open bill detailes
  const [openDetails, setOpenDetails] = useState(false);
  const [details, setDetails] = useState();

  //Error hooks
  const [operatorErr, setOeratorErr] = useState();
  const [consumerNumberErr, setConsumerNumberErr] = useState();
  const [ad1Err, setAd1Err] = useState();
  const [ad2Err, setAd2Err] = useState();
  const [ad3Err, setAd3Err] = useState();

  const [show, setShow] = useState(false);
  const [modalopen, setModalOpen] = useState(false);
  const [rechargeResult, setRechargeResult] = useState();

  const getOperator = () => {
    const loader = document.querySelector("div.loader");
    loader.classList.remove("d-none");
    getelectricityoperator({ mode: "online" }).then(
      (res) => {
        loader.classList.add("d-none");
        var result = res?.data?.result;

        var operatorLive = [];
        result.forEach((element) => {
          var nm = element?.name?.toLowerCase();
          operatorLive.push({
            value: element.id,
            label: element.name,
            displayname: element.displayname,
            regex: element.regex,
            viewbill: element.viewbill,
            ad1_d_name: element.ad1_d_name,
            ad1_name: element.ad1_name,
            ad1_regex: element.ad1_regex,
            ad2_d_name: element.ad2_d_name,
            ad2_name: element.ad2_name,
            ad2_regex: element.ad2_regex,
            ad3_d_name: element.ad3_d_name,
            ad3_name: element.ad3_name,
            ad3_regex: element.ad3_regex,
          });
        });

        setOperatorList(operatorLive);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  let navigate = useNavigate();
  useEffect(() => {
    // loader.classList.remove("d-none");
    getOperator();
  }, []);

  const handleOperator = (e) => {
    setSelectedOprator(e.value);
    setDisplayName(e.displayname);
    setRegexForDisplayName(e.regex);

    setad1_d_name(e.ad1_d_name);
    setad1_name(e.ad1_name);
    setad1_regex(e.ad1_regex);

    setad2_d_name(e.ad2_d_name);
    setad2_name(e.ad2_name);
    setad2_regex(e.ad2_regex);

    setad3_d_name(e.ad3_d_name);
    setad3_name(e.ad3_name);
    setad3_regex(e.ad3_regex);

    setConsumerNumberErr("");
    setOeratorErr("");
    setAd1Err("");
    setAd2Err("");
    setAd3Err("");
  };

  // console.log("displayname", displayname);
  // console.log("regexForDisplayname", regexForDisplayname);
  // console.log("ad1_d_name", ad1_d_name);
  // console.log("ad1_name", ad1_name);
  // console.log("ad1_regex", ad1_regex);

  const viewBill = (e) => {
    let validate = true;
    e.preventDefault();
    let customerData = {
      operator: selectedOprator,
      consumernumber: consumerNumber,
      mode: "online",
    };

    if (
      customerData.operator === undefined ||
      customerData?.operator?.trim() === ""
    ) {
      setOeratorErr("Please select operator");
      validate = false;
    }

    if (
      customerData.consumernumber === undefined ||
      customerData?.consumernumber?.trim() === ""
    ) {
      setConsumerNumberErr(`Please enter ${displayname}`);
      validate = false;
    }

    let dynamicRegex = new RegExp(regexForDisplayname);

    if (!dynamicRegex.test(customerData.consumernumber)) {
      setConsumerNumberErr(`Please enter valid ${displayname} `);
      validate = false;
    }
    if (ad1_d_name !== null) {
      let regex1 = new RegExp(ad1_regex);
      if (!regex1.test(ad1)) {
        setAd1Err(`Please enter valid ${ad1_name} `);
        validate = false;
      }
    }
    if (ad2_d_name !== null) {
      let regex2 = new RegExp(ad2_regex);
      if (!regex2.test(ad2)) {
        setAd1Err(`Please enter ${ad2_name} `);
        validate = false;
      }
    }
    if (ad3_d_name !== null) {
      let regex3 = new RegExp(ad3_regex);
      if (!regex3.test(ad3)) {
        setAd1Err(`Please enter ${ad3_name} `);
        validate = false;
      }
    }

    if (validate) {
      setConsumerNumberErr("");
      setAd1Err("");
      setOeratorErr("");
      loader.classList.remove("d-none");
      fetchElectricityBill(customerData).then(
        (res) => {
          loader.classList.add("d-none");

          if (res.status === 200) {
            setOpenDetails(true);
            setDetails(res?.data?.result);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  const handleClose = () => {
    window.location.reload();
    setShow(false);
  };

  const billPayment = (e) => {
    e.preventDefault();

    let bill_fetch = {
      billAmount: "820.0",
      billnetamount: "820.0",
      billdate: "01Jan1990",
      dueDate: "2021-01-06",
      acceptPayment: true,
      acceptPartPay: false,
      cellNumber: "102277100",
      userName: "SALMAN",
    };
    let passData = {
      consumernumber: consumerNumber,
      mode: "online",
      latitude: latitude,
      longitude: longitude,
      bill_fetch: JSON.stringify(bill_fetch),
      clientCode: clientCode,
      operator: selectedOprator,
      amount: details?.amount,
      ad1: ad1 ?? null,
    };
    console.log(passData);

    loader.classList.remove("d-none");
    payElectricityBill(passData).then(
      (res) => {
        loader.classList.add("d-none");
        if (res?.data?.status === 200) {
          setShow(true);
          setModalOpen(true);
          setRechargeResult(res?.data?.result);
        } else {
          swal("Warning", res?.data?.message, "warning");
        }
      },
      (err) => {
        console.log(err);
        loader.classList.add("d-none");
        swal("Error", "server error", "error");
      }
    );
  };
  return (
    <div>
      <div className="container" id="unloader">
        <div className="row mt-3 mb-3 ms-1">
          <div className="col-md-6 col-6">
            <h4 className=" text-success">Electricity Bill</h4>
          </div>
          <div className="col-md-6 col-6 text-end">
            <Link
              className="text-success border border-success rounded-2 p-2"
              to="/electricity/transactions"
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
                <div className="mt-3">
                  <div className="input-group mb-1 ms-2">
                    <label>{displayname}</label> &nbsp;
                    <br />
                  </div>
                  <input
                    type="number"
                    value={consumerNumber}
                    placeholder={"Enter " + displayname}
                    className="form-control"
                    onChange={(e) => setConsumerNumber(e.target.value)}
                  />

                  <div className="text-danger">{consumerNumberErr}</div>
                </div>
              ) : (
                <></>
              )}
              {ad1_d_name ? (
                <div className="mt-3">
                  <div className="input-group mb-1 ms-2">
                    <label>{ad1_d_name}</label> &nbsp;
                    <br />
                  </div>
                  <input
                    type="number"
                    value={ad1}
                    placeholder={"Enter " + ad1_d_name}
                    className="form-control"
                    onChange={(e) => setad1(e.target.value)}
                  />

                  <div className="text-danger">{ad1Err}</div>
                </div>
              ) : (
                <></>
              )}
              {ad2_d_name ? (
                <div className="mt-3">
                  <div className="input-group mb-1 ms-2">
                    <label>{ad2_d_name}</label> &nbsp;
                    <br />
                  </div>
                  <input
                    type="number"
                    value={ad2}
                    placeholder={"Enter " + ad2_d_name}
                    className="form-control"
                    onChange={(e) => setad2(e.target.value)}
                  />

                  <div className="text-danger">{ad2Err}</div>
                </div>
              ) : (
                <></>
              )}
              {ad3_d_name ? (
                <div className="mt-3">
                  <div className="input-group mb-1 ms-2">
                    <label>{ad3_d_name}</label> &nbsp;
                    <br />
                  </div>
                  <input
                    type="number"
                    value={ad3}
                    placeholder={"Enter " + ad3_d_name}
                    className="form-control"
                    onChange={(e) => setad3(e.target.value)}
                  />

                  <div className="text-danger">{ad3Err}</div>
                </div>
              ) : (
                <></>
              )}

              <div className="mt-4">
                {openDetails ? (
                  <>
                    <button
                      className="btn gradient_class w-100"
                      onClick={billPayment}
                    >
                      Proceed to recharge
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-primary w-100"
                    style={{ backgroundColor: "#3d24f5" }}
                    onClick={viewBill}
                  >
                    View Bill
                  </button>
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
                            <p>{rechargeResult?.message}</p>
                            <p>
                              <strong> Operator Id:</strong>
                              {rechargeResult?.operatorid}
                            </p>
                            <p>
                              <strong> Refference Id:</strong>
                              {rechargeResult?.refid}
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
              </div>
            </form>
          </div>
          {openDetails ? (
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
                      <b> Due Date </b>: <br /> {details?.duedate}
                    </div>

                    <div className="col-md-12 col-12 mt-2">
                      <b>Address 2 </b> : <br /> {details?.ad2}
                    </div>
                    <div className="col-md-12 col-12 mt-2">
                      <b>Address 3</b> : <br /> {details?.ad3}
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

export default Electricity;
