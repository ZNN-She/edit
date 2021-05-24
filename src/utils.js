import vars from "./varData";

// 转换成map对象
function getVarsToMap() {
  const map = {};
  vars.forEach((item) => (map[item.key] = item));
  return map;
}

// 获取单个变量对象
function getVarByKey(key) {
  return vars.filter((item) => item.key === key)[0];
}

// 提取模板变量
function getVarsByTemp(tempStr) {
  // console.log(tempStr);
  return tempStr.match(/\#.*?\#/g);
}

export { getVarsToMap, getVarByKey, getVarsByTemp };
