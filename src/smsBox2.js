import React, { useEffect, useRef, useState } from "react";
import Header from "./header";
import { getVarsToMap, getVarsByTemp } from "./utils";
import "./styles.css";

// todo 后续变量也可以从外部输入，这样就可做到通用了
// props.onChange
// props.defaultTemp
function SmsBox(props) {
  const contentRef = useRef("");
  const tempRef = useRef("");
  const focusRef = useRef(false);
  const [previewText, setPreviewText] = useState("");
  const [number, setNumber] = useState(0);
  const [selection, setSelection] = useState(null);
  const [range, setRange] = useState(null);

  const onInput = (e) => {
    // console.log("onChange", e);
    const tempStr = htmlStrToTemp();
    tempRef.current = tempStr;

    const text = getPreviewTextTopTemp();
    setPreviewText(text);

    setNumber(getCount());

    try {
      const newRange = selection.createRange
        ? selection.createRange()
        : selection.getRangeAt(0);
      setRange(newRange);
    } catch (err) {
      console.error(err);
    }
    setSelection(
      window.getSelection ? window.getSelection() : document.selection
    );

    props.onChange(tempStr);
  };

  const onFocus = () => {
    focusRef.current = true;
    setTimeout(() => {
      const selection = window.getSelection
        ? window.getSelection()
        : document.selection;
      try {
        const newRange = selection.createRange
          ? selection.createRange()
          : selection.getRangeAt(0);
        setRange(newRange);
      } catch (err) {
        console.error(err);
      }
      setSelection(selection);
    });
  };

  const onBlur = (e) => {
    focusRef.current = true;
    setTimeout(() => {
      if (!focusRef.current) {
        setSelection(null);
      }
    }, 1);
  };

  const onClickAddVar = (itemVar) => {
    // console.log(range);
    // if (range === null) {
    //   contentRef.current.innerHTML = `<img class='mg-sms-img-var' data-key='${itemVar.key}' src='${itemVar.imgUrl}' >${contentRef.current.innerHTML}`;
    //   contentRef.current.focus();
    //   onInput();
    // } else {
    //   var d = range.createContextualFragment(
    //     `<img class='mg-sms-img-var' data-key='${itemVar.key}' src='${itemVar.imgUrl}' >`
    //   );
    //   range.collapse(false);
    //   var b = d.lastChild;
    //   range.insertNode(d);
    //   if (b) {
    //     range.setStartAfter(b);
    //   }
    //   window.getSelection().removeAllRanges();
    //   window.getSelection().addRange(range);
    //   contentRef.current.focus();
    //   onInput();
    // }
    console.log(selection);
    if (selection) {
      const anchorNode = selection.anchorNode;
      const anchorOffset = selection.anchorOffset;

      const range = selection.createRange
        ? selection.createRange()
        : selection.getRangeAt(0);
      // console.log(selection, range);
      var d = range.createContextualFragment(
        `<img class='mg-sms-img-var' data-key='${itemVar.key}' src='${itemVar.imgUrl}' >`
      );
      range.collapse(false);
      var b = d.lastChild;
      range.insertNode(d);
      if (b) {
        range.setStartAfter(b);
      }
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      contentRef.current.focus();
      focusRef.current = true;

      onInput();
    }
  };

  const onClickAddEmojs = (itemEmojs) => {
    if (selection) {
      const range = selection.createRange
        ? selection.createRange()
        : selection.getRangeAt(0);
      console.log("itemEmojs", itemEmojs);
      var d = range.createContextualFragment(`<span>${itemEmojs.value}</span>`);
      range.collapse(false);
      var b = d.lastChild;
      range.insertNode(d);
      if (b) {
        range.setStartAfter(b);
      }
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      contentRef.current.focus();
      focusRef.current = true;

      onInput();
    }
  };

  // 模板转html字符串 替换模板变量渲染页面
  const tempToHtmlStr = () => {
    let renderTemp = tempRef.current;
    const vars = getVarsByTemp(tempRef.current);
    const varMap = getVarsToMap();
    vars.forEach((item) => {
      const regExp = new RegExp(`${item}`, "g");
      renderTemp = renderTemp.replace(
        regExp,
        `<img class='mg-sms-img-var' data-key='${varMap[item].key}' src='${varMap[item].imgUrl}' >`
      );
    });
    // console.log(contentRef.current);
    return renderTemp;
  };

  // 内容html字符串转模板
  const htmlStrToTemp = () => {
    let htmlStr = contentRef.current.innerHTML;
    // console.log(htmlStr);
    const htmlVars = htmlStr.match(/\<img.*?\>/g);
    // console.log(htmlVars);
    htmlVars.forEach((item) => {
      const varKey = getVarsByTemp(item);
      // console.log(varKey);
      htmlStr = htmlStr.replace(item, varKey);
    });
    // console.log(htmlStr);
    return htmlStr;
  };

  // 获取预览文本
  const getPreviewTextTopTemp = () => {
    let previewText = tempRef.current;
    const tempVars = getVarsByTemp(tempRef.current);
    const varMap = getVarsToMap();
    tempVars.forEach((key) => {
      const regExp = new RegExp(`${key}`, "g");
      previewText = previewText.replace(regExp, varMap[key].previewText);
    });
    return previewText;
  };

  // 获取预计字数
  const getCount = () => {
    let num = tempRef.current.length;
    const tempVars = getVarsByTemp(tempRef.current);
    const varMap = getVarsToMap();
    tempVars.forEach((key) => {
      num = num - key.length + varMap[key].count;
    });
    return num;
  };

  const renderContent = () => {
    contentRef.current.innerHTML = tempToHtmlStr(); // todo 这里存在安全问题，会有xsf共计 用户输入取出来好像会被转义掉 <img > --- &lt;img &gt;
    const text = getPreviewTextTopTemp();
    setNumber(getCount());
    setPreviewText(text);
  };

  function initRangeObj() {
    if (
      typeof Range !== "undefined" &&
      !Range.prototype.createContextualFragment
    ) {
      Range.prototype.createContextualFragment = function (h) {
        var j = document.createDocumentFragment(),
          i = document.createElement("div");
        j.appendChild(i);
        i.outerHTML = h;
        return j;
      };
    }
    if (
      typeof TextRange !== "undefined" &&
      !TextRange.prototype.createContextualFragment
    ) {
      TextRange.prototype.createContextualFragment = function (h) {
        var j = document.createDocumentFragment(),
          i = document.createElement("div");
        j.appendChild(i);
        i.outerHTML = h;
        return j;
      };
    }
  }

  useEffect(() => {
    tempRef.current = props.defaultTemp;
    renderContent();
    initRangeObj(); // todo
  }, []);

  return (
    <div>
      <div className="mg-sms-box">
        <div className="mg-sms-header">
          <Header onSelectEmojd={onClickAddEmojs} onSelectVar={onClickAddVar} />
        </div>
        <div
          ref={contentRef}
          className="mg-sms-content"
          style={{ border: "1px solid #ddd" }}
          contenteditable="true"
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
        ></div>
        <div
          style={{ marginTop: 20, marginBottom: 20, border: "1px solod #ddd" }}
        >
          <span>预览：</span>
          {previewText}
        </div>

        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <span>预计字数：</span>
          <span style={{ color: "red" }}>{number}</span>
        </div>
      </div>
    </div>
  );
}

export default SmsBox;
