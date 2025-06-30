<template>
  <div>
    <nav style="padding: 1rem; background: #f0f0f0">
      <router-link to="/incomes" style="margin-right: 10px">Доходы</router-link>
      <router-link to="/orders" style="margin-right: 10px">Заказы</router-link>
      <router-link to="/sales" style="margin-right: 10px">Продажи</router-link>
      <router-link to="/stocks">Склады</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup lang="ts">
</script>