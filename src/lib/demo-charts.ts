import type { ChartSpec } from "./chart-geometry";

/** An article demo's build-time reference: the calculated case shown before
 *  (and without) JavaScript, and on the article's preview card. It lives beside
 *  the demo, in the article's `demos/<Name>.reference.ts`. */
export interface DemoReference {
  label: string;
  parameters: string;
  observation: string;
  charts: ChartSpec[];
  /** Which chart the preview card draws (default 0). */
  previewChart?: number;
  /** Short y-axis name for the preview card (default: the chart's own). */
  previewAxis?: string;
  /** The preview card offers a slider that redraws the chart: the article's
   *  `demos/chart.ts` exports `steer(value) → { chart, label }`. */
  previewSteering?: PreviewSteering;
}

export interface PreviewSteering {
  /** Caption drawn on the card, e.g. the fixed parameters. */
  caption: string;
  /** The slider's visible label. */
  label: string;
  min: number;
  max: number;
  value: number;
  unit: string;
  /** Spoken after the value, e.g. "degrees from the array axis". */
  valueText: string;
}
