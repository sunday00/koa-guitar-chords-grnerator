import React, { useState } from "react";
import * as main from "../../lib/main";
import * as util from "../../lib/util";

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

    main.login(user).then((res) => {
      if (res.data.result === "success") {
        const expireTime = util.addTime(new Date(), 1);

        localStorage.setItem("auth", "1");
        localStorage.setItem(
          "expire",
          expireTime.getFullYear() +
            "-" +
            ("0" + (expireTime.getMonth() + 1)).slice(-2) +
            "-" +
            expireTime.getDate() +
            "T" +
            expireTime.getHours() +
            ":" +
            expireTime.getMinutes()
        );
      }
    });
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
