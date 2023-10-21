import React from "react";
import { FormSVG, Lock } from "../SVG/index";
import Style from "./Form.module.css";
import { CheckBox } from "../index";

const Form = ({
  setFile,
  setDisplay,
  handleFormFieldChange,
  handleSubmit,
  setCategory,
}) => {
  const categories = ["Nature", "Artificial", "Animal"];
  return (
    <div class={Style.card}>
      <div class={Style.card2}>
        <form class={Style.form}>
          <p id="heading" className={Style.heading}>
            Upload Image Details
          </p>
          <div class={Style.field}>
            <FormSVG styleClass={Style.input_icon} />
            <input
              type="text"
              class={Style.input_field}
              placeholder="title"
              autoComplete="off"
              onChange={(e) => handleFormFieldChange("title", e)}
            />
          </div>
          <div class={Style.field}>
            <Lock styleClass={Style.input_icon} />
            <textarea
              type="description"
              class={`${Style.textarea} ${Style.input_field} `}
              placeholder="description"
              onChange={(e) => handleFormFieldChange("description", e)}
            ></textarea>
          </div>
          <div class={Style.field}>
            <FormSVG styleClass={Style.input_icon} />
            <input
              type="email"
              class={Style.input_field}
              placeholder="email"
              onChange={(e) => handleFormFieldChange("email", e)}
            />
          </div>
          <p className={Style.second}>Category</p>
          <div className={Style.category}>
            {categories.map((category,i) => (
                <CheckBox
                  setCategory={setCategory}
                  key={i + 1}
                  category={category}
                />
            ))}
          </div>
          <div class={Style.btn}>
            <button
              class={Style.button1}
              onClick={() => (setFile(null), setDisplay(null))}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </button>
          </div>
          <button onClick={(e) => handleSubmit(e)} class={Style.button3}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
