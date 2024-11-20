import * as cheerio from "cheerio";

export const getPriceByUrl = async (url?: string) => {
  if (!url) return null;
  const a = await fetch(`https://www.pricecharting.com/game/${url}`).then(
    (rsp) => rsp.text(),
  );

  const $ = cheerio.load(a);
  const rates = (
    await fetch("https://api.fxratesapi.com/latest").then((rsp) => rsp.json())
  ).rates;
  const loose = parseFloat(
    ($("#used_price .price").html() || "").trim().replace("$", ""),
  );
  const complete = parseFloat(
    ($("#complete_price .price").html() || "").trim().replace("$", ""),
  );
  const newPrice = parseFloat(
    ($("#new_price .price").html() || "").trim().replace("$", ""),
  );
  const box = parseFloat(
    ($("#box_only_price .price").html() || "").trim().replace("$", ""),
  );
  const manual = parseFloat(
    ($("#manual_only_price .price").html() || "").trim().replace("$", ""),
  );
  return {
    usd: {
      loose,
      complete,
      new: newPrice,
      box: box,
      manual,
    },
    gbp: {
      loose: parseFloat((loose * rates.GBP).toFixed(2)),
      complete: parseFloat((complete * rates.GBP).toFixed(2)),
      new: parseFloat((newPrice * rates.GBP).toFixed(2)),
      box: parseFloat((box * rates.GBP).toFixed(2)),
      manual: parseFloat((manual * rates.GBP).toFixed(2)),
    },
    eur: {
      loose: parseFloat((loose * rates.EUR).toFixed(2)),
      complete: parseFloat((complete * rates.EUR).toFixed(2)),
      new: parseFloat((newPrice * rates.EUR).toFixed(2)),
      box: parseFloat((box * rates.EUR).toFixed(2)),
      manual: parseFloat((manual * rates.EUR).toFixed(2)),
    },
  };
};
