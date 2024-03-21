import { forwardRef, useRef, useState } from "react";

const OptionComponent = forwardRef(function OptionComponent(
  { optionValues },
  parentRef
) {
  const optionsRefs = useRef({});
  // Function to add a new child component dynamically
  const addChildComponent = () => {
    const childId = crypto.randomUUID(); // Generate a unique ID for the child component
    setChildNames((prevNames) => [...prevNames, childId]);
  };

  // Function to remove a child component
  const removeChildComponent = (childId) => {
    setChildNames((prevNames) => prevNames.filter((id) => id !== childId));
    // Remove the ref associated with the removed child
    delete childRefs.current[childId];
  };
  return <div>OptionComponent</div>;
});
export default OptionComponent;
