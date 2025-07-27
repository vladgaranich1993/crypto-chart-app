<template>
  <div ref="chartContainer" class="p-4 bg-white rounded shadow" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as Highcharts from "highcharts";

const chartContainer = ref<HTMLElement | null>(null);
let chartInstance: Highcharts.Chart | null = null;

const chartOptions: Highcharts.Options = {
  chart: { type: "line" },
  title: { text: "Crypto Prices (Mock)" },
  xAxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
  yAxis: { title: { text: "Price (USD)" } },
  series: [
    {
      type: "line",
      name: "BTC",
      data: [31000, 31500, 31200, 32000, 33000, 34000, 35000, 36000],
    },
    {
      type: "line",
      name: "ETH",
      data: [1900, 1950, 1920, 2000, 2100, 2200, 2300, 2400],
    },
  ],
  credits: { enabled: false },
};

onMounted(() => {
  if (chartContainer.value) {
    chartInstance = Highcharts.chart(chartContainer.value, chartOptions);
  }
});

onBeforeUnmount(() => {
  chartInstance?.destroy();
});
</script>
