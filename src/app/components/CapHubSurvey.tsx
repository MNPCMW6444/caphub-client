import "survey-core/defaultV2.min.css";
import { useCallback, /* useContext ,*/ useState } from "react";
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
// import axios from "axios";
// import UserContext from "../context/UserContext";
import ProggressWheel from "./ProggressWheel";
// import domain from "../util/config/domain";

export default function PPSurvey({ surveyJson, type }: any) {
  const [show, showP] = useState(false);
  const [data, saveData] = useState();
  const survey = new Model(surveyJson);

  const surveyComplete = useCallback(
    ({ data }: any) => {
      saveData(data);
      // axios.post(domain + "save" + type, { owner: user, data });
    },
    [
      /* type */
    ]
  );
  survey.onComplete.add(surveyComplete);
  survey.onComplete.add(() => showP(true));
  return !show ? <Survey model={survey} /> : <ProggressWheel founder={data} />;
}
