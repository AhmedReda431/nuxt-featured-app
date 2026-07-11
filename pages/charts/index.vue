<template>
  <div class="charts-page">
    <header class="page-header">
      <h1>{{ $t("charts.page.title") }}</h1>
      <p>{{ $t("charts.page.subtitle") }}</p>
    </header>

    <div v-if="loadError" class="error-state">
      {{ $t("charts.error.message") }}
      <button class="retry-btn" @click="loadAllChartsData">
        {{ $t("charts.error.retry") }}
      </button>
    </div>

    <ClientOnly>
      <div class="charts-grid">
        <div class="grid-item">
          <Suspense>
            <BarChartAsync
              v-if="barChart"
              :title="$t('charts.titles.bar')"
              :categories="barChart.categories"
              :series="barChart.series"
            />
            <div v-else class="chart-skeleton">
              {{ $t("charts.loading.skeleton") }}
            </div>
          </Suspense>
        </div>

        <div class="grid-item">
          <Suspense>
            <LineChartAsync
              v-if="lineChart"
              :title="$t('charts.titles.line')"
              :categories="lineChart.categories"
              :series="lineChart.series"
            />
            <div v-else class="chart-skeleton">
              {{ $t("charts.loading.skeleton") }}
            </div>
          </Suspense>
        </div>

        <div class="grid-item">
          <Suspense>
            <AreaChartAsync
              v-if="areaChart"
              :title="$t('charts.titles.area')"
              :categories="areaChart.categories"
              :series="areaChart.series"
              stacked
            />
            <div v-else class="chart-skeleton">
              {{ $t("charts.loading.skeleton") }}
            </div>
          </Suspense>
        </div>

        <div class="grid-item">
          <Suspense>
            <PieChartAsync
              v-if="pieChart"
              :title="$t('charts.titles.pie')"
              :data="pieChart.data"
            />
            <div v-else class="chart-skeleton">
              {{ $t("charts.loading.skeleton") }}
            </div>
          </Suspense>
        </div>

        <div class="grid-item">
          <Suspense>
            <DonutChartAsync
              v-if="donutChart"
              :title="$t('charts.titles.donut')"
              :center-label="donutChart.centerLabel"
              :data="donutChart.data"
            />
            <div v-else class="chart-skeleton">
              {{ $t("charts.loading.skeleton") }}
            </div>
          </Suspense>
        </div>

        <div class="grid-item">
          <Suspense>
            <RadarChartAsync
              v-if="radarChart"
              :title="$t('charts.titles.radar')"
              :indicators="radarChart.indicators"
              :series="radarChart.series"
            />
            <div v-else class="chart-skeleton">
              {{ $t("charts.loading.skeleton") }}
            </div>
          </Suspense>
        </div>

        <div class="grid-item">
          <Suspense>
            <ScatterChartAsync
              v-if="scatterChart"
              :title="$t('charts.titles.scatter')"
              :x-name="$t('charts.data.scatter.xName')"
              :y-name="$t('charts.data.scatter.yName')"
              :series="scatterChart.series"
            />
            <div v-else class="chart-skeleton">
              {{ $t("charts.loading.skeleton") }}
            </div>
          </Suspense>
        </div>

        <div class="grid-item">
          <Suspense>
            <HeatmapChartAsync
              v-if="heatmapChart"
              :title="$t('charts.titles.heatmap')"
              :x-categories="heatmapChart.xCategories"
              :y-categories="heatmapChart.yCategories"
              :data="heatmapChart.data"
            />
            <div v-else class="chart-skeleton">
              {{ $t("charts.loading.skeleton") }}
            </div>
          </Suspense>
        </div>

        <div class="grid-item">
          <Suspense>
            <GaugeChartAsync
              v-if="gaugeChart"
              :title="$t('charts.titles.gauge')"
              :value="gaugeChart.value"
              unit="%"
            />
            <div v-else class="chart-skeleton">
              {{ $t("charts.loading.skeleton") }}
            </div>
          </Suspense>
        </div>

        <div class="grid-item grid-item--wide">
          <Suspense>
            <CandlestickChartAsync
              v-if="candlestickChart"
              :title="$t('charts.titles.candlestick')"
              :dates="candlestickChart.dates"
              :data="candlestickChart.data"
            />
            <div v-else class="chart-skeleton">
              {{ $t("charts.loading.skeleton") }}
            </div>
          </Suspense>
        </div>

        <div class="grid-item">
          <Suspense>
            <FunnelChartAsync
              v-if="funnelChart"
              :title="$t('charts.titles.funnel')"
              :data="funnelChart.data"
            />
            <div v-else class="chart-skeleton">
              {{ $t("charts.loading.skeleton") }}
            </div>
          </Suspense>
        </div>

        <div class="grid-item">
          <Suspense>
            <TreemapChartAsync
              v-if="treemapChart"
              :title="$t('charts.titles.treemap')"
              :data="treemapChart.data"
            />
            <div v-else class="chart-skeleton">
              {{ $t("charts.loading.skeleton") }}
            </div>
          </Suspense>
        </div>
      </div>

      <template #fallback>
        <div class="loading-state">{{ $t("charts.loading.fallback") }}</div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
