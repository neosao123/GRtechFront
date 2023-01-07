import React, { useEffect, useState } from "react";
import addmoney from "../../images/Add_Money/Group 5015.png";
import transaction from "../../images/Trasanction/Group 5013.png";
import complain from "../../images/Complain/Group 5014.png";
import { BillPaymentServices } from "../pages/BillPaymentServices";
import { Link } from "react-router-dom";
import ModalSearch from "../../utils/ModalSearch";
import {
  addclientwalletamount,
  getclientdashboard,
} from "../../networkcalls/ClientApi";
import Electricity from "../../images/Electricity/Group 5.png";
import Mobile from "../../images/Mobile_image/Group 5.png";
import GasBooking from "../../images/Gas_Booking/Group 5.png";
import LIC from "../../images/LIC_premium/Group 5.png";
import Broadband from "../../images/Broadband/Group 5.png";
import DTH from "../../images/DTH/Group 5.png";
import Fastag from "../../images/Fastag/Group 5.png";
import EMI from "../../images/EMI/Group 5.png";
import swal from "sweetalert";
import ModaladdMoney from "../../utils/ModaladdMoney";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Dashboard = () => {
  const loader = document.querySelector("div.loader");
  const [show, setShow] = useState(false);
  const [amountErr, setAmountErr] = useState();
  const [amount, setAmount] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [clientdata, setClientData] = useState();
  let clientCode = sessionStorage.getItem("clientCode");
  function handleWallet() {
    let validate = true;
    if (amount > 5000) {
      validate = false;
      setAmountErr("You are exceeding limit, (max limit Rs. 5000.00 /-)");
    }
    if (validate) {
      setAmountErr("");
      addclientwalletamount({ clientCode: clientCode, amount: amount }).then(
        (res) => {
          if (res.status === 200) {
            swal(
              res.message,
              `wallet Amount : ${res.walletamount}`,
              "success"
            ).then((res) => {
              if (res) {
                window.location.reload();

                setShow(false);
              }
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  useEffect(() => {
    let data = {
      clientCode: clientCode,
    };

    getclientdashboard(data).then(
      (res) => {
        setClientData(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <>
      <div
        className="container pt-3"
        id="unloader"
        style={{ height: "auto", width: "auto" }}
      >
        <nav style={{ bsBreadcrumbDivider: ">" }} aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active ">
              <Link to="/dashboard" className="text-decoration-none">
                {" "}
                <b>DashBoard</b>
              </Link>
            </li>
          </ol>
        </nav>
        <div className="row g-0">
          <div className="col-lg-4 col-sm-12 col-xs-12 col-md-6 wallet-balance-bg rounded-4">
            <div className="ms-4 mt-4">Wallet Balance</div>
            <h6 className="ms-4 wallet-balance ">
              ₹ {clientdata?.walletAmount}
            </h6>
            <br />
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col text-center  ">
                  <Link>
                    <img src={addmoney} alt="add money" onClick={handleShow} />{" "}
                    <br />
                  </Link>
                  <p>Add Money</p>
                </div>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Enter Amount to Add in wallet</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="number"
                          placeholder="Enter Amount"
                          onChange={(e) => setAmount(e.target.value)}
                          autoFocus
                        />
                        <span className="text-danger">{amountErr}</span>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="success" onClick={handleWallet}>
                      Add
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
                <div className="col-lg-4 col text-center">
                  <Link to={"/dashboard/trasactions"}>
                    <img src={transaction} alt="" /> <br />
                  </Link>
                  <p>Transaction</p>
                </div>
                <div className="col-lg-4 col text-center">
                  <Link>
                    <img src={complain} alt="" /> <br />
                  </Link>
                  <p>complain</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="row mt-2 ">
              <div className="col-md-2 mb-4  col-4 col-lg-2 text-center layout">
                <Link to="/mobile">
                  <div className="border-light services-header rounded-2  image-div">
                    <img className="pt-2 pb-2" src={Mobile} alt="icon" />
                  </div>
                </Link>
                <div className="mt-3" style={{ fontSize: "14px" }}>
                  Mobile
                </div>
              </div>

              <div className="col-md-2 mb-4  col-4 col-lg-2 text-center layout">
                <div className="border-light services-header rounded-2  image-div">
                  <Link to="/dth">
                    <img className="pt-2 pb-2" src={DTH} alt="icon" />
                  </Link>
                </div>
                <div className="mt-3" style={{ fontSize: "14px" }}>
                  DTH
                </div>
              </div>

              <div className="col-md-2 mb-4  col-4 col-lg-2 text-center layout">
                <Link to="/electricity">
                  <div className="border-light services-header rounded-2  image-div">
                    <img className="pt-2 pb-2" src={Electricity} alt="icon" />
                  </div>
                </Link>
                <div className="mt-3" style={{ fontSize: "14px" }}>
                  Electricity
                </div>
              </div>
              <div className="col-md-2 mb-4  col-4 col-lg-2 text-center layout">
                <Link to="/gasbooking">
                  <div className="border-light services-header rounded-2  image-div">
                    <img className="pt-2 pb-2" src={GasBooking} alt="icon" />
                  </div>
                </Link>

                <div className="mt-3" style={{ fontSize: "14px" }}>
                  GasBooking
                </div>
              </div>
              <div className="col-md-2 mb-4  col-4 col-lg-2 text-center layout">
                <Link to="lic">
                  <div className="border-light services-header rounded-2  image-div">
                    <img className="pt-2 pb-2" src={LIC} alt="icon" />
                  </div>
                </Link>
                <div className="mt-3" style={{ fontSize: "14px" }}>
                  LIC
                </div>
              </div>
              <div className="col-md-2 mb-4  col-4 col-lg-2 text-center layout">
                <Link to="/broadband">
                  <div className="border-light services-header rounded-2  image-div">
                    <img className="pt-2 pb-2" src={Broadband} alt="icon" />
                  </div>
                </Link>
                <div className="mt-3" style={{ fontSize: "14px" }}>
                  Broadband
                </div>
              </div>
              <div className="col-md-2 mb-4  col-4 col-lg-2 text-center layout">
                <div className="border-light services-header rounded-2  image-div">
                  <img className="pt-2 pb-2" src={Fastag} alt="icon" />
                </div>
                <div className="mt-3" style={{ fontSize: "14px" }}>
                  Fastag
                </div>
              </div>
              <div className="col-md-2 mb-4  col-4 col-lg-2 text-center layout">
                <div className="border-light services-header rounded-2  image-div">
                  <img className="pt-2 pb-2" src={EMI} alt="icon" />
                </div>
                <div className="mt-3" style={{ fontSize: "14px" }}>
                  EMI
                </div>
              </div>
              <div className="col-md-2 mb-4  col-4 col-lg-2 text-center layout">
                <div className="border-light services-header rounded-2  image-div">
                  <img className="pt-2 pb-2" src={Mobile} alt="icon" />
                </div>
                <div className="mt-3" style={{ fontSize: "14px" }}>
                  Post Paid
                </div>
              </div>
            </div>
          </div>
          <div
            className="container-fluid mt-3 p-4 rounded-4 "
            // style={{
            //   boxShadow: "#00000012 0pt 2pt 8pt",
            //   backgroundColor: "#FFFFFF",
            // }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
