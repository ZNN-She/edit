import React, { useState } from "react";
import SmsBox from "./smsBox";

export default function App() {
  const [content, setContent] = useState(
    "尊敬的#BOSS_NAME#，您的”#CUSTOMER_NAME#”有#INVOICE_CUNT#发票需要邮寄给我，收件地址是：#CONSIGNEE_ADDRESS#，收件人#CONSIGNEE_NAME#，收件电话#CONSIGNEE_MOBILE#。"
  );

  const onChange = (content) => {
    setContent(content);
  };
  return (
    <div>
      <SmsBox onChange={onChange} defaultTemp={content} />

      <div style={{ marginTop: 20 }}>模板：{content}</div>
    </div>
  );
}
