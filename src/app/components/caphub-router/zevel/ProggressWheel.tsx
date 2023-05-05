import { useState, useEffect, useMemo } from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 3px solid #ddd;
  border-top: 3px solid #0077cc;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${rotate} 1s linear infinite;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProgressBar = styled.div`
  background-color: #ddd;
  height: 10px;
  border-radius: 10px;
  width: 300px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Progress = styled.div`
  background-color: #0077cc;
  height: 100%;
  border-radius: 10px;
  transition: width 0.5s ease-in-out;
`;

const Text = styled.div`
  text-align: center;
`;

const randomSentence = (sentences: any) => {
  let randomSentenceTrial =
    sentences[Math.floor(Math.random() * sentences.length)];
  while (randomSentenceTrial.includes("undefined")) {
    randomSentenceTrial =
      sentences[Math.floor(Math.random() * sentences.length)];
  }
  return randomSentenceTrial;
};

const ProggressWheel = ({ founder }: any) => {
  const [progress, setProgress] = useState(0);

  const sentences = useMemo(
    () => [
      `Searching for VC firms that specialize in ${founder.fundingStage} funding...`,
      `Analyzing potential VC partners based on investment focus and portfolio...`,
      `Checking compatibility with VC firms that invest in ${founder.industry}...`,
      `Searching for VC firms that prefer ${founder.fundingStage} companies...`,
      `Researching VC firms with investment sizes of at least ${founder.fundingAmount}...`,
      `Reviewing VC firms' past investment performance and success...`,
      `Searching for VC firms that have invested in companies with a similar funding stage and funding amount...`,
      `Reviewing portfolio companies of potential VC partners for fit with your company...`,
    ],
    [founder]
  );

  const [currentSentence, setCurrentSentence] = useState<any>(
    randomSentence(sentences)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((progress) => Math.min(progress + 1, 100));
    }, 300);
    return () => clearInterval(timer);
  }, [sentences]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSentence(randomSentence(sentences));
    }, Math.random() * 4000 + 1000);

    return () => clearInterval(timer);
  }, [sentences]);

  return (
    <Container>
      <ProgressContainer>
        <Spinner />
        <br /> <br />
        <br />
        <Text>{currentSentence}</Text>
        <ProgressBar>
          <Progress style={{ width: `${progress}%` }} />
        </ProgressBar>
      </ProgressContainer>
    </Container>
  );
};

export default ProggressWheel;
