import React, { useState } from "react";
import varData from "./varData";
import "./var.css";

function Var(props) {
  const [visible, setVisible] = useState(false);

  const onMouseOut = () => {
    setVisible(false);
  };

  const onMouseOver = () => {
    setVisible(true);
  };

  const onClickAddVar = (varItem) => {
    props.onSelect && props.onSelect(varItem);
  };

  return (
    <div
      className="mg-sms-header_item mg-sms-var"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <div className="mg-sms-var__icon">变量</div>
      <div
        className="mg-sms-var__content"
        style={{ display: `${visible ? "block" : "none"}` }}
      >
        {varData.map((item) => (
          <img
            onClick={() => onClickAddVar(item)}
            key={item.key}
            className="mg-sms-var__content-item"
            data-key={item.key}
            src={item.imgUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default Var;
