import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getelectricityoperator } from "../../networkcalls/ElectricityApi";
import Skeleton from "../../utils/Skeleton";
const Electricity = () => {
  const [data, setData] = useState();
  const [searchTerm, setSerchTerm] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    getelectricityoperator({ mode: "online" }).then(
      (res) => {
        setData(res.data.result);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  function truncateString(string, limit) {
    if (string.length > limit) {
      return string.substring(0, limit) + "...";
    } else {
      return string;
    }
  }

  return (
    <div>
      <div className="container">
        <div
          className="row mt-3 scrollbar scrollbar--light"
          data-bs-spy="scroll"
          style={{ overflowY: "auto", maxHeight: "500px" }}
        >
          <h5 className="App">Electricity Bill Payment</h5>
          <div className="col-md-2 "></div>
          <div className="col-md-8 ">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Search by Operator"
                aria-label="Recipient's username with two button addons"
                onChange={(e) => {
                  setSerchTerm(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-md-2"></div>
          {data ? (
            data
              .filter((data) => {
                if (searchTerm === "") {
                  return data;
                } else if (data.name.includes(searchTerm)) {
                  return data;
                }
              })
              .map((data) => {
                return (
                  <div className="col-md-3 col-lg-3 p-2">
                    <div className="card">
                      <div
                        className="card-body services-header"
                        style={{cursor:"pointer"}}
                        onClick={(e) =>
                          navigate("/electricity/bill", {
                            state: { operatorsData: data },
                            replace: true,
                          })
                        }
                      >
                        {truncateString(data.name, 20)}
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <div>
              {" "}
              <Skeleton />{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Electricity;
