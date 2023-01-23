import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { retryMobileRecharge } from "../../networkcalls/MobileRechargeApi";
import { mobileTransactions } from "../../networkcalls/transactions";
import Complain from "../Complain/Complain";

const MobileTransaction = () => {
  // sessionStorage clientCode must be used
  let navigate = useNavigate();
  const loader = document.querySelector("div.loader");
  const [transactionList, setTransactionList] = useState();
  const [data, setData] = useState();
  const [referenceId, setReferenceId] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [rechargeStatus, setRechargeStatus] = useState("");
  const [offset, setOffset] = useState(0);

  const [totalRows, setTotalRows] = useState();
  const [perPage, setPerPage] = useState(10);
  let clientCode = sessionStorage.getItem("clientCode");

  const handleRetryMobileRecharge = (e, referenceid) => {
    let retryRechargeData = {
      referenceid: referenceid,
      clientCode: clientCode,
    };
    loader.classList.remove("d-none");

    retryMobileRecharge(retryRechargeData).then(
      (res) => {
        loader.classList.add("d-none");
        if (res.status === 200) {
          swal("Success", res.message, "success").then((ok) => {
            if (ok) {
              window.location.reload();
            }
          });
        } else {
          swal("Failed", res.message, "warning");
        }
      },
      (err) => {}
    );
  };
  const handleComplain = (e, referenceid) => {
    console.log(referenceid);
    navigate("/dashboard/complain", { state: { referenceId: referenceid } });
  };

  const columns = [
    {
      name: "Reference Id",
      selector: (row) => row.referenceId,
    },
    {
      name: "Mobile Number",
      selector: (row) => row.mobileNumber,
    },
    {
      name: "Recharge Amount",
      selector: (row) => row.rechargeAmount,
    },
    {
      name: "Recharge Date",
      selector: (row) => row.rechargeDate,
    },
    {
      name: "Commission Per",
      selector: (row) => row.commissionPer,
    },
    {
      name: "Commission Amount",
      selector: (row) => row.commissionAmount,
    },
    {
      name: "Recharge Status",
      selector: (row) =>
        row.rechargeStatus === "success" ? (
          <span className="badge bg-success ">Success</span>
        ) : (
          <>
            <button
              className="btn btn-sm btn-success"
              onClick={(e) => handleRetryMobileRecharge(e, row.referenceId)}
            >
              Check Status
            </button>
          </>
        ),
    },
    {
      name: "Raise a complain",
      selector: (row) =>
        row.rechargeStatus === "success" ? (
          <span className="badge bg-success">Success</span>
        ) : (
          // <button
          //   className="btn btn-sm btn-success"
          //   onClick={(e) => handleComplain(e, row.referenceId)}
          // >
          //   Raise Complain{" "}
          // </button>
          <>
            <button
              className="btn btn-sm btn-success"
              onClick={(e) => handleComplain(e, row.referenceId)}
            >
              Raise Complain{" "}
            </button>
          </>
        ),
    },
  ];

  function handlePerRowsChange(page) {
    let data = { clientCode: clientCode, offset };
    mobileTransactions(data).then(
      (res) => {
        setData(res?.result);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  function handlePageChange(page) {
    var ofs = (page - 1) * 10;
    let data = { clientCode: clientCode, offset: ofs };
    mobileTransactions(data).then(
      (res) => {
        if (res.status === 200) {
          setData(res.result);
          setTotalRows(res.totalRecords);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  useEffect(() => {
    handlePerRowsChange();
  }, []);
  function handleSearch(e) {
    loader.classList.remove("d-none");
    e.preventDefault();
    let data = {
      referenceid: referenceId,
      rechargestatus: rechargeStatus,
      mobilenumber: mobilenumber,
      clientCode: clientCode,
    };
    mobileTransactions(data).then(
      (res) => {
        loader.classList.add("d-none");
        setData(res?.result);
        setTotalRows(res?.result?.length);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  function handleClear(e) {
    loader.classList.remove("d-none");
    setTimeout(() => {
      loader.classList.add("d-none");
    }, 500);
    e.preventDefault();
    document.getElementById("refid").value = null;
    document.getElementById("mobile").value = null;
    document.getElementById("rechargestatus").value = null;
    handlePerRowsChange();
    setRechargeStatus("");
    setReferenceId("");
    setMobilenumber("");
  }

  return (
    <div className="mb-5" id="unloader">
      <div
        className="container card mb-3 mt-5 "
        style={{
          boxShadow: "#00000012 0pt 2pt 8pt",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div className="row card-body">
          <h5>Filter</h5>
          <hr />
          <form className="form-horizontal">
            <div className="row form-row mb-4 g-0">
              <div className="col-md-3 mb-1 form-group">
                <label>Reference Id :</label>
                <input
                  type="number"
                  id="refid"
                  placeholder="search by Reference Id"
                  className="form-control"
                  onChange={(e) => setReferenceId(e.target.value)}
                />
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-3 form-group mb-1">
                <label>Mobile Number :</label>
                <input
                  type="number"
                  onChange={(e) => setMobilenumber(e.target.value)}
                  id="mobile"
                  placeholder="search by Mobile Number"
                  className="form-control"
                />
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-3 form-group mb-1">
                <label>Recharge Status :</label>
                <input
                  type="text"
                  onChange={(e) => setRechargeStatus(e.target.value)}
                  id="rechargestatus"
                  placeholder="search by Recharge Status"
                  className="form-control"
                />
              </div>
              <div className="col-md-1"></div>
            </div>
            <hr />
            <div className="d-flex App">
              <button
                className="btn btn-outline-success me-2"
                onClick={handleSearch}
              >
                Search
              </button>
              <button className="btn btn-outline-danger " onClick={handleClear}>
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
      <br />
      <div
        className="container"
        style={{
          boxShadow: "#00000012 0pt 2pt 8pt",
          backgroundColor: "#FFFFFF",
        }}
      >
        <h5 className="p-3 text-success">Mobile Transactions</h5>

        <div className="App">
          <DataTable
            className="border border-dark"
            columns={columns}
            data={data}
            highlightOnHover
            pagination
            paginationServer
            paginationRowsPerPageOptions={[]}
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileTransaction;
