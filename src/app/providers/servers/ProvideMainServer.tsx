import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import domain from "../../util/config/domain";

interface ProvideMainServerProps {
  children: ReactNode;
  tryInterval?: number;
}

const DEFAULT_TRY_INTERVAL = 500;

const BAD_MESSAGE = "Server is not available. Please try again later.";
const GOOD_STATUS = "good";

const checkIfServerIsThere = async () => {
  try {
    return (await axios.get(domain + "areyoualive")).data.answer === "yes"
      ? GOOD_STATUS
      : BAD_MESSAGE + Math.random();
  } catch (err) {
    return BAD_MESSAGE + Math.random();
  }
};

const ProvideMainServer = ({
  children,
  tryInterval,
}: ProvideMainServerProps) => {
  const [status, setStatus] = useState<string>(
    "Checking server availability..."
  );

  useEffect(() => {
    const setStatusAsyncly = async () =>
      setStatus(await checkIfServerIsThere());
    setStatusAsyncly();
    let tryAgain: NodeJS.Timer | undefined = undefined;
    setTimeout(() => {
      if (status !== GOOD_STATUS) {
        tryAgain = setInterval(
          () => status !== GOOD_STATUS && setStatusAsyncly(),
          tryInterval || DEFAULT_TRY_INTERVAL
        );
      }
    }, 2000);
    status === GOOD_STATUS && tryAgain && clearInterval(tryAgain);
    return () => tryAgain && clearInterval(tryAgain);
  }, [status, tryInterval]);

  if (status === GOOD_STATUS) {
    return <>{children}</>;
  } else {
    return <div>{status}</div>;
  }
};

export default ProvideMainServer;
