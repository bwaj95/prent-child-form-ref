import { useState } from "react";
import ChildComponent from "./ChildComponent";
import { useRef } from "react";

const ParentComponent = () => {
  const [childNames, setChildNames] = useState([]);
  const childRefs = useRef({}); // Use an object for mapping instead of an array

  const [formData, setFormData] = useState({});

  const printForm = () => {
    console.log("Form Data...");
    console.log(formData);
  };

  // Function to add a new child component dynamically
  const addChildComponent = () => {
    const childId = crypto.randomUUID();
    setChildNames((prevNames) => [...prevNames, childId]);
  };

  // Function to remove a child component
  const removeChildComponent = (childId) => {
    setChildNames((prevNames) => prevNames.filter((id) => id !== childId));
    // Remove the ref associated with the removed child
    delete childRefs.current[childId];
  };

  const gatherChildrenForms = (e) => {
    e.preventDefault();

    console.log("gathering children form data...");
    let childrenFormData = Object.values(childRefs.current).map((ref) => {
      if (!ref) return;

      return ref.getFormData();
    });

    let formDataCollection = {};

    childrenFormData.forEach((obj) => {
      formDataCollection = {
        ...formDataCollection,
        ...obj,
      };
    });

    console.log("printing formDataCollection...");
    console.log(formDataCollection);

    setFormData(formDataCollection);
  };

  return (
    <div className="flex flex-col">
      <form>
        {/* Render ChildComponent instances dynamically */}
        {childNames.map((childId) => (
          <ChildComponent
            key={childId}
            id={childId}
            name={`Child ${childId}`}
            ref={(ref) => (childRefs.current[childId] = ref)} // Store the ref using the childId as key
            defaultSource={"deft source"}
            defaultTarget={"deft Target"}
            deleteChild={removeChildComponent}
          />
        ))}

        {/* Button to add a new child component */}
        <button
          type="button"
          onClick={addChildComponent}
          className=" bg-blue-300 mx-4 my-4 "
        >
          Add Child Component
        </button>

        {/* Button to gather names */}
        <button
          type="submit"
          onClick={gatherChildrenForms}
          className=" bg-green-300 mx-4 my-4 "
        >
          Gather Form Data
        </button>
      </form>

      <div>
        <button className=" bg-blue-100 " onClick={printForm}>
          Print Form to console
        </button>
      </div>
    </div>
  );
};
export default ParentComponent;
