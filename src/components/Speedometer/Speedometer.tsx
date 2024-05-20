import { useCallback, useEffect, useState } from 'react';
import './Speedometer.css';

export const Speedometer = ({ speed }: { speed: number }) => {
  const [arrowStyle, setArrowStyle] = useState({});
  const [counter, setCounter] = useState(0);

  const calcAngle = (value: number) => {
    let angle = -90;
    value = value / 100;

    if (value < 0.1) {
      angle = (value / 0.1) * 60 - 90;
    } else if (value > 0.1 && value < 0.5) {
      angle = (value / 0.5) * 90 - 90;
    } else if (value > 0.5 && value <= 0.9) {
      angle = (value / 0.9) * 30;
    } else {
      angle = (value / 1) * 90;
    }

    return Math.round(angle);

    // let angle = -90;
    // if (value < 1.5) {
    //   angle = (value / 1.5) * 60 - 90;
    // } else if (value > 1.5 && value < 6.5) {
    //   angle = (value / 6.5) * 90 - 90;
    // } else if (value > 6.5 && value < 15) {
    //   angle = (value / 15) * 30;
    // } else {
    //   angle = (value / 15) * 90;
    // }
    //
    // return Math.round(angle);
  };

  const refreshSpeedOMeter = useCallback(() => {
    const angle = calcAngle(speed);

    setArrowStyle({
      WebkitTransform: `rotate(${angle}deg)`,
      msTransform: `rotate(${angle}deg)`,
      transform: `rotate(${angle}deg)`,
    });

    setCounter(speed);
  }, [speed]);

  useEffect(() => {
    refreshSpeedOMeter();
  }, [refreshSpeedOMeter, speed]);

  return (
    <div className="w-full text-teal dark:bg-neutral-950 mr-auto max-w-sm shadow-lg rounded-lg overflow-hidden">
      <div className="items-center flex justify-center p-4">
        <div className="">
          <div className="speedometer">
            <div className="scale low"></div>
            <div className="scale middle"></div>
            <div className="scale height"></div>
            <div id="arrow" className="arrow" style={arrowStyle}></div>
          </div>

          <div
            id="counter"
            className="text-grey-darkest text-center text-base font-semibold pt-4 pb-0"
          >
            {(counter * 100).toFixed(0)} Tps
          </div>
        </div>
      </div>
    </div>
  );
};
