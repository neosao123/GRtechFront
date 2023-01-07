import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { allTransactions } from "../../networkcalls/transactions";

const columns = [
  {
    name: "Message",
    selector: (row) => row.message,
  },
  {
    name: "Type",
    selector: (row) => (row.type == "Dr" ? "Debit" : "Credit"),
  },
];

const AllTransaction = () => {
  const loader = document.querySelector("div.loader");
  const [offset, setOffset] = useState(0);
  const [totalRows, setTotalRows] = useState();
  const [perPage, setPerPage] = useState(10);
  const [data, setData] = useState();
  let clientCode = sessionStorage.getItem("clientCode");
  function handlePerRowsChange(page) {
    loader.classList.remove("d-none");
    let rdata = { clientCode: clientCode, offset };
    allTransactions(rdata).then(
      (res) => {
        loader.classList.add("d-none");
        if (res.status === 200) {
          var result = res.result;
          setData(result);
          setTotalRows(res.totalRecords);
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
    allTransactions(data).then(
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

  return (
    <div>
      <div
        className="container mt-5" id="unloader"
        style={{
          boxShadow: "#00000012 0pt 2pt 8pt",
          backgroundColor: "#FFFFFF",
        }}
      >
        <h5 className="p-3 text-success">All Transactions</h5>
        <div className="container  mb-5 mt-5 text-dark">
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

export default AllTransaction;
