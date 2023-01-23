import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select, { components } from "react-select";
import swal from "sweetalert";
import {
  fetchGasbookingDetails,
  gasBooking,
  gasBookingOperator,
  getLpgDistributor,
  getLpgDistrictListByState,
  getLpgStatelist,
} from "../../networkcalls/GasBooking";
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
const GasBooking = () => {
  let clientCode = sessionStorage.getItem("clientCode");
  let latitude = sessionStorage.getItem("lat");
  let longitude = sessionStorage.getItem("lng");
  const loader = document.querySelector("div.loader");

  //open bill detailes
  const [openDetails, setOpenDetails] = useState(false);
  const [details, setDetails] = useState();

  //to fetch customer bill data
  const [caNumber, setCaNumber] = useState();
  const [ad1, setad1] = useState("");
  const [ad2, setad2] = useState("");
  const [ad3, setad3] = useState("");
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
  const [amount, setAmount] = useState();

  //for state selected
  const [stateData, setStateData] = useState();
  const [selectedState, setSelectedState] = useState();

  //for district selected
  const [districtData, setDistrictData] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();

  //for distributor
  const [distributorData, setDistributorData] = useState();
  const [selectedDistributor, setSelectedDistributor] = useState();

  //for operator
  const [selectedOprator, setSelectedOprator] = useState();
  const [operatorList, setOperatorList] = useState();

  //Error hooks
  const [operatorErr, setOeratorErr] = useState();
  const [canumberErr, setCaNumberErr] = useState();
  const [ad1Err, setAd1Err] = useState();
  const [ad2Err, setAd2Err] = useState();
  const [ad3Err, setAd3Err] = useState();
  const [amountErr, setAmountErr] = useState();
  const [stateErr, setStateErr] = useState();
  const [districtErr, setDistrictErr] = useState();

  const [show, setShow] = useState(false);
  const [modalopen, setModalOpen] = useState(false);
  const [rechargeResult, setRechargeResult] = useState();

  const getOperator = () => {
    const loader = document.querySelector("div.loader");
    loader.classList.remove("d-none");
    gasBookingOperator({ mode: "offline" }).then(
      (res) => {
        loader.classList.add("d-none");
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
  const lpgStateList = () => {
    //function from networkcalls
    getLpgStatelist().then(
      (res) => {
        var result = res.result;

        var stateLive = [];
        result.forEach((element) => {
          var cm = element?.state?.toLowerCase();
          stateLive.push({
            value: element.stateid,
            label: element.state,
          });
        });
        setStateData(stateLive);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    getOperator();
    //if ad1_d_name === state (then this dropdown will shown)
    lpgStateList();
  }, []);

  //operator list
  const handleOperator = (e) => {
    setSelectedOprator(e.value);
    setDisplayName(e.displayname);
    setRegexForDisplayName(e.regex);

    setad1_d_name(e.ad1_d_name);
    // setad1_d_name("State");
    setad1_name(e.ad1_name);
    setad1_regex(e.ad1_regex);

    setad2_d_name(e.ad2_d_name);
    setad2_name(e.ad2_name);
    setad2_regex(e.ad2_regex);

    setad3_d_name(e.ad3_d_name);
    setad3_name(e.ad3_name);
    setad3_regex(e.ad3_regex);

    setAd1Err("");
    setAd2Err("");
    setAd3Err("");
    setOeratorErr("");
    setCaNumberErr("");
  };
  //state list
  const handleState = (e) => {
    console.log(e);
    setSelectedState(e.value);
    //district list
    getLpgDistrictListByState({ stateid: e.value }).then(
      (res) => {
        var result = res?.result;
        console.log(res);

        var districtLive = [];
        result?.forEach((element) => {
          var cm = element?.district?.toLowerCase();
          districtLive.push({
            value: element.districtid,
            label: element.district,
          });
        });
        setDistrictData(districtLive);
        console.log(districtLive);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  //district list
  const handleDistrict = (e) => {
    setSelectedDistrict(e.value);

    let data = {
      stateid: selectedState,
      districtid: e.value,
    };
    getLpgDistributor(data).then(
      (res) => {
        var result = res?.result;
        console.log(res);

        var distributorLive = [];
        result?.forEach((element) => {
          var cm = element?.distributor?.toLowerCase();
          distributorLive.push({
            value: element.distributorid,
            label: element.distributor,
          });
        });
        setDistributorData(distributorLive);
        console.log(distributorLive);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleDistributor = (e) => {
    setSelectedDistributor(e.value);
  };

  const viewBill = (e) => {
    let validate = true;
    e.preventDefault();
    let data = {
      canumber: caNumber,
      operator: selectedOprator,
    };

    if (data.operator === undefined || data?.operator?.trim() === "") {
      setOeratorErr("Please select operator");
      validate = false;
    }
    if (data?.canumber === undefined || data?.canumber?.trim() === "") {
      setCaNumberErr(`Please enter ${displayname}`);
      validate = false;
    }
    let dynamicRegex = new RegExp(regexForDisplayname);

    if (!dynamicRegex.test(data.canumber)) {
      setCaNumberErr(`Please enter valid ${displayname} `);
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
      setOeratorErr("");
      setCaNumberErr("");
      loader.classList.remove("d-none");
      fetchGasbookingDetails(data).then(
        (res) => {
          loader.classList.add("d-none");
          if (res.status === 200) {
            setOpenDetails(true);
            setDetails(res?.result);
            setAmount(res?.result?.amount);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  const billPayment = (e) => {
    e.preventDefault();
    let validate = true;
    let data = {
      canumber: caNumber,
      operator: selectedOprator,
      amount: amount,
      ad1: ad1,
      ad2: ad2,
      ad3: ad3,
      latitude: latitude,
      longitude: longitude,
      clientCode: clientCode,
      // selectedDistributor, selectedDistrict, selectedState
    };
    if (data.amount === undefined || data.amount === "") {
      setAmountErr("Please enter amount");
      validate = false;
    }

    if (validate) {
      loader.classList.remove("d-none");
      setAmountErr("");
      gasBooking(data).then(
        (res) => {
          loader.classList.add("d-none");
          if (res?.status === 200) {
            setModalOpen(true);
            setShow(true);
            setRechargeResult(res?.result);
          } else {
            swal("warning", res?.message, "warning");
          }
        },
        (err) => {
          swal("Error", "Server Error", "error");
        }
      );
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    window.location.reload();
  };
  return (
    <div className="container">
      <div className="row mt-3 mb-3 ms-1">
        <div className="col-md-6 col-6">
          <h4 className=" text-success">Gas Booking</h4>
        </div>
        <div className="col-md-6 col-6 text-end">
          <Link
            className="text-success border border-success rounded-2 p-2"
            to="/mobile/transactions"
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
              <label className="ms-2">Select Operator</label>
              <Select
                options={operatorList}
                components={{ Option: IconOption }}
                placeholder={
                  <div className="select-placeholder-text">Select options</div>
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
                  value={caNumber || ""}
                  placeholder={"Enter " + displayname}
                  className="form-control"
                  onChange={(e) => setCaNumber(e.target.value)}
                />

                <div className="text-danger">{canumberErr}</div>
              </div>
            ) : (
              <></>
            )}

            {ad1_d_name ? (
              <>
                {ad1_d_name === "State" ? (
                  <>
                    <div>
                      <div className="mt-3">
                        <div className="input-group mb-1 ms-2">
                          <label>Select State</label> <br />
                        </div>

                        <Select
                          options={stateData}
                          className="text-start"
                          placeholder={
                            <div className="select-placeholder-text">
                              Select state
                            </div>
                          }
                          value={stateData?.find(
                            (obj) => obj === selectedState
                          )}
                          onChange={handleState}
                          isSearchable={true}
                        />
                        <div className="text-danger">{stateErr}</div>
                      </div>
                    </div>
                    <div>
                      <div className="mt-3">
                        <div className="input-group mb-1 ms-2">
                          <label>Select District</label> <br />
                        </div>

                        <Select
                          options={districtData}
                          className="text-start"
                          placeholder={
                            <div className="select-placeholder-text">
                              Select district
                            </div>
                          }
                          value={districtData?.find(
                            (obj) => obj === selectedDistrict
                          )}
                          onChange={handleDistrict}
                          e
                          isSearchable={true}
                        />
                        <div className="text-danger">{districtErr}</div>
                      </div>
                    </div>
                    <div>
                      <div className="mt-3">
                        <div className="input-group mb-1 ms-2">
                          <label>Select Distributor</label> <br />
                        </div>

                        <Select
                          options={distributorData}
                          className="text-start"
                          placeholder={
                            <div className="select-placeholder-text">
                              Select distributor
                            </div>
                          }
                          value={distributorData?.find(
                            (obj) => obj === selectedDistributor
                          )}
                          onChange={handleDistributor}
                          e
                          isSearchable={true}
                        />
                        <div className="text-danger">{districtErr}</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-3">
                      <div className="input-group mb-1 ms-2">
                        <label>{ad1_d_name}</label> &nbsp;
                        <br />
                      </div>
                      <input
                        type="number"
                        value={ad1 || ""}
                        placeholder={"Enter " + ad1_d_name}
                        className="form-control"
                        onChange={(e) => setad1(e.target.value)}
                      />

                      <div className="text-danger">{ad1Err}</div>
                    </div>
                  </>
                )}
              </>
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
                  value={ad2 || ""}
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
                  value={ad3 || ""}
                  placeholder={"Enter " + ad3_d_name}
                  className="form-control"
                  onChange={(e) => setad3(e.target.value)}
                />

                <div className="text-danger">{ad3Err}</div>
              </div>
            ) : (
              <></>
            )}

            {openDetails ? (
              <>
                <div className="mt-3">
                  <div className="ms-2">
                    <label>Amount</label> &nbsp;
                  </div>

                  <input
                    type="number"
                    value={amount || ""}
                    placeholder="Enter amount"
                    className="form-control"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <div className="text-danger">{amountErr}</div>
                </div>

                <div className="mt-3">
                  <button
                    className="btn gradient_class w-100"
                    onClick={billPayment}
                  >
                    Proceed to recharge
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3">
                <button
                  className="btn btn-primary w-100"
                  style={{ backgroundColor: "#3d24f5" }}
                  onClick={viewBill}
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
                        <p>{rechargeResult?.message}</p>
                        <p>
                          <strong> Operator Id:</strong>&nbsp;
                          {rechargeResult?.operatorid}
                        </p>
                        <p>
                          <strong> Refference Id:</strong> &nbsp;
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
                </div>
              </div>
            </div>{" "}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default GasBooking;
