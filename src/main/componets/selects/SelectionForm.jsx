import React from "react";

const SelectionForm = (props) => {
  const {
    selectedYear,
    selectedPilot1,
    selectedPilot2,
    handleYearChange,
    handlePilot1Change,
    handlePilot2Change,
    yearOptions,
    pilotOptions,
  } = props;

  return (
    <div>
      <label htmlFor="yearSelect">Escolha o ano:</label>
      <select id="yearSelect" value={selectedYear} onChange={handleYearChange}>
        {yearOptions}
      </select>
      <div>Selected Year: {selectedYear}</div>

      <label htmlFor="pilot1Select">Select Pilot:</label>
      <select
        id="pilot1Select"
        value={selectedPilot1}
        onChange={handlePilot1Change}
      >
        {pilotOptions}
      </select>
      <div>Select Pilot: {selectedPilot1}</div>

      <label htmlFor="pilot2Select">Select Pilot:</label>
      <select
        id="pilot2Select"
        value={selectedPilot2}
        onChange={handlePilot2Change}
      >
        {pilotOptions}
      </select>
      <div>Select Pilot: {selectedPilot2}</div>
    </div>
  );
};

export default SelectionForm;
