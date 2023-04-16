import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import CapHubAuth from "./auth/CapHubAuth";
import { founders } from "../../content/surveys";
import CapHubAppBar from "./home/CapHubAppBar";
import CapHubSurvey from "./home/zevel/CapHubSurvey";

export default function Home() {
  const { user } = useContext(UserContext);
  const [survey, setSurvey] = useState(false);

  return user ? (
    survey ? (
      <CapHubSurvey surveyJson={founders} type="founder" />
    ) : (
      <div>
        <CapHubAppBar />
        Hello: {user.name}
        <a onClick={() => setSurvey(true)} href="/">
          Start Survey
        </a>
      </div>
    )
  ) : (
    <CapHubAuth />
  );
}
