import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AnimatedNumber from 'animated-number-react';

interface AnimateNumberProps {
  amount: number;
  className?: string;
}

export const AnimateNumber = ({ amount, ...rest }: AnimateNumberProps) => {
  const [updateCount, setUpdateCount] = useState(0);
  const [valueToAnimate, setValueToAnimate] = useState<number>();

  useEffect(() => {
    setUpdateCount((existing) => existing + 1);
    setValueToAnimate(amount);
  }, [amount]);

  const formatValue = (val: number) =>
    val.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  if (!valueToAnimate) {
    return <>{amount}</>;
  }

  return (
    <AnimatedNumber
      value={valueToAnimate}
      duration={updateCount > 1 ? 300 : 0}
      formatValue={formatValue}
      {...rest}
    />
  );
};
