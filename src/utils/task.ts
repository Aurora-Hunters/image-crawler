import * as NodeCron from 'node-cron';

/**
 *
 */
export class Task {
  public action: () => Promise<void>;

  public schedule: string;

  private defaultSchedule = '0 * * * * *';

  /**
   * @param action
   * @param schedule
   */
  constructor(action: () => Promise<void>, schedule?: string) {
    this.action = action;
    this.schedule = schedule || this.defaultSchedule;
  }

  /**
   *
   */
  public register(): void {
    NodeCron.schedule(this.schedule, this.action);
  }
}
