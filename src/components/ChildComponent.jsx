import { forwardRef, useImperativeHandle, useRef } from "react";
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
  const optionsRef = useRef(null);

  useImperativeHandle(parentRef, () => {
    return {
      getFormData() {
        return compileResult();
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

  function compileOptionsFieldData() {
    if (!optionsRef) return null;

    let valuesObj = optionsRef.current.getOptionFieldsData();

    return valuesObj;
  }

  function compileResult() {
    let rootFields = compileInputFieldData();

    let optionsFields = compileOptionsFieldData();

    if (optionsFields) {
      Object.entries(rootFields).forEach(([key, data]) => {
        rootFields[key] = {
          ...data,
          values: { ...optionsFields },
        };
      });
    }

    return rootFields;
  }

  return (
    <div className=" w-full border border-yellow-200 my-2 py-2 ">
      <div>
        <p>This is {name} - child.</p>

        <InputFieldComponent
          key={id}
          id={id}
          ref={fieldRef}
          defaultSource={defaultSource}
          defaultTarget={defaultTarget}
        />

        <div>
          <button
            className="bg-red-200 px-3 py-1 my-2"
            onClick={() => deleteChild(id)}
          >
            Delete
          </button>
        </div>
      </div>

      <div>
        <OptionComponent
          defaultSource={defaultSource}
          defaultTarget={defaultTarget}
          ref={optionsRef}
        />
      </div>
    </div>
  );
});
export default ChildComponent;
