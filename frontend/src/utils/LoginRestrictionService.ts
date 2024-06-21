import { LoginConstants } from "~constants/LoginConstants.ts";
import { LocalStorageService } from "~utils/LocalStorageService.ts";

interface RestrictionRecord {
  timestamp: number;
  banTimeRemaining: number;
  email: string;
}

export class LoginRestrictionService {
  private static readonly _localStorageService = new LocalStorageService<RestrictionRecord[]>(
    LoginConstants.LOGIN_RESTRICTION_KEY
  );

  static getRestrictionTime(email: string): null | number {
    const previousRestrictions = this._localStorageService.getItem();

    if (previousRestrictions === null) return null;

    const restrictionRecord = previousRestrictions.find((record) => record.email === email);

    if (!restrictionRecord) return null;

    if (this.checkIfRestricted(restrictionRecord)) return this.getRemainingTime(restrictionRecord);

    this.removeRestriction(restrictionRecord.email);

    return null;
  }

  private static getRemainingTime(record: RestrictionRecord) {
    const timeNow = new Date().getTime();

    return record.timestamp + record.banTimeRemaining - timeNow;
  }

  private static checkIfRestricted(record: RestrictionRecord) {
    const timeNow = new Date().getTime();

    return record.banTimeRemaining + record.timestamp > timeNow;
  }

  static setRestriction(email: string, banTimeRemaining: number) {
    const previousRestrictions = this._localStorageService.getItem();

    const newRecord: RestrictionRecord = { email, banTimeRemaining, timestamp: new Date().getTime() };

    if (previousRestrictions === null) {
      return this._localStorageService.setItem([newRecord]);
    }

    this._localStorageService.setItem([...previousRestrictions, newRecord]);
  }

  private static removeRestriction(email: string) {
    const previousRestrictions = this._localStorageService.getItem();

    if (previousRestrictions === null) return;

    this._localStorageService.setItem(
      previousRestrictions.filter((restrictionRecord) => restrictionRecord.email !== email)
    );
  }
}
