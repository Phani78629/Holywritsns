import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
export default function MultipleStepsComponent(props) {
  const [multiStepInputArray, updateMultiStepInputArray] = useState([
    { firstInputValue: null, secondInputValue: null },
  ]);
  function updateInputArray(objectKey, objectValue, index) {
    let inputObject = {};
    if (multiStepInputArray[index]) {
      inputObject = multiStepInputArray[index];
    }
    inputObject[objectKey] = objectValue;
    const tempStepInputArray = [...multiStepInputArray];
    tempStepInputArray[index] = inputObject;
    updateMultiStepInputArray(tempStepInputArray);
    props.formHandlerFunction(props.handlerParam, tempStepInputArray);
  }
  function renderFirstInput(index, element) {
    return (
      <div className="flex flex-col items-start">
        <label htmlFor="first-text-input">{props.firstInputLabelName}</label>
        <input
          type="text"
          id="first-text-input"
          className="border rounded mt-1 py-1 px-2 w-52"
          placeholder={props.firstInputPlaceholder}
          onChange={(e) =>
            updateInputArray("firstInputValue", e.target.value, index)
          }
        />
      </div>
    );
  }
  function renderSecondInput(index, element) {
    return (
      <div className="flex flex-col items-start ml-4">
        <label htmlFor="second-text-input">{props.secondInputLabelName}</label>
        <input
          type="text"
          id="second-text-input"
          className="border rounded mt-1 py-1 px-2 w-52"
          placeholder={props.secondInputPlaceholder}
          onChange={(e) =>
            updateInputArray("secondInputValue", e.target.value, index)
          }
        />
      </div>
    );
  }
  function renderThirdInput(index, element) {
    if (props.thirdInputLabelName && props.thirdInputPlaceholder) {
      return (
        <div className="flex flex-col items-start ml-4">
          <label htmlFor="thirs-text-input">{props.thirdInputLabelName}</label>
          <input
            type="text"
            id="second-text-input"
            className="border rounded mt-1 py-1 px-2 w-52"
            placeholder={props.thirdInputPlaceholder}
            onChange={(e) =>
              updateInputArray("thirdInputValue", e.target.value, index)
            }
          />
        </div>
      );
    }
  }
  function renderInstallationSteps() {
    return multiStepInputArray.map((element, index) => {
      return (
        <div className="flex mt-2" key={index}>
          {renderFirstInput(index, element)}
          {renderSecondInput(index, element)}
          {renderThirdInput(index, element)}
        </div>
      );
    });
  }
  function addAnotherStep() {
    const objectToBeAdded = { firstInputValue: null, secondInputValue: null };
    updateMultiStepInputArray([...multiStepInputArray, objectToBeAdded]);
  }
  return (
    <>
      {renderInstallationSteps()}
      <button
        className="bg-indigo-800 text-white px-3 py-1 rounded my-4"
        onClick={() => addAnotherStep()}
      >
        <div className="flex items-center">
          <FiPlusCircle />
          <span className="ml-1">Add another {props.buttonTitle}</span>
        </div>
      </button>
    </>
  );
}
