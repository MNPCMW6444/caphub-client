import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import domain from "../../util/config/domain";

interface ProvideMainServerProps {
  children: ReactNode;
  tryInterval?: number;
}

const DEFAULT_TRY_INTERVAL = 500;

const ProvideMainServer = ({
  children,
  tryInterval,
}: ProvideMainServerProps) => {
  const [status, setStatus] = useState<string>(
    "Checking server availability..."
  );

  const checkIfServerIsThere = async () => {
    try {
      return (await axios.get(domain + "areyoualive")).data.answer === "yes"
        ? "good"
        : "bad" + Math.random();
    } catch (err) {
      return "bad" + Math.random();
    }
  };

  useEffect(() => {
    const setStatusAsyncly = async () =>
      setStatus(await checkIfServerIsThere());
    setStatusAsyncly();
    status !== "good" &&
      setTimeout(
        () => status !== "good" && setStatusAsyncly(),
        tryInterval || DEFAULT_TRY_INTERVAL
      );
  }, [status]);

  if (status === "good") {
    return <>{children}</>;
  } else {
    return <div>Server is not available. Please try again later.</div>;
  }
};

export default ProvideMainServer;
