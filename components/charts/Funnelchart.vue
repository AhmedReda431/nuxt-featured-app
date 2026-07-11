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
import { FunnelChart as EFunnelChart } from "echarts/charts";
import { TooltipComponent, LegendComponent } from "echarts/components";
import VChart from "vue-echarts";
import { useChartsTheme } from "@/composables/useChartsTheme"

use([CanvasRenderer, EFunnelChart, TooltipComponent, LegendComponent]);

const props = defineProps({
  title: { type: String, default: "" },
  // [{ name: 'زيارات', value: 10000, color: '#...' }]
  data: { type: Array, required: true },
  height: { type: String, default: "380px" },
});

const { palette, baseTextStyle, baseTooltip, subTextColor } = useChartsTheme();

const option = computed(() => ({
  textStyle: baseTextStyle,
  color: props.data.map((d, i) => d.color || palette[i % palette.length]),
  tooltip: { trigger: "item", ...baseTooltip },
  legend: {
    orient: "horizontal",
    bottom: 0,
    textStyle: { color: subTextColor },
  },
  series: [
    {
      type: "funnel",
      left: "10%",
      width: "80%",
      top: 20,
      bottom: 40,
      sort: "descending",
      gap: 2,
      label: { show: true, position: "inside", color: "#fff", fontWeight: 600 },
      itemStyle: { borderColor: "#fff", borderWidth: 1 },
      data: props.data.map((d) => ({ name: d.name, value: d.value })),
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
