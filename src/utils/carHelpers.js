export const safeLower = (v) =>
  typeof v === "string" ? v.toLowerCase() : "";

export const getCarName = (car) =>
  `${car.brand} ${car.model}`;

export const getCategory = (car) => {
  const fuel = safeLower(car.fuelType);
  const body = safeLower(car.bodyType);
  const hp = car.engine?.horsepower ?? 0;
  const zero = car.performance?.zeroToHundred ?? Infinity;

  if (fuel === "electric") return "electric";

  if (
    body.includes("sports") ||
    body.includes("supercar") ||
    body.includes("hypercar") ||
    hp >= 300 ||
    zero <= 4.5
  ) return "sports";

  if (body.includes("suv")) return "suv";

  if (
    ["sedan", "hatchback", "mpv"].some(t => body.includes(t))
  ) return "family";

  return "others";
};
