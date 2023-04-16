import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import CapHubAuth from "./auth/CapHubAuth";
import CapHubSurvey from "./CapHubSurvey";
import { founders } from "../../content/surveys";

export default function Home() {
  const { user } = useContext(UserContext);
  const [survey, setSurvey] = useState(false);

  return user ? (
    survey ? (
      <div>
        Hello: {user.name}
        <a onClick={() => setSurvey(true)} href="/">
          Start Survey
        </a>
      </div>
    ) : (
      <CapHubSurvey surveyJson={founders} type="founder" />
    )
  ) : (
    <CapHubAuth />
  );
}
