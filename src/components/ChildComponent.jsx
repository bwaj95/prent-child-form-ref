import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

/**
 * defaultSource and defaultTarget are objects in real app.
 * Whether the target field is required or not can be found inside defaultTarget.
 */

const ChildComponent = forwardRef(function ChildComponent(
  { id, name, defaultSource, defaultTarget },
  parentRef
) {
  const childRef = useRef(null);

  const [sourceData, setSourceData] = useState({});
  const [targetData, setTargetData] = useState({});

  const [isCustomField, setIsCustomField] = useState(false);
  const [customFieldPrefix, setCustomFieldPrefix] = useState("custom_field.");

  useImperativeHandle(parentRef, () => {
    return {
      getName() {
        console.log("getName called...");
        return { id, name };
      },
      getFormData() {
        return {
          [getSourceString()]: {
            targetField: getTargetString(),
          },
        };
      },
    };
  });

  useEffect(() => {
    setSourceData(defaultSource);
  }, [defaultSource]);

  useEffect(() => {
    setTargetData(defaultTarget);
  }, [defaultTarget]);

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
    return snake_case_string(sourceData);
  }

  function getTargetString() {
    let prefix = isCustomField ? customFieldPrefix : "";

    return prefix + snake_case_string(targetData);
  }

  return (
    <div className=" w-full border border-yellow-200 my-2 py-2 ">
      <div ref={childRef}>
        <p>This is {name} - child.</p>

        <div>
          <label htmlFor="Source Input"></label>
          <input
            type="text"
            value={sourceData}
            onChange={(e) => setSourceData(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="Target Input"></label>
          <input
            type="text"
            value={targetData}
            onChange={(e) => setTargetData(e.target.value)}
          />
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
    </div>
  );
});
export default ChildComponent;
