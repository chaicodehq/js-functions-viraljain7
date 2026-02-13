/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  //   // Your code here *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
  //  *      - Destructured parameter with defaults!
  //  *      - Meal prices per day: veg=80, nonveg=120, jain=90
  //  *      - Agar mealType unknown hai, return null
  //  *      - Agar name missing/empty, return null
  //  *      - Return: { name, mealType, days, dailyRate, totalCost }

  let dailyRate;
  if (mealType === "veg") dailyRate = 80;
  else if (mealType === "nonveg") dailyRate = 120;
  else if (mealType === "jain") dailyRate = 90;
  else return null;

  if (name === "") return null;
  else if (name)
    return { name, mealType, days, dailyRate, totalCost: days * dailyRate };
  else return null;
}

export function combinePlans(...plans) {
  let plansArr = [...plans];
  // console.log([...plans])

  if (plansArr.length === 0) return null;

  let totalCustomers = plansArr.length;
  let totalRevenue = plansArr.reduce((ac, el) => el.totalCost + ac, 0);
  let mealBreakdown = plansArr.reduce((ac, el) => {
    ac[el.mealType] = (ac[el.mealType] || 0) + 1;

    return ac;
  }, {});

  return { totalCustomers, totalRevenue, mealBreakdown };
  // Your code here

  //  *   2. combinePlans(...plans)
  //  *      - Rest parameter! Takes any number of plan objects
  //  *      - Each plan: { name, mealType, days, dailyRate, totalCost }
  //  *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
  //  *      - mealBreakdown: { veg: count, nonveg: count, ... }
  //  *      - Agar koi plans nahi diye, return null
  //  *

  // { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
}

export function applyAddons(plan, ...addons) {
  // Your code here


  //  *   3. applyAddons(plan, ...addons)
  //  *      - plan: { name, mealType, days, dailyRate, totalCost }
  //  *      - Each addon: { name: "raita", price: 15 }
  //  *      - Add each addon price to dailyRate
  //  *      - Recalculate totalCost = new dailyRate * days
  //  *      - Return NEW plan object (don't modify original)
  //  *      - addonNames: array of addon names added
  //  *      - Agar plan null hai, return null
  //    - Return: { name, mealType, days, dailyRate, totalCost }



  if (plan === null) return null;

  let addonsList = addons.map((el) => el.name);
  
  let addonsCost = addons.reduce((ac, el) => el.price + ac, 0);

  let newDailyRate = plan.dailyRate + addonsCost;

  let mealType = plan.mealType;
  let days = plan.days;
  let dailyRate = newDailyRate;
  let totalCost = dailyRate * days;

  console.log(addonsList);


  return {
    name: plan.name,
    mealType,
    days,
    dailyRate,
    totalCost,
    addonNames: addonsList,
  };
}
