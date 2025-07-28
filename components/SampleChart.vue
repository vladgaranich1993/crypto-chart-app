<template>
  <div class="p-4 bg-white rounded shadow">
    <h2 class="text-lg font-semibold mb-4">Crypto Prices (Last Year)</h2>

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

type PricePoint = { time: number; price: number };
type CryptoPrices = {
  "BTC-USD": PricePoint[];
  "ETH-USD": PricePoint[];
};

const { data, pending, error } = useCryptoPrices() as {
  data: { value: CryptoPrices | null };
  pending: any;
  error: any;
};

const chartContainer = ref<HTMLElement | null>(null);
let chartInstance: Highcharts.Chart | null = null;

watchEffect(() => {
  const val = data.value;
  const container = chartContainer.value;

  if (!val || !container) return;
  if (!val["BTC-USD"] || !val["ETH-USD"]) return;

  const btcSeries = val["BTC-USD"].map((p) => [p.time, p.price]);
  const ethSeries = val["ETH-USD"].map((p) => [p.time, p.price]);

  chartInstance?.destroy();
  chartInstance = Highcharts.chart(container, {
    chart: { type: "line" },
    title: { text: "BTC & ETH Prices (Coinbase)" },
    subtitle: { text: "Past year - Daily closing price" },
    xAxis: {
      type: "datetime",
      title: { text: "Date" },
      labels: {
        format: "{value:%b %Y}", // shows e.g., "Jul 2024"
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
      { type: "line", name: "BTC", data: btcSeries },
      { type: "line", name: "ETH", data: ethSeries },
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
