import React, { useState } from "react";

// import * as util from "../../lib/util";
import { postProvider as api } from "../../lib/provider";

const ProviderCreateContainer = ({ match }) => {
  const [provider, setProvider] = useState({
    name: "ytb-learning-guitar",
    description: "this is easy lecture from free youtube guitar course.",
  });

  const [err, setErr] = useState({
    msg: "",
  });

  const handleChange = (e, field) => {
    setProvider({
      ...provider,
      [field]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!provider.name) {
      setErr({
        ...err,
        msg: "name is required",
      });
    }

    setErr({
      ...err,
      msg: "wait...",
    });

    api({
      provider: provider,
    }).then((res) => {
      if (res.data.result === "success") {
        console.log(res.data);
        // window.location.href = `/chord/list/${res.data.id}`;
      } else if (res.data.result === "error") {
        setErr({
          ...err,
          msg: res.data.message,
        });
      }
    });
  };

  const handleErr = (e) => {
    err.msg !== "wait..." && setErr({ ...err, msg: "" });
  };

  return (
    <form className="provider-input-form" onSubmit={handleSubmit}>
      <input
        name="name"
        value={provider.name}
        onChange={(e) => handleChange(e, "name")}
        className="name"
      />
      <textarea
        name="description"
        onChange={(e) => handleChange(e, "description")}
        value={provider.description}
        maxLength="450"
        rows="8"
        className="description"
      />

      <input type="submit" className="submit" value="submit" />

      <p className={`err ${err.msg && "active"}`} onClick={handleErr}>
        {err.msg}
      </p>
    </form>
  );
};

export default ProviderCreateContainer;
