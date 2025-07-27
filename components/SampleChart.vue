<template>
  <div class="p-4 bg-white rounded shadow">
    <h2 class="text-lg font-semibold mb-4">Crypto Prices (7 days)</h2>

    <div v-if="pending" class="text-gray-500">Loading prices...</div>
    <div v-else-if="error" class="text-red-500">Failed to load prices.</div>

    <div
      ref="chartContainer"
      v-show="!pending && !error"
      class="min-h-[300px]"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onBeforeUnmount } from "vue";
import * as Highcharts from "highcharts";
import { useCryptoPrices } from "../composables/useCryptoPrices";

const { data, pending, error } = useCryptoPrices();

const chartContainer = ref<HTMLElement | null>(null);
let chartInstance: Highcharts.Chart | null = null;

watchEffect(() => {
  const val = data.value;
  const container = chartContainer.value;

  if (!val || !container) return;
  if (!val["BTC-USD"] || !val["ETH-USD"]) return;

  const timestamps = val["BTC-USD"].map((p) =>
    new Date(p.time).toLocaleDateString()
  );
  const btcPrices = val["BTC-USD"].map((p) => Number(p.priceUsd));
  const ethPrices = val["ETH-USD"].map((p) => Number(p.priceUsd));

  chartInstance?.destroy();
  chartInstance = Highcharts.chart(container, {
    chart: { type: "line" },
    title: { text: "BTC & ETH Prices (Coinbase)" },
    subtitle: { text: "Past 7 days (Close price)" },
    xAxis: {
      categories: timestamps,
      title: { text: "Date" },
      accessibility: {
        rangeDescription: `Range: ${timestamps[0]} to ${
          timestamps[timestamps.length - 1]
        }`,
      },
    },
    yAxis: {
      title: { text: "Price (USD)" },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    plotOptions: {
      series: {
        label: { connectorAllowed: false },
      },
    },
    series: [
      { type: "line", name: "BTC", data: btcPrices },
      { type: "line", name: "ETH", data: ethPrices },
    ],
    responsive: {
      rules: [
        {
          condition: { maxWidth: 500 },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
    credits: { enabled: false },
  });
});

onBeforeUnmount(() => {
  chartInstance?.destroy();
});
</script>
