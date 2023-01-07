import React, { useEffect, useState } from "react";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import {
  browseplan,
  getCircle,
  getOprator,
  getPhoneInfo,
  mobileReacharge,
} from "../../networkcalls/MobileRechargeApi";
import Select, { components } from "react-select";
import ModalSearch from "../../utils/ModalSearch";
import swal from "sweetalert";

const { Option } = components;

function IconOption(props) {
  const {
    data: { value, label, Icon, id },
  } = props;

  return (
    <Option {...props} value={value}>
      <div className="d-flex align-items-center justify-content-start">
        <img src={Icon} id={id} className="optr" />
        <span className="">{label}</span>
      </div>
    </Option>
  );
}

const MobileRecharge = () => {
  const [operatorList, setOperatorList] = useState();

  useEffect(() => {
    getOprator().then((data) => {
      var result = data.result;
      var operatorsLive = [];
      result.forEach((element) => {
        var nm = element.name.toLowerCase();
        if (nm !== "idea")
          operatorsLive.push({
            value: element.name,
            label: element.name,
            Icon: element.image,
            id: element.id,
          });
      });
      setOperatorList(operatorsLive);
    });
  }, []);

  const handle = (e) => {
    e.preventDefault();
    var selOpr = operatorList.filter((operator) => {
      if (operator.value === "Jio") {
        return operator;
      }
    });
    if (selOpr.length > 0 && selOpr !== null) {
      var opr = selOpr[0];
      console.log("Filtered operator is => ", opr.id);
    }
  };

  return (
    <div className="text-center">
      <button onClick={handle}>Set Operator</button>
    </div>
  );
};

export default MobileRecharge;
