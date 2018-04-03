import {Type} from '@angular/core';

/**
 * options for DynamicHTMLModule
 */
export class DynamicHTMLOptions {
  /**
   * identifies components projected in dynamic HTML.
   */
  components: Array<Type<any>>;
}
