import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { fetchComplainList } from "../../networkcalls/Complain";

const ComplainList = () => {
  const [data, setData] = useState();
  const [totalRows, setTotalRows] = useState();
  let clientCode = sessionStorage.getItem("clientCode");

  useEffect(() => {
    fetchComplainList({ clientCode: clientCode }).then(
      (res) => {
        setData(res.result);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  function handlePerRowsChange(page) {
    var ofs = (page - 1) * 10;
    let data = { clientCode: clientCode, offset: ofs };
    fetchComplainList(data).then(
      (res) => {
        if (res.status === 200) {
          setData(res.result);
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
    fetchComplainList(data).then(
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

  const columns = [
    {
      name: "Complain Category",
      selector: (row) => row.categoryTitle,
    },
    {
      name: "Ticket No.",
      selector: (row) => row.transactionNumber,
    },

    {
      name: "Status",
      selector: (row) => <span className="badge bg-warning">{row.status}</span>,
    },
    {
      name: "Raised Date",
      selector: (row) => row.raisedDate,
    },
    {
      name: "Complaint Details",
      selector: (row) => (
        <button
          className="btn btn-sm btn-success"
          onClick={(e) => handleComplainDetails(e, row.complaintCode)}
        >
          View Complain
        </button>
      ),
    },
  ];
  const handleComplainDetails = (e, complainCode) => {
    console.log(complainCode);
  };
  return (
    <div className="">
      <h5 className="text-success m-2">Complain list</h5>
      <div className="myprofile">
        <DataTable
          className="border "
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
  );
};

export default ComplainList;