// كل chart بيتحمل lazy عشان الصفحة ما تفضلش مستنية كل الـ echarts modules
// مع بعض، ودا بيقلل من الـ initial bundle size
const BarChartAsync = defineAsyncComponent(
  () => import("@/components/charts/BarChart.vue"),
);
const LineChartAsync = defineAsyncComponent(
  () => import("@/components/charts/LineChart.vue"),
);
const AreaChartAsync = defineAsyncComponent(
  () => import("@/components/charts/AreaChart.vue"),
);
const PieChartAsync = defineAsyncComponent(
  () => import("@/components/charts/PieChart.vue"),
);
const DonutChartAsync = defineAsyncComponent(
  () => import("@/components/charts/DonutChart.vue"),
);
const RadarChartAsync = defineAsyncComponent(
  () => import("@/components/charts/RadarChart.vue"),
);
const ScatterChartAsync = defineAsyncComponent(
  () => import("@/components/charts/ScatterChart.vue"),
);
const HeatmapChartAsync = defineAsyncComponent(
  () => import("@/components/charts/HeatmapChart.vue"),
);
const GaugeChartAsync = defineAsyncComponent(
  () => import("@/components/charts/GaugeChart.vue"),
);
const CandlestickChartAsync = defineAsyncComponent(
  () => import("@/components/charts/CandlestickChart.vue"),
);
const FunnelChartAsync = defineAsyncComponent(
  () => import("@/components/charts/FunnelChart.vue"),
);
const TreemapChartAsync = defineAsyncComponent(
  () => import("@/components/charts/TreemapChart.vue"),
);

// ─────────────────────────────────────────────────────────────
// الحالة (State)
// كل ref بيبدأ null، يعني الـ component المرتبط بيه بيعرض skeleton
// لحد ما الداتا توصل من الـ API.
//
// شكل كل object (مكتوب في الكومنت جنب كل دالة fetch) هو نفسه
// الـ props اللي الـ chart component محتاجها بالظبط. خليه زي ما هو
// حتى لو غيرت مصدر الداتا، عشان الـ components متتأثرش.
// ─────────────────────────────────────────────────────────────
const barChart = ref(null);
const lineChart = ref(null);
const areaChart = ref(null);
const pieChart = ref(null);
const donutChart = ref(null);
const radarChart = ref(null);
const scatterChart = ref(null);
const heatmapChart = ref(null);
const gaugeChart = ref(null);
const candlestickChart = ref(null);
const funnelChart = ref(null);
const treemapChart = ref(null);

const loadError = ref(false);

// ─────────────────────────────────────────────────────────────
// دوال جلب الداتا
// دلوقتي كل دالة بترجع mock data. لما يبقى عندك الـ API الحقيقي،
// استبدل جوه كل دالة بـ استدعاء حقيقي، مع الحفاظ على نفس الـ shape
// اللي راجع دلوقتي. مثال حقيقي في نهاية الملف (تعليق).
// ─────────────────────────────────────────────────────────────

// يرجع: { categories: string[], series: [{ name, data: number[] }] }
async function fetchBarChartData() {
  // مثال حقيقي: return await $fetch('/api/analytics/sales-by-quarter')
  return {
    categories: ["Q1", "Q2", "Q3", "Q4"],
    series: [
      { name: "منتج A", data: [120, 200, 150, 80] },
      { name: "منتج B", data: [90, 130, 170, 140] },
    ],
  };
}

