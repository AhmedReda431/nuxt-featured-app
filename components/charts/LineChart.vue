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
import { LineChart as ELineChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { useChartsTheme } from "@/composables/useChartsTheme"

use([
  CanvasRenderer,
  ELineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);

const props = defineProps({
  title: { type: String, default: "" },
  categories: { type: Array, required: true },
  // [{ name: 'مستخدمين جدد', data: [1,2,3], color: '#...', smooth: true }]
  series: { type: Array, required: true },
  height: { type: String, default: "360px" },
});

const {
  palette,
  baseTextStyle,
  baseTooltip,
  baseGrid,
  splitLineColor,
  subTextColor,
} = useChartsTheme();

const option = computed(() => ({
  textStyle: baseTextStyle,
  color: props.series.map((s, i) => s.color || palette[i % palette.length]),
  tooltip: { trigger: "axis", ...baseTooltip },
  legend: {
    show: props.series.length > 1,
    textStyle: { color: subTextColor },
    top: 0,
  },
  grid: baseGrid,
  xAxis: {
    type: "category",
    data: props.categories,
    boundaryGap: false,
    axisLine: { lineStyle: { color: splitLineColor } },
    axisLabel: { color: subTextColor },
  },
  yAxis: {
    type: "value",
    splitLine: { lineStyle: { color: splitLineColor } },
    axisLabel: { color: subTextColor },
  },
  series: props.series.map((s) => ({
    name: s.name,
    type: "line",
    data: s.data,
    smooth: s.smooth ?? true,
    symbol: "circle",
    symbolSize: 6,
    lineStyle: { width: 3 },
  })),
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
