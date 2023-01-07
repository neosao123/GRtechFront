import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getCircle } from "../networkcalls/MobileRechargeApi";

const DummyCircle = () => {
  const [opencircle, setOpenCircle] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState();
  const [circleList, setCircleList] = useState();

  useEffect(() => {
    getCircle().then(
      (data) => {
        var result = data.circle;
        console.log(result);
        var circleLive = [];
        result.forEach((element) => {
          var cm = element?.toLowerCase();

          if (cm !== "idea")
            circleLive.push({
              value: element,
              label: element,
            });
        });
        setCircleList(circleLive);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  function handleSelectCircle(data) {
    setSelectedCircle(data);
  }
  return (
    <div>
      <Select
        options={circleList}
        placeholder="Circle"
        value={selectedCircle}
        onChange={handleSelectCircle}
        isSearchable={true}
      />
    </div>
  );
};

export default DummyCircle;
