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
import { PieChart as EPieChart } from "echarts/charts";
import { TooltipComponent, LegendComponent } from "echarts/components";
import VChart from "vue-echarts";
import { useChartTheme } from "@/composables/useChartTheme";

use([CanvasRenderer, EPieChart, TooltipComponent, LegendComponent]);

const props = defineProps({
  title: { type: String, default: "" },
  // [{ name: 'بحث مباشر', value: 335, color: '#...' }]
  data: { type: Array, required: true },
  height: { type: String, default: "360px" },
});

const { palette, baseTextStyle, baseTooltip, subTextColor } = useChartTheme();

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
      type: "pie",
      radius: "65%",
      center: ["50%", "45%"],
      data: props.data.map((d) => ({ name: d.name, value: d.value })),
      label: { color: subTextColor },
      emphasis: {
        itemStyle: { shadowBlur: 12, shadowColor: "rgba(0,0,0,0.2)" },
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