// يرجع: { categories: string[], series: [{ name, data: number[] }] }
async function fetchLineChartData() {
  return {
    categories: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
    series: [
      { name: "مستخدمين جدد", data: [820, 932, 901, 934, 1290, 1330] },
      { name: "مستخدمين نشطين", data: [620, 732, 701, 734, 1090, 1130] },
    ],
  };
}

// يرجع: { categories: string[], series: [{ name, data: number[] }] }
async function fetchAreaChartData() {
  return {
    categories: [
      "السبت",
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
    ],
    series: [
      { name: "موبايل", data: [320, 302, 301, 334, 390, 330, 320] },
      { name: "ديسكتوب", data: [220, 182, 191, 234, 290, 230, 220] },
    ],
  };
}

// يرجع: { data: [{ name, value }] }
async function fetchPieChartData() {
  return {
    data: [
      { name: "بحث مباشر", value: 335 },
      { name: "إعلانات", value: 310 },
      { name: "سوشيال ميديا", value: 234 },
      { name: "إيميل", value: 135 },
      { name: "أخرى", value: 148 },
    ],
  };
}

// يرجع: { centerLabel: string, data: [{ name, value }] }
async function fetchDonutChartData() {
  return {
    centerLabel: "1,240",
    data: [
      { name: "تم التسليم", value: 780 },
      { name: "قيد الشحن", value: 280 },
      { name: "ملغي", value: 90 },
      { name: "مرتجع", value: 90 },
    ],
  };
}

// يرجع: { indicators: [{ name, max }], series: [{ name, values: number[] }] }
async function fetchRadarChartData() {
  return {
    indicators: [
      { name: "Vue.js", max: 100 },
      { name: "Nuxt", max: 100 },
      { name: "TypeScript", max: 100 },
      { name: "CSS", max: 100 },
      { name: "Testing", max: 100 },
      { name: "React", max: 100 },
    ],
    series: [
      { name: "المستوى الحالي", values: [90, 85, 70, 80, 55, 40] },
      { name: "الهدف", values: [95, 95, 85, 85, 75, 70] },
    ],
  };
}

// يرجع: { series: [{ name, data: number[][] }] }
async function fetchScatterChartData() {
  return {
    series: [
      {
        name: "حملات 2026",
        data: [
          [10, 20],
          [15, 32],
          [20, 25],
          [25, 40],
          [30, 38],
          [35, 55],
          [40, 48],
          [45, 60],
          [50, 58],
        ],
      },
    ],
  };
}

// يرجع: { xCategories: string[], yCategories: string[], data: number[][] }
async function fetchHeatmapChartData() {
  return {
    xCategories: ["12ص", "4ص", "8ص", "12م", "4م", "8م"],
    yCategories: ["سبت", "أحد", "اثنين", "ثلاثاء", "أربعاء"],
    data: [
      [0, 0, 2],
      [0, 1, 5],
      [0, 2, 9],
      [0, 3, 4],
      [0, 4, 3],
      [0, 5, 1],
      [1, 0, 1],
      [1, 1, 4],
      [1, 2, 8],
      [1, 3, 6],
      [1, 4, 5],
      [1, 5, 2],
      [2, 0, 0],
      [2, 1, 3],
      [2, 2, 7],
      [2, 3, 9],
      [2, 4, 6],
      [2, 5, 3],
      [3, 0, 2],
      [3, 1, 2],
      [3, 2, 6],
      [3, 3, 8],
      [3, 4, 7],
      [3, 5, 4],
      [4, 0, 1],
      [4, 1, 3],
      [4, 2, 9],
      [4, 3, 10],
      [4, 4, 8],
      [4, 5, 5],
    ],
  };
}

// يرجع: { value: number }
async function fetchGaugeChartData() {
  return { value: 72 };
}

// يرجع: { dates: string[], data: number[][] } — كل صف [open, close, low, high]
async function fetchCandlestickChartData() {
  return {
    dates: ["1", "2", "3", "4", "5", "6", "7", "8"],
    data: [
      [20, 34, 10, 38],
      [40, 35, 30, 50],
      [31, 38, 33, 44],
      [38, 15, 5, 42],
      [15, 20, 8, 25],
      [20, 33, 18, 38],
      [33, 28, 22, 40],
      [28, 30, 20, 35],
    ],
  };
}

