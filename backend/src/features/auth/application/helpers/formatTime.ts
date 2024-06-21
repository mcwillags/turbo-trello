export const enum TimeFormat {
  MIN = "MIN",
}

export function formatTime(timeMs: number, timeFormat: TimeFormat) {
  switch (timeFormat) {
    case TimeFormat.MIN:
      return Math.ceil(timeMs / 60_000);
  }
}
