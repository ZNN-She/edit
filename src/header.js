import React from "react";
import Emojs from "./emojs";
import Var from "./var";
import "./header.css";

function Header(props) {
  const onSelectEmojd = (emojsItem) => {
    props.onSelectEmojd && props.onSelectEmojd(emojsItem);
  };

  const onSelectVar = (varItem) => {
    props.onSelectVar && props.onSelectVar(varItem);
  };

  return (
    <div className="mg-sms-header">
      <Emojs onSelect={onSelectEmojd} />
      <Var onSelect={onSelectVar} />
    </div>
  );
}

export default Header;
