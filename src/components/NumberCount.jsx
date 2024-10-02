import AnimatedNumber from "./AnimatedNumber";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const NumberCount = () => {
  const [value, setValue] = useState({
    value1: 0,
    value2: 0,
    value3: 0,
  });
  const ref = useRef(null);
  const isInView = useInView(ref);

  if (isInView && value.value1 === 0) {
    setValue((prev) => ({ ...prev, value1: 100 }));
  }
  if (isInView && value.value2 === 0) {
    setValue((prev) => ({ ...prev, value2: 1000 }));
  }
  if (isInView && value.value3 === 0) {
    setValue((prev) => ({ ...prev, value3: 200 }));
  }
  return (
    <div className="flex gap-5 mt-11 mb-11">
      <div
        className="flex flex-col border border-2 border-white flex-wrap items-center justify-center p-11 px-28 rounded"
        ref={ref}
      >
        <p className="text-white text-2xl text-yellow-400">
          Destination we cover
        </p>
        <AnimatedNumber
          className="inline-flex items-center font-mono text-2xl font-light text-zinc-800 dark:text-zinc-50"
          springOptions={{
            bounce: 0,
            duration: 10000,
          }}
          value={value.value1}
        />
      </div>
      <div
        className="flex flex-col border border-2 border-white flex-wrap items-center justify-center p-11 px-28 rounded"
        ref={ref}
      >
        <p className="text-white text-2xl text-yellow-400">happy Costumers</p>
        <AnimatedNumber
          className="inline-flex items-center font-mono text-2xl font-light text-zinc-800 dark:text-zinc-50"
          springOptions={{
            bounce: 0,
            duration: 10000,
          }}
          value={value.value2}
        />
      </div>
      <div
        className="flex flex-col border border-2 border-white flex-wrap items-center justify-center p-11 px-28 rounded"
        ref={ref}
      >
        <p className="text-white text-2xl text-yellow-400">successful Trips</p>
        <AnimatedNumber
          className="inline-flex items-center font-mono text-2xl font-light text-zinc-800 dark:text-zinc-50"
          springOptions={{
            bounce: 0,
            duration: 10000,
          }}
          value={value.value3}
        />
      </div>
    </div>
  );
};

export default NumberCount;
