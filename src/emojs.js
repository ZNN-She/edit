import React, { useState } from "react";
import EMOJS from "./emojsData";
import "./emojs.css";

// props.onSelect
function Emojs(props) {
  const [visible, setVisible] = useState(false);

  const onMouseOut = () => {
    setVisible(false);
  };

  const onMouseOver = () => {
    setVisible(true);
  };

  const onClickEmojsItem = (emojsItem) => {
    props.onSelect && props.onSelect(emojsItem);
  };

  return (
    <div
      className="mg-sms-header_item mg-sms-emojs"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <div className="mg-sms-emojs__icon">
        {String.fromCodePoint("0x1f601")}
      </div>

      <div
        className="mg-sms-emojs__content"
        style={{ display: `${visible ? "block" : "none"}` }}
      >
        {EMOJS.map((item) => (
          <div
            className="mg-sms-emojs__content-item"
            onClick={() => onClickEmojsItem(item)}
          >
            {String.fromCodePoint(item.code)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Emojs;
