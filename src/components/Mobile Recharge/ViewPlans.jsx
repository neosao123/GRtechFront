import React from "react";

const ViewPlans = () => {
  return (
    <div>
      <h5 className="text-success mt-3 mb-3">View Plans</h5>

      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            TOPUP
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            3G/4G
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#contact"
            type="button"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            COMBO
          </button>
        </li>
      </ul>
      <br />
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <div className="container-fluid">
            <div className="row services-header p-3">
              <div className="col-md-2 col-3">
                {" "}
                Rs.<strong>155.00</strong>/-
              </div>
              <div className="col-md-8 col-6">
                Enjoy TRULY unlimited Local, STD & Roaming calls on any network,
                1 GB data, <br />
                Validity :<strong> 24 days</strong>
              </div>
              <div className="col-md-2 col-3">
                <button className="btn btn-outline-success">Select</button>
              </div>
            </div>
          </div>
          <hr className="square" style={{}} />
          <div className="container-fluid">
            <div className="row services-header p-3">
              <div className="col-md-2 col-3">
                {" "}
                Rs.<strong>155.00</strong>/-
              </div>
              <div className="col-md-8 col-6">
                Enjoy TRULY unlimited Local, STD & Roaming calls on any network,
                1 GB data, <br />
                Validity :<strong> 24 days</strong>
              </div>
              <div className="col-md-2 col-3">
                <button className="btn btn-outline-success">Select</button>
              </div>
            </div>
          </div>
          <hr />
          <div className="container-fluid">
            <div className="row services-header p-3">
              <div className="col-md-2 col-3">
                {" "}
                Rs.<strong>155.00</strong>/-
              </div>
              <div className="col-md-8 col-6">
                Enjoy TRULY unlimited Local, STD & Roaming calls on any network,
                1 GB data, <br />
                Validity :<strong> 24 days</strong>
              </div>
              <div className="col-md-2 col-3">
                <button className="btn btn-outline-success">Select</button>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div
          class="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          ...
        </div>
        <div
          class="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          ...
        </div>
      </div>
    </div>
  );
};

export default ViewPlans;
