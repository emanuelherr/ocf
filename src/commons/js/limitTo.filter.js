/**
 * Created by FMG on 10/03/2016.
 */
angular
  .module('limitStringFilter', [])
  .filter("limitString", function () {
    return LimitString
  });


/**
 * Returns the input value shrunken up to 'limit', counting from right.
 * @return {string}
 */
function LimitString(input, limit) {
  var inputString = input + ""; // cast to string
  var prepend = "&hellip;";
  var inputLength = inputString.length;
  var outputString = inputString;

  limit = limit.toString();

  if (limit.indexOf("-") != -1) {
    var formatter = limit.split("-");
    limit = formatter[0];
    prepend = formatter[1];
  }

  if (inputLength > limit) {
    return prepend + inputString.substring(inputLength - limit, inputLength);
  }

  return outputString;

}
