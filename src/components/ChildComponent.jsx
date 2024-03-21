import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import InputFieldComponent from "./InputFieldComponent";
import OptionComponent from "./OptionComponent";

/**
 * defaultSource and defaultTarget are objects in real app.
 * Whether the target field is required or not can be found inside defaultTarget.
 */

const ChildComponent = forwardRef(function ChildComponent(
  { id, name, defaultSource, defaultTarget, deleteChild },
  parentRef
) {
  const fieldRef = useRef(null);

  const [addOptions, setAddOptions] = useState(false);

  const [optionValues, setOptionValues] = useState();

  useEffect(() => {
    let values = [];

    if (defaultSource.allowedValues && defaultSource.allowedValues.length > 0) {
      values = [...defaultSource.allowedValues];
    }

    setOptionValues(values);
  }, [defaultSource]);

  useImperativeHandle(parentRef, () => {
    return {
      getFormData() {
        return {
          [getSourceString()]: {
            targetField: getTargetString(),
          },
        };
      },
    };
  });

  function compileInputFieldData() {
    if (!fieldRef || !fieldRef.current) return null;

    let obj = fieldRef.current.getInputFieldData();

    return {
      [obj.source]: {
        targetFieldName: obj.target,
      },
    };
  }

  function compileOptionsFieldData() {}

  return (
    <div className=" w-full border border-yellow-200 my-2 py-2 ">
      <div>
        <p>This is {name} - child.</p>

        <InputFieldComponent ref={fieldRef} />

        <div>
          <button
            className="bg-red-200 px-3 py-1 my-2"
            onClick={() => deleteChild(id)}
          >
            Delete
          </button>
        </div>
      </div>

      {optionValues.length > 0 && (
        <div>
          <OptionComponent optionValues={optionValues} />
        </div>
      )}
    </div>
  );
});
export default ChildComponent;
