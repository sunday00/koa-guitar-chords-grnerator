import React, { useState } from "react";
import * as main from "../../lib/main";

const Login = () => {
  const [user, setUser] = useState({
    id: "",
    pass: "",
  });

  const handleChange = (e, field) => {
    setUser({
      ...user,
      [field]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    main.login(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={user.id}
        onChange={(e) => handleChange(e, "id")}
      />
      <input
        type="password"
        value={user.pass}
        onChange={(e) => handleChange(e, "pass")}
      />
      <input type="submit" />
    </form>
  );
};

export default Login;
