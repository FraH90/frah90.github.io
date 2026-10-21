import {
  chartBox,
  chartGeometry,
  type ChartSpec,
} from "../../lib/chart-geometry";
export default function ScientificChart({ spec }: { spec: ChartSpec }) {
  const { xTicks, yTicks, paths } = chartGeometry(spec);
  const { width, left, right, top, bottom } = chartBox;
  const height = spec.height ?? chartBox.height;
  return (
    <figure className="scientific-chart">
      <figcaption className="text-sm text-ink mb-3">{spec.title}</figcaption>
      <p className="chart-scroll-hint">
        Scroll horizontally to see the full plot.
      </p>
      <div
        className="chart-scroll"
        tabIndex={0}
        role="region"
        aria-label={`${spec.title} — scroll horizontally on small screens`}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${spec.title}. ${spec.description}`}
        >
          {yTicks.map((t) => (
            <g key={t.label}>
              <line
                x1={left}
                x2={width - right}
                y1={t.position}
                y2={t.position}
                className="chart-grid"
              />
              <text x={left - 10} y={t.position + 5} textAnchor="end">
                {t.label}
              </text>
            </g>
          ))}
          {xTicks.map((t) => (
            <g key={t.label}>
              <line
                x1={t.position}
                x2={t.position}
                y1={top}
                y2={height - bottom}
                className="chart-grid"
              />
              <text x={t.position} y={height - bottom + 24} textAnchor="middle">
                {t.label}
              </text>
            </g>
          ))}
          {paths.map((t) => (
            <path
              key={t.label}
              d={t.path}
              fill="none"
              stroke={t.color}
              strokeWidth="2"
              strokeDasharray={t.dashed ? "6 4" : undefined}
            />
          ))}
          <text
            x={left + (width - left - right) / 2}
            y={height - 10}
            textAnchor="middle"
          >
            {spec.xLabel}
          </text>
          <text
            transform={`translate(19 ${top + (height - top - bottom) / 2}) rotate(-90)`}
            textAnchor="middle"
          >
            {spec.yLabel}
          </text>
        </svg>
      </div>
      <ul className="chart-legend" aria-label="Plotted quantities">
        {spec.traces.map((t) => (
          <li key={t.label}>
            <span
              aria-hidden="true"
              style={{
                borderColor: t.color,
                borderTopStyle: t.dashed ? "dashed" : "solid",
              }}
            />
            {t.label}
          </li>
        ))}
      </ul>
      <p className="text-sm text-muted mt-3 leading-relaxed">
        {spec.description}
      </p>
    </figure>
  );
}
