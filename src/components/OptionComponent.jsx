import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import InputFieldComponent from "./InputFieldComponent";

const OptionComponent = forwardRef(function OptionComponent(
  { defaultSource, defaultTarget },
  parentRef
) {
  const [optionValues, setOptionValues] = useState([]);
  const optionsRefs = useRef({});

  const [addOptions, setAddOptions] = useState(false);

  useEffect(() => {
    let values = [];

    if (defaultSource.allowedValues && defaultSource.allowedValues.length > 0) {
      values = [...defaultSource.allowedValues];
    }

    setOptionValues(values);
  }, [defaultSource]);

  useEffect(() => {
    if (optionValues && optionValues.length === 0) {
      setAddOptions(false);
    }
  }, [optionValues]);

  useImperativeHandle(parentRef, () => {
    return {
      getOptionFieldsData() {
        return compileOptionFieldsData();
      },
    };
  });

  function compileOptionFieldsData() {
    if (!addOptions) return null;

    let resultArray = Object.values(optionsRefs.current).map((ref) => {
      if (!ref) return;

      let result = ref.getInputFieldData();

      return result;
    });

    if (resultArray.length === 0) return null;

    let resultObj = {};

    resultArray.forEach((obj) => {
      if (!obj) return;
      resultObj = {
        ...resultObj,
        [obj.source]: obj.target,
      };
    });

    return resultObj;
  }

  function getEmptyOption() {
    return { id: crypto.randomUUID(), label: null, value: null };
  }

  // Function to add a new child component dynamically
  const addOptionToState = () => {
    setAddOptions(true);
    let emptyOption = getEmptyOption();
    setOptionValues((prevOptions) => [...prevOptions, emptyOption]);
  };

  // Function to remove a child component
  const removeOptionFromState = (optionId) => {
    setOptionValues((prevOptions) =>
      prevOptions.filter((item) => item.id !== optionId)
    );
    // Remove the ref associated with the removed child
    delete optionsRefs.current[optionId];
  };
  return (
    <div className=" w-[95%] border border-red-300 mx-auto my-2 ">
      <div className="my-2">
        <button className=" bg-red-100 px-4 py-2 " onClick={addOptionToState}>
          Add Options
        </button>
      </div>

      <div>
        {addOptions &&
          optionValues.length > 0 &&
          optionValues.map((item) => (
            <InputFieldComponent
              key={item.id}
              id={item.id}
              defaultSource={"default source option"}
              defaultTarget={"default target option"}
              onOptionDelete={removeOptionFromState}
              ref={(ref) => (optionsRefs.current[item.id] = ref)}
            />
          ))}
      </div>
    </div>
  );
});
export default OptionComponent;
