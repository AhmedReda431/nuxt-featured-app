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
import { GaugeChart as EGaugeChart } from "echarts/charts";
import { TooltipComponent } from "echarts/components";
import VChart from "vue-echarts";
import { useChartsTheme } from "@/composables/useChartsTheme"

use([CanvasRenderer, EGaugeChart, TooltipComponent]);

const props = defineProps({
  title: { type: String, default: "" },
  value: { type: Number, required: true },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  unit: { type: String, default: "%" },
  height: { type: String, default: "320px" },
  color: { type: String, default: "#6366F1" },
});

const { baseTextStyle, baseTooltip, subTextColor, textColor, splitLineColor } =
  useChartsTheme();

const option = computed(() => ({
  textStyle: baseTextStyle,
  tooltip: { ...baseTooltip },
  series: [
    {
      type: "gauge",
      min: props.min,
      max: props.max,
      startAngle: 200,
      endAngle: -20,
      progress: { show: true, width: 14, itemStyle: { color: props.color } },
      axisLine: { lineStyle: { width: 14, color: [[1, splitLineColor]] } },
      axisTick: { show: false },
      splitLine: { length: 10, lineStyle: { color: splitLineColor } },
      axisLabel: { color: subTextColor, fontSize: 11, distance: 15 },
      pointer: { show: false },
      anchor: { show: false },
      detail: {
        valueAnimation: true,
        formatter: (val) => `${val}${props.unit}`,
        color: textColor,
        fontSize: 26,
        fontWeight: 700,
        offsetCenter: [0, "10%"],
      },
      title: { show: false },
      data: [{ value: props.value }],
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
