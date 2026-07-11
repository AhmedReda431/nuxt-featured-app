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
  // [{ name: 'تم التسليم', value: 780, color: '#...' }]
  data: { type: Array, required: true },
  height: { type: String, default: "360px" },
  centerLabel: { type: String, default: "" },
});

const { palette, baseTextStyle, baseTooltip, subTextColor, textColor } =
  useChartTheme();

const total = computed(() => props.data.reduce((sum, d) => sum + d.value, 0));

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
      radius: ["55%", "75%"],
      center: ["50%", "45%"],
      avoidLabelOverlap: true,
      itemStyle: { borderRadius: 6, borderColor: "#fff", borderWidth: 2 },
      label: {
        show: true,
        position: "center",
        formatter: () => props.centerLabel || String(total.value),
        fontSize: 20,
        fontWeight: 700,
        color: textColor,
      },
      emphasis: { label: { show: true } },
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