// يرجع: { data: [{ name, value }] }
async function fetchFunnelChartData() {
  return {
    data: [
      { name: "زيارات", value: 10000 },
      { name: "تسجيل", value: 4200 },
      { name: "إضافة للسلة", value: 2100 },
      { name: "بدء الدفع", value: 1200 },
      { name: "شراء مكتمل", value: 780 },
    ],
  };
}

// يرجع: { data: [{ name, value, children? }] }
async function fetchTreemapChartData() {
  return {
    data: [
      {
        name: "إلكترونيات",
        value: 0,
        children: [
          { name: "موبايلات", value: 420 },
          { name: "لابتوبات", value: 310 },
          { name: "إكسسوارات", value: 150 },
        ],
      },
      {
        name: "أزياء",
        value: 0,
        children: [
          { name: "رجالي", value: 220 },
          { name: "حريمي", value: 260 },
        ],
      },
      {
        name: "منزل",
        value: 0,
        children: [
          { name: "مطبخ", value: 140 },
          { name: "ديكور", value: 90 },
        ],
      },
    ],
  };
}

// ─────────────────────────────────────────────────────────────
// تحميل كل الداتا مع بعض (parallel) وتوزيعها على الـ refs
// ─────────────────────────────────────────────────────────────
async function loadAllChartsData() {
  loadError.value = false;
  try {
    const [
      bar,
      line,
      area,
      pie,
      donut,
      radar,
      scatter,
      heatmap,
      gauge,
      candlestick,
      funnel,
      treemap,
    ] = await Promise.all([
      fetchBarChartData(),
      fetchLineChartData(),
      fetchAreaChartData(),
      fetchPieChartData(),
      fetchDonutChartData(),
      fetchRadarChartData(),
      fetchScatterChartData(),
      fetchHeatmapChartData(),
      fetchGaugeChartData(),
      fetchCandlestickChartData(),
      fetchFunnelChartData(),
      fetchTreemapChartData(),
    ]);

    barChart.value = bar;
    lineChart.value = line;
    areaChart.value = area;
    pieChart.value = pie;
    donutChart.value = donut;
    radarChart.value = radar;
    scatterChart.value = scatter;
    heatmapChart.value = heatmap;
    gaugeChart.value = gauge;
    candlestickChart.value = candlestick;
    funnelChart.value = funnel;
    treemapChart.value = treemap;
  } catch (err) {
    loadError.value = true;
    console.error("Failed to load charts data:", err);
  }
}

onMounted(() => {
  loadAllChartsData();
});

/**
 * مثال لما يبقى عندك API حقيقي (Nuxt 3):
 *
 * async function fetchBarChartData() {
 *   const res = await $fetch('/api/analytics/sales-by-quarter')
 *   return { categories: res.categories, series: res.series }
 * }
 *
 * لو الداتا لازم SSR (تظهر في أول render بدل skeleton)، استخدم useAsyncData بدل
 * onMounted + $fetch العادي:
 *
 * const { data: barData } = await useAsyncData('bar-chart', () => fetchBarChartData())
 * watchEffect(() => { barChart.value = barData.value })
 */
</script>

<style scoped>
.charts-page {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 4px;
}

.page-header p {
  color: #64748b;
  margin: 0;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 20px;
}

.grid-item {
  background: var(--color-bg);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
}

.grid-item--wide {
  grid-column: span 2;
}

@media (max-width: 900px) {
  .grid-item--wide {
    grid-column: span 1;
  }
}

.loading-state {
  padding: 60px;
  text-align: center;
  color: #94a3b8;
}

.chart-skeleton {
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 13px;
  background: linear-gradient(90deg, #f1f5f9 25%, #f8fafc 37%, #f1f5f9 63%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
  border-radius: 8px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

.error-state {
  padding: 16px;
  border-radius: 8px;
  background: #fef2f2;
  color: #b91c1c;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.retry-btn {
  border: 1px solid #b91c1c;
  background: transparent;
  color: #b91c1c;
  border-radius: 6px;
  padding: 4px 12px;
  cursor: pointer;
  font-size: 13px;
}

.retry-btn:hover {
  background: #b91c1c;
  color: #fff;
}
</style>
