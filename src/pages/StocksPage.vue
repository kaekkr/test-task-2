<template>
  <div>
    <h2>Склады</h2>
    <input type="date" v-model="rawDate" />
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

const items = ref([]);
const page = ref(1);
const today = new Date().toISOString().slice(0, 10);
const rawDate = ref(today);

const dateFrom = computed(() => rawDate.value);

const loadData = async () => {
  const response = await fetchData('stocks', {
    dateFrom: dateFrom.value,
    page: page.value,
    limit: 50,
  });
  items.value = response.data || [];
};

const chartLabels = computed(() => items.value.map((item: any) => item.date));
const chartData = computed(() => items.value.map((item: any) => item.quantity));
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