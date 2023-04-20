import Input from 'react-phone-number-input/input'
import { useState, useContext } from "react";
import { AppContext } from "../context";

const Phone = ({ placeholder, value, handler }) => {
  const { state } = useContext(AppContext);


  return (
    <div className="relative">
        <Input
            country="CA"
            placeholder={placeholder}
            value={value}
            className="block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-indigo-500 focus:outline-none"
            onChange={handler}
            />
    </div>
  );
};

export default Phone;
