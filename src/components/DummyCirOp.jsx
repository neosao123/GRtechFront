import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { getOprator } from "../networkcalls/MobileRechargeApi";
import DummyCircle from "./DummyCircle";

const { Option } = components;

function IconOption(props) {
  const {
    data: { label, Icon },
  } = props;

  return (
    <Option {...props}>
      <div className="flex items-center gap-2">
        <img src={Icon} className="optr" />
        <span>{label}</span>
      </div>
    </Option>
  );
}

const DummyCirOp = () => {
  const [selectedOprator, setSelectedOprator] = useState();
  const [operator, setOpenOPerator] = useState(false);
  const [operatorList, setOperatorList] = useState();

  const onClickHandle = () => {
    setOpenOPerator(true);
  };

  useEffect(() => {
    getOprator().then((data) => {
      //console.log(data.result.map((data) => data.image));
      var result = data.result;
      var operatorsLive = [];
      result.forEach((element) => {
        var nm = element.name.toLowerCase();

        if (nm !== "idea")
          operatorsLive.push({
            value: element.name,
            label: element.name,
            Icon: element.image,
          });
      });

      setOperatorList(operatorsLive);
    });
  }, []);

  function handleOperator(data) {
    setSelectedOprator(data);
  }

  return (
    <div>
      <div className="dropdown-container mb-3">
        <Select
          options={operatorList}
          components={{ Option: IconOption }}
          placeholder="Operator"
          value={selectedOprator}
          onChange={handleOperator}
          isSearchable={true}
        />
      </div>
    </div>
  );
};

export default DummyCirOp;
