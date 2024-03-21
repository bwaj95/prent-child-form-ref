import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const InputFieldComponent = forwardRef(function InputFieldComponent(
  { id, defaultSource, defaultTarget, onOptionDelete },
  parentRef
) {
  const [sourceData, setSourceData] = useState("");
  const [targetData, setTargetData] = useState("");

  const [isCustomField, setIsCustomField] = useState(false);
  const [customFieldPrefix, setCustomFieldPrefix] = useState("custom_field.");

  //   Refs can be used to highlight the input box and show errors
  const sourceFieldInputRef = useRef();
  const targetFieldInputRef = useRef();

  useEffect(() => {
    setSourceData(defaultSource);
  }, [defaultSource]);

  useEffect(() => {
    setTargetData(defaultTarget);
  }, [defaultTarget]);

  useImperativeHandle(parentRef, () => {
    return {
      getInputFieldData() {
        return {
          source: getSourceString(),
          target: getTargetString(),
        };
      },
    };
  });

  function snake_case_string(str) {
    return (
      str &&
      str
        .match(
          /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )
        .map((s) => s.toLowerCase())
        .join("_")
    );
  }

  function getSourceString() {
    if (!sourceData || sourceData === "") {
      // do empty input error handling
      return;
    }

    return snake_case_string(sourceData);
  }

  function getTargetString() {
    let prefix = isCustomField ? customFieldPrefix : "";

    return prefix + snake_case_string(targetData);
  }

  return (
    <div className=" flex flex-col">
      <div className=" flex flex-row space-x-4 ">
        <div>
          <input
            type="text"
            value={sourceData}
            onChange={(e) => setSourceData(e.target.value)}
            ref={sourceFieldInputRef}
            required
          />
        </div>

        <div>
          <input
            type="text"
            value={targetData}
            onChange={(e) => setTargetData(e.target.value)}
            ref={targetFieldInputRef}
            required
          />
        </div>

        {onOptionDelete && (
          <div>
            <button
              className=" bg-red-100 px-4 py-2 "
              onClick={() => onOptionDelete(id)}
            >
              Delete Option
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-row gap-x-2">
        <label htmlFor="">Custom Field?</label>
        <input
          type="checkbox"
          name="is_custom_field"
          value={isCustomField}
          onChange={(e) => setIsCustomField(!isCustomField)}
        />

        {isCustomField && (
          <input
            type="text"
            value={customFieldPrefix}
            onChange={(e) => setCustomFieldPrefix(e.target.value)}
          />
        )}
      </div>
    </div>
  );
});
export default InputFieldComponent;
