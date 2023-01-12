import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import swal from "sweetalert";
import { retryDthRecharge } from "../../networkcalls/dthApi";
import { dthTransactions } from "../../networkcalls/transactions";

const DthTransactions = () => {
  const loader = document.querySelector("div.loader");
  const [transactionData, setTransactionData] = useState();
  const [referenceId, setReferenceId] = useState("");
  const [dthNumber, setDthNumber] = useState("");
  const [rechargeStatus, setRechargeStatus] = useState("");
  const [offset, setOffset] = useState(0);
  const [totalRows, setTotalRows] = useState();
  const [perPage, setPerPage] = useState(10);
  let clientCode = sessionStorage.getItem("clientCode");
  const handleRetryDth = (referenceid) => {
    let rechargeData = {
      referenceid: referenceid,
      clientCode: clientCode,
    };
    console.log(rechargeData);
    loader.classList.remove("d-none");
    retryDthRecharge(rechargeData).then((res) => {
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
    });
  };
  const columns = [
    {
      name: "Reference Id",
      selector: (row) => row.referenceid,
    },
    {
      name: "DTH Number",
      selector: (row) => row.dthnumber,
    },
    {
      name: "Recharge Amount",
      selector: (row) => row.rechargeamount,
    },
    {
      name: "Recharge Date",
      selector: (row) => row.rechargedate,
    },
    {
      name: "Commission Per",
      selector: (row) => row.commissionper,
    },
    {
      name: "Commission Amount",
      selector: (row) => row.commissionamount,
    },
    {
      name: "Recharge Status",
      selector: (row) =>
        row.rechargestatus === "success" ? (
          <button
            className="btn btn-sm btn-success"
            onClick={(e) => handleRetryDth(row.referenceid)}
          >
            check status
          </button>
        ) : (
          <>
            <button
              className="btn btn-sm btn-success"
              onClick={(e) => handleRetryDth(row.referenceid)}
            >
              check status
            </button>
          </>
        ),
    },
  ];

  function handlePerRowsChange(page) {
    var ofs = (page - 1) * 10;
    let data = { clientCode: clientCode, offset: ofs };
    dthTransactions(data).then(
      (res) => {
        if (res.status === 200) {
          setTransactionData(res.result);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  function handlePageChange(page) {
    var ofs = (page - 1) * 10;
    let data = { clientCode: clientCode, offset: ofs };
    dthTransactions(data).then(
      (res) => {
        if (res.status === 200) {
          setTransactionData(res.result);
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

  function handleClear(e) {
    e.preventDefault();
    loader.classList.remove("d-none");
    setTimeout(() => {
      loader.classList.add("d-none");
    }, 500);
    document.getElementById("refid").value = null;
    document.getElementById("mobile").value = null;
    document.getElementById("rechargestatus").value = null;
    setReferenceId("");
    setDthNumber("");
    setRechargeStatus("");
    handlePageChange();
  }

  function handleSearch(e) {
    loader.classList.remove("d-none");
    e.preventDefault();
    let data = {
      referenceid: referenceId,
      rechargestatus: rechargeStatus,
      dthnumber: dthNumber,
      clientCode: clientCode,
    };

    dthTransactions(data).then(
      (res) => {
        loader.classList.add("d-none");
        setTransactionData(res?.result);
        setTotalRows(res?.result?.length);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  return (
    <>
      <div className="mb-5">
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
              <div className="row form-row mb-2 g-0">
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
                  <label>DTH Number :</label>
                  <input
                    type="number"
                    onChange={(e) => setDthNumber(e.target.value)}
                    id="mobile"
                    placeholder="search by DTH Number"
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
                <button
                  className="btn btn-outline-danger "
                  onClick={handleClear}
                >
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
          <h5 className="pt-3 text-success">DTH Transactions</h5>

          <div className="container mb-2 mt-4 text-dark ">
            <DataTable
              className="border border-dark"
              columns={columns}
              data={transactionData}
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
    </>
  );
};

export default DthTransactions;
