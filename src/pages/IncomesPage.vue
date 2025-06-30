<template>
  <div>
    <h2>Доходы</h2>
    <input type="date" v-model="dateFrom" />
    <input type="date" v-model="dateTo" />
    <button @click="loadData">Загрузить</button>

    <ChartBlock :labels="chartLabels" :data="chartData" />
    <DataTable :items="paginated" />

    <div>
      <button @click="prevPage" :disabled="page === 1">Назад</button>
      <span>Страница {{ page }}</span>
      <button @click="nextPage">Вперёд</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { fetchData } from '../services/api';
import ChartBlock from '../components/ChartBlock.vue';
import DataTable from '../components/DataTable.vue';
import { Item } from '../types/item';

const items = ref<Item[]>([]);
const page = ref(1);
const dateFrom = ref('2025-01-01');
const dateTo = ref('2025-12-31');

const loadData = async () => {
  const response = await fetchData('incomes', {
    dateFrom: dateFrom.value,
    dateTo: dateTo.value,
    page: page.value,
    limit: 50,
  });
  items.value = response.data || [];
};

const chartGrouped = computed(() => {
  const result: Record<string, number> = {};
  for (const item of items.value) {
    const date = item.date;
    const quantity = Number(item.quantity ?? 0);
    result[date] = (result[date] || 0) + quantity;
  }
  return result;
});

const chartLabels = computed(() => Object.keys(chartGrouped.value));
const chartData = computed(() => Object.values(chartGrouped.value));
const paginated = computed(() => items.value);

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    loadData();
  }
};

const nextPage = () => {
  page.value++;
  loadData();
};

loadData();
</script>