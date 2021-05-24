const vars = [
  {
    key: "#CUSTOMER_NAME#", // key
    text: "企业名称", // 插入标签显示的名字
    previewText: "银河科技有限公司",
    memo: "企业名称", // 备注
    count: 8, // 如果需要计算字数，给一个默认的计算，用来显示大概的字数
    imgUrl: "./images/customerName.png" // 用来插入的占位图片
  },
  {
    key: "#BOSS_NAME#", // key
    text: "企业老板", // 插入标签显示的名字
    previewText: "张三",
    memo: "老板名字", // 备注
    count: 3, // 如果需要计算字数，给一个默认的计算，用来显示大概的字数
    imgUrl: "" // 用来插入的占位图片
  },
  {
    key: "#INVOICE_CUNT#", // key
    text: "发票张数", // 插入标签显示的名字
    previewText: "21",
    memo: "发票张数", // 备注
    count: 2, // 如果需要计算字数，给一个默认的计算，用来显示大概的字数
    imgUrl: "" // 用来插入的占位图片
  },
  {
    key: "#CONSIGNEE_ADDRESS#", // key
    text: "收件地址", // 插入标签显示的名字
    previewText: "浙江省杭州市滨江区那环路2313号税友大厦收",
    memo: "收件地址", // 备注
    count: 30, // 如果需要计算字数，给一个默认的计算，用来显示大概的字数
    imgUrl: "" // 用来插入的占位图片
  },
  {
    key: "#CONSIGNEE_NAME#", // key
    text: "收件人", // 插入标签显示的名字
    previewText: "张会计",
    memo: "收件人", // 备注
    count: 3, // 如果需要计算字数，给一个默认的计算，用来显示大概的字数
    imgUrl: "" // 用来插入的占位图片
  },
  {
    key: "#CONSIGNEE_MOBILE#", // key
    text: "收件人手机号", // 插入标签显示的名字
    previewText: "18322288888",
    memo: "收件人手机号", // 备注
    count: 1, // 如果需要计算字数，给一个默认的计算，用来显示大概的字数
    imgUrl: "" // 用来插入的占位图片
  }
];

export default vars;
