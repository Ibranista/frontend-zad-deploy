import React, { useState } from "react";
import Select from "react-select";

function FormCheck() {
  let [selectedOptions, setSelectedOptions] = useState();
  const optionList = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "blue", label: "Blue" },
    { value: "white", label: "White" },
  ];

  function handleSelect(data) {
    setSelectedOptions(data);
  }
  return (
    <>
      <div>FormCheck</div>
      <Select
        closeMenuOnSelect={false}
        options={optionList}
        placeholder="Select color"
        value={selectedOptions}
        onChange={handleSelect}
        isSearchable={true}
        isMulti
      />
    </>
  );
}

export default FormCheck;
