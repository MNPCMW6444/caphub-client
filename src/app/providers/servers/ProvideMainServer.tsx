import React, { ReactNode, useEffect, useRef, useState } from "react";
import axios from "axios";
import domain from "../../util/config/domain";

interface ProvideMainServerProps {
  children: ReactNode;
  tryInterval?: number;
}

const DEFAULT_TRY_INTERVAL = 500;

const IDLE = "IDLE";
const CHECKING_MESSAGE = "Checking server availability...";
const BAD_MESSAGE = "Server is not available. Please try again later.";
const GOOD_STATUS = "good";

const checkServerAvailability = async () => {
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
  const [status, setStatus] = useState<string>(IDLE);
  const statusRef = useRef(status);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    const setStatusAsyncly = async () => {
      setStatus(CHECKING_MESSAGE);
      const newStatus = await checkServerAvailability();
      setStatus(newStatus);

      if (newStatus !== GOOD_STATUS) {
        setTimeout(setStatusAsyncly, tryInterval || DEFAULT_TRY_INTERVAL);
      }
    };

    if (statusRef.current === IDLE) {
      setStatusAsyncly();
    }
  }, [tryInterval]);

  if (status === GOOD_STATUS) {
    return <>{children}</>;
  } else {
    return <div>{status}</div>;
  }
};

export default ProvideMainServer;
