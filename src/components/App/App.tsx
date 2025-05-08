import { useState } from "react";
// import clsx from "clsx";
import css from "./App.module.css";
import CafeInfo from "../CafeInfo/CafeInfo";
import type { Votes, VoteType } from "../../types/votes";
import VoteOptions from "../VoteOptions/VoteOptions";

import Notification from "../Notification/Notification";
import VoteStats from "../VoteStats/VoteStats";

function App() {
  const [value, setValue] = useState<Votes>({ good: 0, neutral: 0, bad: 0 });

  function handleVote(type: VoteType) {
    setValue({
      ...value,
      [type]: value[type] + 1,
    });
  }

  function resetVotes() {
    setValue({ good: 0, neutral: 0, bad: 0 });
  }

  const totalVotes = value.bad + value.good + value.neutral;
  const positiveRate =
    totalVotes === 0 ? 0 : Math.round((value.good / totalVotes) * 100);
  const canReset = totalVotes > 0 ? true : false;

  return (
    <>
      <div className={css.app}>
        <CafeInfo />
        <VoteOptions
          onVote={handleVote}
          onReset={resetVotes}
          canReset={canReset}
        />
        {totalVotes > 0 ? (
          <VoteStats
            votes={value}
            totalVotes={totalVotes}
            positiveRate={positiveRate}
          />
        ) : (
          <Notification />
        )}
      </div>
    </>
  );
}

export default App;
