import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const ModalSearch = ({ BrowseDataResponse, dataFromSearch }) => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchTerm, setSerchTerm] = useState("");
  let datas = BrowseDataResponse;
  let bulkData = [];
  datas?.map((data) => {
    data?.tablPlans?.map((all) => {
      let rs = all.rs;
      let validity = all.validity;
      let Description = all.desc;
      let all_response = {
        rs: rs,
        validity: validity,
        Description: Description,
      };
      bulkData?.push(all_response);
    });
  });
  function handleSelect(e) {
    setShow(false);
    const boxes = document.querySelectorAll("button.chbtn");
    boxes.forEach((box) => {
      box.classList.remove("btn-success");
      box.classList.remove("text-white");
    });
    document
      .querySelector("button[id='" + e.target.id + "']")
      .classList.add("btn-success", "text-white");
    dataFromSearch(e);
  }

  return (
    <>
      <div className="  rounded-4" onClick={handleShow}>
        <div className=" mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            style={{ cursor: "pointer" }}
          />
        </div>
        {/* <div className="pt-2">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div> */}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search Plans</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Search Plans"
                autoFocus
                onChange={(e) => {
                  setSerchTerm(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
          <div className="card">
            {bulkData
              .filter((data) => {
                if (searchTerm === "") {
                  return;
                } else if (data?.rs?.includes(searchTerm.toLowerCase())) {
                  return data;
                }
                //  else if (
                //   data?.Description?.includes(searchTerm)
                // ) {
                //   return data;
                // }
                // else if (data?.validity?.includes(searchTerm.toLowerCase())) {
                //   return data;
                // }
              })
              .map((data, key) => {
                return (
                  <div
                    className="card m-1 p-1 "
                    style={{ cursor: "pointer" }}
                    onClick={(e) => key}
                    id={key}
                  >
                    <div className="row ">
                      <div className="col-9 p-2">
                        <div className="p-1">
                          <strong> Rs : </strong> {data.rs}.00/-
                        </div>
                        <div className="p-1">
                          <strong>Description : </strong> {data.Description}
                        </div>
                        <div className="p-1">
                          <strong>Validity : </strong>
                          {data.validity}
                        </div>
                      </div>
                      <div className="col-3 p-2 mt-3">
                        <button
                          className="btn btn-outline-success chbtn"
                          onClick={handleSelect}
                          id={key}
                          data-amount={data.rs}
                          data-desc={data.Description}
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default ModalSearch;
