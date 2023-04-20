import React from 'react';
import Select from 'react-select';

const Hotels = ({ value, handler, options }) => (


<Select
  options={options}
  value={value}
  onChange={(e) => handler(e.value)}
/>


);

export default Hotels;
