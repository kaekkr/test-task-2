<template>
  <table>
    <thead>
      <tr>
        <th v-for="(val, key) in items[0]" :key="key">{{ key }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td v-for="val in item" :key="val">{{ val }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({ items: Array });
</script>