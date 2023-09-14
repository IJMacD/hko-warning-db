type LiveCode = "WCOLD" | "WFIRE" | "WFNTSA" | "WFROST" | "WHOT" | "WL" | "WMSGNL" | "WRAIN" | "WTCSGNL" | "WTMW" | "WTS";
type HistoricalCode = "COLD" | "FNT" | "LS" | "RAIN_B" | "TC_10" | "TC_8NW" | "TC_9" | "FIRE_R" | "FROST" | "MSN" | "RAIN_R" | "TC_3" | "TC_8SE" | "THUNDER" | "FIRE_Y" | "HOT" | "RAIN_A" | "TC_1" | "TC_8NE" | "TC_8SW" | "TMW";
type LiveWarning = {
  Code: LiveCode;
  Icon: string;
};
type HistoricalWarning = {
  code: HistoricalCode;
  start: string;
  end: string;
};
export function mapLiveToHisorical(warning: LiveWarning): HistoricalWarning {
  let code: HistoricalCode = "THUNDER";

  if (warning.Code === "WCOLD") code = "COLD";
  else if (warning.Code === "WFIRE") code = (warning.Icon == "firer.gif") ? "FIRE_R" : "FIRE_Y";
  else if (warning.Code === "WFNTSA") code = "FNT";
  else if (warning.Code === "WFROST") code = "FROST";
  else if (warning.Code === "WHOT") code = "HOT";
  else if (warning.Code === "WL") code = "LS";
  else if (warning.Code === "WMSGNL") code = "MSN";
  else if (warning.Code === "WRAIN") {
    code = (warning.Icon == "rainb.gif") ? "RAIN_B" : (
      warning.Icon === "rainr.gif" ? "RAIN_R" : "RAIN_A"
    );
  }
  else if (warning.Code === "WTCSGNL") {
    code = `TC_${warning.Icon.substring(2, warning.Icon.length - 4).toUpperCase()}` as HistoricalCode;
  }
  else if (warning.Code === "WTMW") code = "TMW";
  else if (warning.Code === 'WTS') code = "THUNDER";

  return { code, start: "", end: "" };
}
