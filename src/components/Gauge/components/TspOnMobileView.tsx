export const TspOnMobileView = ({
  value,
  maxValueAchieved,
}: {
  value: number;
  maxValueAchieved: number;
}) => {
  return (
    <div className="absolute" style={{ top: '80%', left: '30%' }}>
      <div className="flex justify-center flex-col mt-2">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 me-2 text-xs text-left font-semibold text-teal bg-teal rounded-full" />
          <span className="text-xs font-medium text-teal text-left">Live TPS</span>
          <span className="text-xs font-medium text-neutral-400 text-left">/</span>
          <span className="text-xs font-medium text-red-400 text-left">MAX TPS</span>
        </div>
        <div className="flex justify-center items-center mt-2">
          <div className="text-sm font-medium text-neutral-200">
            {value > 60_000
              ? `${Math.round(value / 1000).toLocaleString()}K`
              : Math.round(value).toLocaleString()}
          </div>
          <div className="text-sml font-medium text-neutral-400 mx-1">/</div>
          <div className="text-sm font-medium text-neutral-200">
            {maxValueAchieved > 60_000
              ? `${Math.round(maxValueAchieved / 1000).toLocaleString()}K`
              : maxValueAchieved.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};
