/**
 * 🍛 Highway Dhaba Rating System - Higher-Order Functions
 *
 * Highway pe dhabas ki rating system bana raha hai. Higher-order functions
 * (HOF) use karne hain — aise functions jo doosre functions ko parameter
 * mein lete hain YA return karte hain.
 *
 * Functions:
 *
 *   1. createFilter(field, operator, value)
 *      - Returns a FUNCTION that filters objects
 *      - Operators: ">", "<", ">=", "<=", "==="
 *      - e.g., createFilter("rating", ">=", 4) returns a function that
 *        takes an object and returns true if object.rating >= 4
 *      - Unknown operator => return function that always returns false
 *
 *   2. createSorter(field, order = "asc")
 *      - Returns a COMPARATOR function for Array.sort()
 *      - order "asc" => ascending, "desc" => descending
 *      - Works with both numbers and strings
 *
 *   3. createMapper(fields)
 *      - fields: array of field names, e.g., ["name", "rating"]
 *      - Returns a function that takes an object and returns a new object
 *        with ONLY the specified fields
 *      - e.g., createMapper(["name"])({name: "Dhaba", rating: 4}) => {name: "Dhaba"}
 *
 *   4. applyOperations(data, ...operations)
 *      - data: array of objects
 *      - operations: any number of functions to apply SEQUENTIALLY
 *      - Each operation takes an array and returns an array
 *      - Apply first operation to data, then second to result, etc.
 *      - Return final result
 *      - Agar data not array, return []
 *
 * Hint: HOF = functions that take functions as arguments or return functions.
 *   createFilter returns a function. applyOperations takes functions as args.
 *
 * @example
 *   const highRated = createFilter("rating", ">=", 4);
 *   highRated({ name: "Punjab Dhaba", rating: 4.5 }) // => true
 *
 *   const byRating = createSorter("rating", "desc");
 *   [{ rating: 3 }, { rating: 5 }].sort(byRating)
 *   // => [{ rating: 5 }, { rating: 3 }]
 */
export function createFilter(field, operator, value) {
  // *      - Returns a FUNCTION that filters objects
  //  *      - Operators: ">", "<", ">=", "<=", "==="
  //  *      - e.g., createFilter("rating", ">=", 4) returns a function that
  //  *        takes an object and returns true if object.rating >= 4
  //  *      - Unknown operator => return function that always returns false

  return function (object) {
    switch (operator) {
      case ">":
        return object[field] > value;
      case "<":
        return object[field] < value;
      case "<=":
        return object[field] <= value;
      case ">=":
        return object[field] >= value;
      case "===":
        return object[field] === value;

      default:
        return false;
    }
  };
}

export function createSorter(field, order = "asc") {
  // 2. createSorter(field, order = "asc")
  //  *      - Returns a COMPARATOR function for Array.sort()
  //  *      - order "asc" => ascending, "desc" => descending
  //  *      - Works with both numbers and strings

  return function (a, b) {
    if (typeof a[field] === "number") {
      if (order === "asc") return a[field] - b[field];
      else return b[field] - a[field];
    } else {
      if (order === "asc") return a[field].localeCompare(b[field]);
      else return b[field].localeCompare(a[field]);
    }
  };
}

export function createMapper(fields) {
  // Your code here
  //  fields: array of field names, e.g., ["name", "rating"]
  //  *      - Returns a function that takes an object and returns a new object
  //  *        with ONLY the specified fields
  //  *      - e.g., createMapper(["name"])({name: "Dhaba", rating: 4}) => {name: "Dhaba"}
  //  *
  return function (object) {
    let res = {};
    for (const element of fields) {
      if (object[element]) {
        res[element] = object[element];
      }
    }

    return res;
  };
  // console.log(fields);
}

export function applyOperations(data, ...operations) {
  // Your code here
  //  *   4. applyOperations(data, ...operations)
  //  *      - data: array of objects[{},{},{}]
  //  *      - operations: any number of functions to apply SEQUENTIALLY
  //  *      - Each operation takes an array and returns an array
  //  *      - Apply first operation to data, then second to result, etc.
  //  *      - Return final result
  //  *      - Agar data not array, return []
  //  *
  //  * Hint: HOF = functions that take functions as arguments or return functions.
  //  *   createFilter returns a function. applyOperations takes functions as args.
  //  *

  if (!Array.isArray(data)) return [];
  return operations.reduce((result, operation) => operation(result), data);




  // Step 2: start with original data
  // let result = data;

  // // Step 3: apply each operation one by one (sequentially)
  // for (const operation of operations) {
  //   if (typeof operation === "function") {
  //     result = operation(result); // pass previous result to next function
  //   }
  // }

  // // Step 4: return final transformed result
  // return result;

}
