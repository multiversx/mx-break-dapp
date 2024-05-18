import { PieSectorDataItem } from 'recharts/types/polar/Pie';
export const RADIAN = Math.PI / 180;

// Ensure the arrow does not overflow the arc
const ARROW_SIZE_MULTIPLY_FACTOR = 0.03;
export const ARROW_WIDTH = 6;

export const GaugeArrowIndicator = ({
  cx,
  cy,
  width,
  midAngle,
  outerRadius,
}: PieSectorDataItem) => {
  midAngle = midAngle ?? 1;
  cx = cx ?? 0;
  cy = cy ?? 0;
  outerRadius = outerRadius ?? 0;
  width = Number(width ?? 0);

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const mx = cx + (outerRadius + width * ARROW_SIZE_MULTIPLY_FACTOR) * cos;
  const my = cy + (outerRadius + width * ARROW_SIZE_MULTIPLY_FACTOR) * sin;

  return (
    <g>
      <path
        // Need to shift the arrow position to make it visible for extremities (when the value is 1 or 4)
        d={`M${cx},${cy - ARROW_WIDTH}L${mx},${my - ARROW_WIDTH}`}
        strokeWidth={ARROW_WIDTH}
        stroke="#665"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
};
