import React, {useState} from 'react';
import Joi from 'joi-browser';

export default function Form() {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const validate = () => {
    const result = Joi.validate(data, schema, { abortEarly: false });

    if (!result.error) return null;

    const instErrors = {};
    for (let item of result.error.details)
      instErrors[item.path[0]] = item.message;
    return instErrors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const instSchema = { [name]: schema[name] };
    const result = Joi.validate(obj, instSchema);

    return result.error ? result.error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate() || {});
    if (errors) return;

    doSubmit();
  };

  const handleChange = ({ currentTarget: input }) => {
    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    setErrors({ ...errors });

    data[input.name] = input.value;

    setData({ ...data });
  };

  return (

  )
}