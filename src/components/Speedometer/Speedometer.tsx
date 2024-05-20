import { useCallback, useEffect, useState } from 'react';
import './Speedometer.css';

const minValue = 0;
const maxValue = 100_000;
const minAngle = -90;
const maxAngle = 90;

export const Speedometer = ({ speed }: { speed: number }) => {
  const [arrowStyle, setArrowStyle] = useState({});
  const [counter, setCounter] = useState(0);

  // Compute the angle using linear interpolation within the range
  const calcAngle = (value: number) => {
    if (value <= minValue) {
      return minAngle;
    }
    if (value > maxValue) {
      return maxAngle;
    }

    // Compute the proportion of the value within the range
    const proportion = (value - minValue) / (maxValue - minValue);

    // Compute the corresponding angle within the angle range
    const angle = minAngle + proportion * (maxAngle - minAngle);

    return Math.round(angle);
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
            {Math.round(counter)} Tps
          </div>
        </div>
      </div>
    </div>
  );
};
