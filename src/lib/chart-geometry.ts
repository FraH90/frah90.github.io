export interface Trace {
  x: number[];
  y: number[];
  label: string;
  color: string;
  dashed?: boolean;
}
export interface ChartSpec {
  title: string;
  description: string;
  xLabel: string;
  yLabel: string;
  traces: Trace[];
  xRange?: [number, number];
  yRange?: [number, number];
  height?: number;
}
export const chartBox = {
  width: 960,
  height: 360,
  left: 74,
  right: 20,
  top: 20,
  bottom: 64,
};
function extent(values: number[]): [number, number] {
  const finite = values.filter(Number.isFinite);
  if (!finite.length) throw new Error("A chart needs finite data");
  const min = Math.min(...finite),
    max = Math.max(...finite);
  return min === max ? [min - 1, max + 1] : [min, max];
}
export function chartGeometry(spec: ChartSpec) {
  const { width, left, right, top, bottom } = chartBox;
  const height = spec.height ?? chartBox.height;
  const xr = spec.xRange ?? extent(spec.traces.flatMap((t) => t.x));
  const yr = spec.yRange ?? extent(spec.traces.flatMap((t) => t.y));
  const sx = (x: number) =>
    left + ((x - xr[0]) / (xr[1] - xr[0])) * (width - left - right);
  const sy = (y: number) =>
    height -
    bottom -
    ((Math.max(yr[0], Math.min(yr[1], y)) - yr[0]) / (yr[1] - yr[0])) *
      (height - top - bottom);
  const ticks = (range: [number, number], scale: (v: number) => number) =>
    Array.from({ length: 5 }, (_, i) => {
      const value = range[0] + ((range[1] - range[0]) * i) / 4;
      return {
        label: Number(value.toPrecision(3)).toString(),
        position: scale(value),
      };
    });
  return {
    xTicks: ticks(xr, sx),
    yTicks: ticks(yr, sy),
    paths: spec.traces.map((trace) => {
      if (
        trace.x.length !== trace.y.length ||
        trace.y.some((v) => !Number.isFinite(v))
      )
        throw new Error("Invalid chart data");
      return {
        ...trace,
        path: trace.x
          .map(
            (x, i) =>
              `${i ? "L" : "M"}${sx(x).toFixed(2)},${sy(trace.y[i]).toFixed(2)}`,
          )
          .join(" "),
      };
    }),
  };
}
