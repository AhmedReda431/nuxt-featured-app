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
import { useChartsTheme } from "@/composables/useChartsTheme";

use([CanvasRenderer, ETreemapChart, TooltipComponent]);

const props = defineProps({
  title: { type: String, default: "" },
  data: { type: Array, required: true },
  height: { type: String, default: "420px" },
});

const { palette, baseTextStyle, baseTooltip } = useChartsTheme();

const option = computed(() => ({
  textStyle: baseTextStyle,
  color: palette,
  tooltip: {
    ...baseTooltip,
    formatter(info) {
      const val = info.value;
      const name = info.name;
      return `<div style="font-weight:600">${name}</div>
              <div style="font-size:12px;opacity:0.9">${val}</div>`;
    },
  },
  series: [
    {
      type: "treemap",
      roam: false,
      nodeClick: false,
      breadcrumb: { show: false },
      label: {
        show: true,
        color: "#fff",
        fontWeight: 600,
        formatter: "{b}\n{c}",
      },
      upperLabel: {
        show: true,
        height: 24,
        color: "#fff",
        fontWeight: "bold",
        backgroundColor: "rgba(0,0,0,0.2)",
      },
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 2,
        gapWidth: 2,
      },
      levels: [
        {
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 4,
            gapWidth: 4,
          },
          upperLabel: { show: false },
        },
        {
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 2,
            gapWidth: 2,
          },
        },
      ],
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
