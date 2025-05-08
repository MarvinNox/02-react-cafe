import { useState } from "react";
// import clsx from "clsx";
import css from "./App.module.css";
import CafeInfo from "./CafeInfo";
import type { Votes, VoteType } from "../types/votes";
import VoteOptions from "./VoteOptions";
import VoteStats from "./VoteStats";

function App() {
  const [value, setValue] = useState<Votes>({ good: 0, neutral: 0, bad: 0 });
  // const [canReset, setCanReset] = useState<boolean>(false);

  function handleVote(type: VoteType) {
    setValue({
      ...value,
      [type]: value[type] + 1,
    });
  }

  function resetVotes() {
    setValue({ good: 0, neutral: 0, bad: 0 });
  }

  // function toggleReset() {
  //   setCanReset(!canReset);
  // }

  const totalVotes = value.bad + value.good + value.neutral;
  const positiveRate =
    totalVotes === 0 ? 0 : Math.round((value.good / totalVotes) * 100);

  return (
    <>
      <div className={css.app}>
        <CafeInfo />
        <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={true} />
        <VoteStats
          votes={value}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      </div>
    </>
  );
}

export default App;
