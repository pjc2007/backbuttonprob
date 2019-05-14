/**
 * Base for all nav params 
 */
export class NavBaseParams {
  /** Set of page has been activated via the side menu */
  public fromSideMenu : boolean;
  /**
   * Construction
   */
  constructor() {
    this.fromSideMenu = false;    
  }
}