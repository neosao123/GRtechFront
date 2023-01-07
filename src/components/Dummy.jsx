import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { browseplan } from "../networkcalls/MobileRechargeApi";

const Dummy = () => {
  const [BrowseDataResponse, setBrowseDataResponse] = useState();
  function datafetch() {
    let browsedata = {
      circle: "Maharashtra Goa",
      operator: "Airtel",
      mobileNumber: "9156873307",
    };
    browseplan(browsedata).then(
      (res) => {
        setBrowseDataResponse(res.result);
        console.log(res.result);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  return (
    <>
      <button onClick={(e) => datafetch()}>click</button>

      <Tabs>
        <TabList>
          {BrowseDataResponse.map((data) => {
            return (
              <>
                <Tab>{data.tabTitle}</Tab>
              </>
            );
          })}
        </TabList>

        <TabPanel>
          {BrowseDataResponse?.map((data) => {
            data?.tablPlans?.map((plan) => {
              return (
                <>
                  <h2>{plan.rs}</h2>
                  <h2>{plan.desc}</h2>
                  <h2>{plan.desc}</h2>
                </>
              );
            });
          })}
        </TabPanel>
      </Tabs>
    </>
  );
};

export default Dummy;
