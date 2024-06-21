export function calculateRemainingBanTime(banStart: Date, banTimeMs: number): number {
  const banEndTime = banStart.getTime() + banTimeMs;

  const currentTime = new Date().getTime();

  return banEndTime - currentTime;
}
