import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ElectricityBillPay = () => {
  const [open, setOpen] = useState(false);
  const { state } = useLocation();

  //   this hook is to store state value
  const [data] = useState(state);
  console.log(data);

  const onClickHandle = () => {
    setOpen(true);
  };
  return (
    <div>
      <div className="container">
        <h4 className="mt-2 text-success">Electricity Bill Payment</h4>
        <div className="row">
          <div className="col-lg-4 col-md-6 text-center">
            <h5>{data.operatorsData.name}</h5>
            <form action="" className="border border-dark p-4">
              <div className="mb-3">
                <input
                  type="text"
                  id=""
                  placeholder={data?.operatorsData?.displayname}
                  className="form-control"
                />
              </div>
              {data?.operatorsData?.ad1_name ? (
                <>
                  <div className="input-group mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Amount"
                      aria-label="Recipient's username with two button addons"
                    />
                  </div>
                  <div className="">
                    <Link>
                      <button
                        className="gradient_class w-100 btn"
                        onClick={(e) => onClickHandle(e)}
                      >
                        Pay Bill
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="">
                  <Link>
                    <button
                      className="gradient_class w-100 btn"
                      onClick={(e) => onClickHandle(e)}
                    >
                      Pay Bill
                    </button>
                  </Link>
                </div>
              )}
            </form>
          </div>
          <div className="col-lg-8">
            {open ? (
              <div className="text-center">
                <h5>Rs : Amount.00 /- </h5>
                <button className="btn gradient_class">Click to pay</button>
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

export default ElectricityBillPay;
