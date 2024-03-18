import { useState } from "react";
import ChildComponent from "./ChildComponent";
import { useRef } from "react";

const ParentComponent = () => {
  const [childNames, setChildNames] = useState([]);
  const childRefs = useRef({}); // Use an object for mapping instead of an array

  const [submittedChildNames, setSubmittedChildNames] = useState([]);

  const [formData, setFormData] = useState({});

  const handleFormFieldData = (name, value) => {
    setFormData({
      ...formData,
      [name]: {
        targetField: value,
      },
    });
  };

  const printForm = () => {
    console.log("Form Data...");
    console.log(formData);
  };

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

  // Function to gather names of child components
  const gatherChildNames = () => {
    console.log("printing childRefs...");
    console.log(childRefs);
    const namesData = Object.values(childRefs.current).map((ref) => {
      console.log("printing ref...");
      console.log(ref);
      return ref.getName();
    });

    console.log("Names data from ref gathred...");
    console.log(namesData);
    setSubmittedChildNames(namesData);
  };

  const gatherChildrenForms = () => {
    console.log("gathering children form data...");
    let childrenFormData = Object.values(childRefs.current).map((ref) => {
      console.log("printing form ref...");
      console.log(ref);

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
      {/* Render ChildComponent instances dynamically */}
      {childNames.map((childId) => (
        <ChildComponent
          key={childId}
          id={childId}
          name={`Child ${childId}`} // Pass a unique name or identifier
          ref={(ref) => (childRefs.current[childId] = ref)} // Store the ref using the childId as key
          defaultSource={"deft source"}
          defaultTarget={"deft Target"}
        />
      ))}

      {/* Button to add a new child component */}
      <button onClick={addChildComponent} className=" bg-blue-300 ">
        Add Child Component
      </button>

      {/* Button to gather names */}
      <button onClick={gatherChildrenForms} className=" bg-green-300 ">
        Gather Form Data
      </button>

      {/* Display gathered names */}
      <div className=" w-full bg-purple-400 ">
        {submittedChildNames.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>

      <div>
        <button className=" bg-blue-100 " onClick={printForm}>
          Print Form to console
        </button>
      </div>
    </div>
  );
};
export default ParentComponent;
