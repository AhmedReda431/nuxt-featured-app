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
import { HeatmapChart as EHeatmapChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { useChartsTheme } from "@/composables/useChartsTheme"

use([
  CanvasRenderer,
  EHeatmapChart,
  GridComponent,
  TooltipComponent,
  VisualMapComponent,
]);

const props = defineProps({
  title: { type: String, default: "" },
  xCategories: { type: Array, required: true },
  yCategories: { type: Array, required: true },
  // كل عنصر [xIndex, yIndex, value]
  data: { type: Array, required: true },
  height: { type: String, default: "400px" },
  minColor: { type: String, default: "#E0E7FF" },
  maxColor: { type: String, default: "#4338CA" },
});

const { baseTextStyle, baseTooltip, splitLineColor, subTextColor } =
  useChartsTheme();

const maxValue = computed(() => Math.max(...props.data.map((d) => d[2])));

const option = computed(() => ({
  textStyle: baseTextStyle,
  tooltip: { position: "top", ...baseTooltip },
  grid: { left: "10%", right: "5%", top: "10%", bottom: "15%" },
  xAxis: {
    type: "category",
    data: props.xCategories,
    splitArea: { show: true },
    axisLabel: { color: subTextColor },
  },
  yAxis: {
    type: "category",
    data: props.yCategories,
    splitArea: { show: true },
    axisLabel: { color: subTextColor },
  },
  visualMap: {
    min: 0,
    max: maxValue.value,
    calculable: true,
    orient: "horizontal",
    bottom: 0,
    inRange: { color: [props.minColor, props.maxColor] },
    textStyle: { color: subTextColor },
  },
  series: [
    {
      type: "heatmap",
      data: props.data,
      label: { show: true, color: subTextColor },
      itemStyle: { borderColor: splitLineColor, borderWidth: 1 },
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
