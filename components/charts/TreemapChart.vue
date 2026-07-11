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
import { TreemapChart as ETreemapChart } from "echarts/charts";
import { TooltipComponent } from "echarts/components";
import VChart from "vue-echarts";
import { useChartTheme } from "@/composables/useChartTheme";

use([CanvasRenderer, ETreemapChart, TooltipComponent]);

const props = defineProps({
  title: { type: String, default: "" },
  // [{ name: 'إلكترونيات', value: 0, children: [{ name, value }] }]
  data: { type: Array, required: true },
  height: { type: String, default: "420px" },
});

const { palette, baseTextStyle, baseTooltip } = useChartTheme();

const option = computed(() => ({
  textStyle: baseTextStyle,
  color: palette,
  tooltip: { ...baseTooltip },
  series: [
    {
      type: "treemap",
      roam: false,
      nodeClick: false,
      breadcrumb: { show: false },
      label: { show: true, color: "#fff", fontWeight: 600 },
      upperLabel: { show: true, height: 24 },
      itemStyle: { borderColor: "#fff", gapWidth: 2 },
      data: props.data,
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
