import "core-js/stable/dom-collections/for-each";
import "core-js/stable/array/from";
import "core-js/stable/object/values";
import "core-js/stable/string/ends-with";

import objectFitImages from "object-fit-images";
objectFitImages("[data-ofi]");

if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}
