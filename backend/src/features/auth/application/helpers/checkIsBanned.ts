export function checkIsBanned(banStart: Date, banTime: number): boolean {
  const banEnd = new Date(banStart.getTime() + banTime);

  const currentDate = new Date();

  return currentDate < banEnd;
}
