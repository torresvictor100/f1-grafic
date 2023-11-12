import React from "react";
import { Bar } from "react-chartjs-2";

const Grafic = ({ options, data }) => {
  return <Bar options={options} data={data} />;
};

export default Grafic;
