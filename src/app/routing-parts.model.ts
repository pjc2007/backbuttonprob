import { NavBaseParams } from './nav-base.params';

/** Container for routing information */
export class RoutingPartsModel {
  /**
   * Construction
   * @param url = URI of route
   * @param params - any parameters
   */
  constructor(public url: string, public params: NavBaseParams) { }

  /** Equality test */
  public equals(other: RoutingPartsModel) {
    if (other == undefined)
      return false;

    if (other.url != this.url)
      return false;

    if (this.params == undefined && other.params == undefined)
      return true;

    if (this.params == undefined || other.params == undefined)
      return false;

    return this.params.fromSideMenu == other.params.fromSideMenu;
  }
}