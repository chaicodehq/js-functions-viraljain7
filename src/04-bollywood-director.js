/**
 * 🎬 Bollywood Scene Director - Factory Functions
 *
 * Bollywood ka script generator bana! Factory functions use karo — matlab
 * aise functions jo DOOSRE functions return karte hain. Pehle configuration
 * do, phir ek specialized function milega jo kaam karega.
 *
 * Functions:
 *
 *   1. createDialogueWriter(genre)
 *      - Factory: returns a function (hero, villain) => string
 *      - Genres and their dialogue templates:
 *        "action"  => `${hero} says: 'Tujhe toh main dekh lunga, ${villain}!'`
 *        "romance" => `${hero} whispers: '${villain}, tum mere liye sab kuch ho'`
 *        "comedy"  => `${hero} laughs: '${villain} bhai, kya kar rahe ho yaar!'`
 *        "drama"   => `${hero} cries: '${villain}, tune mera sab kuch cheen liya!'`
 *      - Unknown genre => return null (not a function, just null)
 *      - Returned function: if hero or villain empty/missing, return "..."
 *
 *   2. createTicketPricer(basePrice)
 *      - Factory: returns a function (seatType, isWeekend = false) => price
 *      - Seat multipliers: silver=1, gold=1.5, platinum=2
 *      - Agar isWeekend, multiply final price by 1.3 (30% extra)
 *      - Round to nearest integer
 *      - Unknown seatType in returned fn => return null
 *      - Agar basePrice not positive number => return null (not a function)
 *
 *   3. createRatingCalculator(weights)
 *      - Factory: returns a function (scores) => weighted average
 *      - weights: { story: 0.3, acting: 0.3, direction: 0.2, music: 0.2 }
 *      - scores: { story: 8, acting: 9, direction: 7, music: 8 }
 *      - Weighted avg = sum of (score * weight) for matching keys
 *      - Round to 1 decimal place
 *      - Agar weights not an object => return null
 *
 * Hint: A factory function RETURNS another function. The returned function
 *   "remembers" the parameters of the outer function (this is a closure!).
 *
 * @example
 *   const actionWriter = createDialogueWriter("action");
 *   actionWriter("Shah Rukh", "Raees")
 *   // => "Shah Rukh says: 'Tujhe toh main dekh lunga, Raees!'"
 *
 *   const pricer = createTicketPricer(200);
 *   pricer("gold", true)  // => 200 * 1.5 * 1.3 = 390
 */
export function createDialogueWriter(genre) {
  //   // Your code here*
  //  *   1. createDialogueWriter(genre)
  //  *      - Factory: returns a function (hero, villain) => string
  //  *      - Genres and their dialogue templates:
  //  *        "action"  => `${hero} says: 'Tujhe toh main dekh lunga, ${villain}!'`
  //  *        "romance" => `${hero} whispers: '${villain}, tum mere liye sab kuch ho'`
  //  *        "comedy"  => `${hero} laughs: '${villain} bhai, kya kar rahe ho yaar!'`
  //  *        "drama"   => `${hero} cries: '${villain}, tune mera sab kuch cheen liya!'`
  //  *      - Unknown genre => return null (not a function, just null)
  //  *      - Returned function: if hero or villain empty/missing, return "..."
  //  *

  let validGenre = ["action", "romance", "comedy", "drama"];

  if (!validGenre.includes(genre)) return null;

  return (hero, villain) => {
    if (
      hero === "" ||
      villain === "" ||
      typeof hero === "undefined" ||
      typeof villain === "undefined"
    )
      return "...";
    let res;
    switch (genre) {
      case "action":
        res = `${hero} says: 'Tujhe toh main dekh lunga, ${villain}!'`;
        break;
      case "romance":
        res = `${hero} whispers: '${villain}, tum mere liye sab kuch ho'`;
        break;
      case "comedy":
        res = `${hero} laughs: '${villain} bhai, kya kar rahe ho yaar!'`;
        break;
      case "drama":
        res = `${hero} cries: '${villain}, tune mera sab kuch cheen liya!'`;
        break;

      default:
        res = "...";
    }
    return res;
  };
}

export function createTicketPricer(basePrice) {
  // Your code here

  //  *   2. createTicketPricer(basePrice)
  //  *      - Factory: returns a function (seatType, isWeekend = false) => price
  //  *      - Seat multipliers: silver=1, gold=1.5, platinum=2
  //  *      - Agar isWeekend, multiply final price by 1.3 (30% extra)
  //  *      - Round to nearest integer
  //  *      - Unknown seatType in returned fn => return null
  //  *      - Agar basePrice not positive number => return null (not a function)
  //  *

  if (basePrice <= 0 || typeof basePrice !== "number") return null;

  return (seatType, isWeekend = false) => {
    switch (seatType) {
      case "silver":
        basePrice *= 1;
        break;
      case "gold":
        basePrice *= 1.5;
        break;

      case "platinum":
        basePrice *= 2;
        break;

      default:
        return null;
    }

    if (isWeekend) basePrice *= 1.3;
    return Math.round(basePrice);
  };
}

export function createRatingCalculator(weights) {
  // Agar weights not an object => return null
  if (!weights || typeof weights !== "object" || Array.isArray(weights)) {
    return null;
  }

  // Factory: returns a function (scores) => weighted average
  return (scores) => {
    let sum = 0;

    // Loop over weights keys (matching keys only as per spec)
    for (const key in weights) {
      if (scores && key in scores) {
        sum += weights[key] * scores[key];
      }
    }

    // Round to 1 decimal place (VERY IMPORTANT for tests)
    return Math.round(sum * 10) / 10;
  };
}
