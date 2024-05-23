import { AnimateNumber } from 'components/AnimateNumber/AnimateNumber';

export const TspOnDesktopView = ({ value }: { value: number }) => {
  return (
    <div className="absolute" style={{ top: '80%', left: '38%' }}>
      <div className="flex justify-center flex-col mt-2">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 me-2 text-sm text-left font-semibold text-teal bg-teal rounded-full" />
          <span className="text-sm font-medium text-teal text-left">Live TPS</span>
        </div>
        <div className="flex justify-center items-center mt-2">
          <div className="text-3xl font-medium text-neutral-200">
            <AnimateNumber amount={Math.round(value)} />
          </div>
        </div>
      </div>
    </div>
  );
};
