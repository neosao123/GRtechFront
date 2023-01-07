import React, { useState } from "react";
import { Link } from "react-router-dom";

import Select from "react-select";

const Lic = () => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState();

  const onClickHandle = () => {
    setOpen(true);
  };
  const optionList = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "blue", label: "Blue" },
    { value: "white", label: "White" },
  ];

  function handleSelect(data) {
    setSelectedOptions(data);
  }
  return (
    <div>
      <div className="container">
        <h4 className="mt-2 text-success">LIC Payment</h4>
        <div className="row">
          <div className="col-lg-4 col-md-6">
            {/* <h5>{data.operatorsData.name}</h5> */}
            <form action="" className="border border-dark p-4">
              <div className="dropdown-container mb-3">
                <Select
                  options={optionList}
                  placeholder="Operator Name"
                  value={selectedOptions}
                  onChange={handleSelect}
                  isSearchable={true}
                />
              </div>
              <div className="dropdown-container mb-3">
                <Select
                  options={optionList}
                  placeholder="Display Name"
                  value={selectedOptions}
                  onChange={handleSelect}
                  isSearchable={true}
                />
              </div>
              <div className="dropdown-container mb-3">
                <Select
                  options={optionList}
                  placeholder="Operator Name"
                  value={selectedOptions}
                  onChange={handleSelect}
                  isSearchable={true}
                />
              </div>
              <div className="dropdown-container mb-3">
                <Select
                  options={optionList}
                  placeholder="Operator Name"
                  value={selectedOptions}
                  onChange={handleSelect}
                  isSearchable={true}
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

export default Lic;
