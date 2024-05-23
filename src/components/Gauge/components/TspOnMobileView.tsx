import { AnimateNumber } from 'components/AnimateNumber/AnimateNumber';

export const TspOnMobileView = ({
  value,
  maxValueAchieved,
}: {
  value: number;
  maxValueAchieved: number;
}) => {
  return (
    <div className="absolute" style={{ top: '75%', left: '35%' }}>
      <div className="flex justify-center flex-col mt-1">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 text-xs text-left font-semibold text-teal bg-teal rounded-full" />
          <span className="text-xl font-medium text-teal text-left">Live TPS</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center gap-1">
            <div className="text-xs font-medium text-red-400">
              {Math.round(maxValueAchieved).toLocaleString()}
            </div>
            <span className="text-xs font-medium text-red-400 text-left">MAX TPS</span>
          </div>
          <div className="flex justify-center items-center mt-1">
            <div className="text-3xl font-medium text-neutral-200">
              <AnimateNumber amount={Math.round(value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
