<template>
  <div class="chart-card">
    <h3 v-if="title" class="chart-title">{{ title }}</h3>
    <v-chart
      class="chart-canvas"
      :option="option"
      :style="{ height }"
      autoresize
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { CandlestickChart as ECandlestickChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  DataZoomComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { useChartTheme } from "@/composables/useChartTheme";

use([
  CanvasRenderer,
  ECandlestickChart,
  GridComponent,
  TooltipComponent,
  DataZoomComponent,
]);

const props = defineProps({
  title: { type: String, default: "" },
  dates: { type: Array, required: true },
  // كل عنصر [open, close, low, high]
  data: { type: Array, required: true },
  height: { type: String, default: "400px" },
  upColor: { type: String, default: "#22C55E" },
  downColor: { type: String, default: "#EF4444" },
});

const { baseTextStyle, baseTooltip, baseGrid, splitLineColor, subTextColor } =
  useChartTheme();

const option = computed(() => ({
  textStyle: baseTextStyle,
  tooltip: { trigger: "axis", axisPointer: { type: "cross" }, ...baseTooltip },
  grid: { ...baseGrid, bottom: "18%" },
  xAxis: {
    type: "category",
    data: props.dates,
    axisLine: { lineStyle: { color: splitLineColor } },
    axisLabel: { color: subTextColor },
  },
  yAxis: {
    type: "value",
    scale: true,
    splitLine: { lineStyle: { color: splitLineColor } },
    axisLabel: { color: subTextColor },
  },
  dataZoom: [
    { type: "inside", start: 0, end: 100 },
    { type: "slider", start: 0, end: 100, height: 18, bottom: 0 },
  ],
  series: [
    {
      type: "candlestick",
      data: props.data,
      itemStyle: {
        color: props.upColor,
        color0: props.downColor,
        borderColor: props.upColor,
        borderColor0: props.downColor,
      },
    },
  ],
}));
</script>

<style scoped>
.chart-card {
  width: 100%;
}
.chart-title {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 8px;
}
.chart-canvas {
  width: 100%;
}
</style>
