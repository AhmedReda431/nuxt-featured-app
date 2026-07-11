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
import { RadarChart as ERadarChart } from "echarts/charts";
import {
  RadarComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { useChartsTheme } from "@/composables/useChartsTheme"

use([
  CanvasRenderer,
  ERadarChart,
  RadarComponent,
  TooltipComponent,
  LegendComponent,
]);

const props = defineProps({
  title: { type: String, default: "" },
  // [{ name: 'Vue.js', max: 100 }]
  indicators: { type: Array, required: true },
  // [{ name: 'المستوى الحالي', values: [90, 85, ...], color: '#...' }]
  series: { type: Array, required: true },
  height: { type: String, default: "360px" },
});

const { palette, baseTextStyle, baseTooltip, splitLineColor, subTextColor } =
  useChartsTheme();

const option = computed(() => ({
  textStyle: baseTextStyle,
  color: props.series.map((s, i) => s.color || palette[i % palette.length]),
  tooltip: { trigger: "item", ...baseTooltip },
  legend: {
    show: props.series.length > 1,
    textStyle: { color: subTextColor },
    bottom: 0,
  },
  radar: {
    indicator: props.indicators,
    splitLine: { lineStyle: { color: splitLineColor } },
    axisName: { color: subTextColor },
  },
  series: [
    {
      type: "radar",
      data: props.series.map((s) => ({
        name: s.name,
        value: s.values,
        areaStyle: { opacity: 0.15 },
      })),
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
