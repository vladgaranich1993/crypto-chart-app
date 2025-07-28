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
type CryptoPrices = Record<string, PricePoint[]>;

const selectedAssets = ["BTC-USD", "ETH-USD", "DOGE-USD", "LTC-USD", "ADA-USD"];

const { data, pending, error } = useCryptoPrices(selectedAssets) as {
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

  const seriesData: Highcharts.SeriesLineOptions[] = Object.entries(val)
    .slice(0, 5)
    .map(([symbol, prices]) => ({
      type: "line",
      name: symbol,
      data: prices.map((p) => [p.time, p.price]),
    }));

  chartInstance?.destroy();
  chartInstance = Highcharts.chart(container, {
    chart: { type: "line" },
    title: { text: "Crypto Prices (Coinbase)" },
    subtitle: { text: "Last 12 months – Daily close" },
    xAxis: {
      type: "datetime",
      title: { text: "Date" },
      labels: {
        format: "{value:%b %Y}",
      },
    },
    yAxis: {
      title: { text: "Price (USD)" },
    },
    tooltip: {
      shared: true,
      valueDecimals: 2,
      formatter: function () {
        return (
          `<b>${Highcharts.dateFormat("%b %e, %Y", this.x)}</b><br/>` +
          this.points!.map(
            (p) =>
              `<span style="color:${p.color}">●</span> ${
                p.series.name
              }: $${p.y.toFixed(2)}`
          ).join("<br/>")
        );
      },
    },
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
      maxHeight: 70,
      itemStyle: {
        textOverflow: "ellipsis",
      },
      navigation: {
        activeColor: "#000",
        animation: true,
        arrowSize: 12,
        style: {
          fontWeight: "bold",
          color: "#333",
        },
      },
    },
    plotOptions: {
      series: {
        label: { connectorAllowed: false },
        showCheckbox: false,
      },
    },
    series: seriesData,
    responsive: {
      rules: [
        {
          condition: { maxWidth: 500 },
          chartOptions: {
            legend: {
              layout: "vertical",
              align: "right",
              verticalAlign: "middle",
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
