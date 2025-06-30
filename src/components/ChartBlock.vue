<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup>
import { watch, onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({ labels: Array, data: Array });
const canvas = ref(null);
let chartInstance = null;

const renderChart = () => {
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(canvas.value, {
    type: 'bar',
    data: {
      labels: props.labels,
      datasets: [{ label: 'График', data: props.data }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
};

onMounted(renderChart);
watch(() => props.data, renderChart);
</script>