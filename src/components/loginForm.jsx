import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./common/input";

const schema = {
  username: Joi.string().required().label("Username"),
  password: Joi.string().required().label("Password"),
};

export default function LoginForm() {
  const [data, setData] = useState({ username: "", password: "" });
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

  const doSubmit = () => {
    console.log("submitted");
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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          value={data.username}
          label="Username"
          error={errors.username}
          onChange={handleChange}
        />
        <Input
          name="password"
          value={data.password}
          label="Password"
          error={errors.password}
          onChange={handleChange}
        />
        <button disabled={validate()} className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
