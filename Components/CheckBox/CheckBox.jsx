import React from "react";
import Style from "./CheckBox.module.css";

const CheckBox = ({ category, setCategory }) => {
  return (
    <label
      class={Style.material_checkbox}
      onClick={() => setCategory(category)}
    >
      <input type="checkbox" />
      <span class={Style.checkmark}></span>
      {category}
    </label>
  );
};

export default CheckBox;
