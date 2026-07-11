/**
 * useChartsTheme
 * ثيم مشترك لكل الـ chart components عشان الألوان تبقى متسقة في كل المشروع.
 * لو عندك Vuetify theme، تقدر تستبدل القيم دي بـ useTheme().current.value.colors
 */
export function useChartsTheme() {
  const palette = [
    "#6366F1", // indigo
    "#22C55E", // green
    "#F59E0B", // amber
    "#EF4444", // red
    "#06B6D4", // cyan
    "#EC4899", // pink
    "#8B5CF6", // violet
    "#84CC16", // lime
    "#F97316", // orange
    "#14B8A6", // teal
  ];

  const textColor = "#334155";
  const subTextColor = "#94A3B8";
  const splitLineColor = "#E2E8F0";
  const backgroundColor = "transparent";

  const baseTextStyle = {
    fontFamily: "inherit",
    color: textColor,
  };

  const baseTooltip = {
    backgroundColor: "#1E293B",
    borderWidth: 0,
    textStyle: { color: "#F8FAFC", fontSize: 12 },
    padding: [8, 12],
  };

  const baseGrid = {
    left: "3%",
    right: "4%",
    bottom: "3%",
    top: "15%",
    containLabel: true,
  };

  return {
    palette,
    textColor,
    subTextColor,
    splitLineColor,
    backgroundColor,
    baseTextStyle,
    baseTooltip,
    baseGrid,
  };
}
