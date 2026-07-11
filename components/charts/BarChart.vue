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
import { BarChart as EBarChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { useChartsTheme } from "@/composables/useChartsTheme"

use([
  CanvasRenderer,
  EBarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);

const props = defineProps({
  title: { type: String, default: "" },
  // [{ name: 'Q1', ... }]
  categories: { type: Array, required: true },
  // [{ name: 'منتج A', data: [1,2,3], color: '#...' }]
  series: { type: Array, required: true },
  height: { type: String, default: "360px" },
  horizontal: { type: Boolean, default: false },
  stacked: { type: Boolean, default: false },
});

const {
  palette,
  baseTextStyle,
  baseTooltip,
  baseGrid,
  splitLineColor,
  subTextColor,
} = useChartsTheme();

const option = computed(() => {
  const axisCategory = {
    type: "category",
    data: props.categories,
    axisLine: { lineStyle: { color: splitLineColor } },
    axisLabel: { color: subTextColor },
  };
  const axisValue = {
    type: "value",
    splitLine: { lineStyle: { color: splitLineColor } },
    axisLabel: { color: subTextColor },
  };

  return {
    textStyle: baseTextStyle,
    color: props.series.map((s, i) => s.color || palette[i % palette.length]),
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      ...baseTooltip,
    },
    legend: {
      show: props.series.length > 1,
      textStyle: { color: subTextColor },
      top: 0,
    },
    grid: baseGrid,
    xAxis: props.horizontal ? axisValue : axisCategory,
    yAxis: props.horizontal ? axisCategory : axisValue,
    series: props.series.map((s) => ({
      name: s.name,
      type: "bar",
      data: s.data,
      stack: props.stacked ? "total" : undefined,
      barMaxWidth: 40,
      itemStyle: {
        borderRadius: props.horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0],
      },
    })),
  };
});
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
