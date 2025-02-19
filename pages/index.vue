<template>
  <div class="currency-container">
    <div class="controls">
      <el-select v-model="fromCurrency" placeholder="Qaysi valyutadan" @change="calculateAmount">
        <el-option v-for="currency in currencies" :key="currency.Ccy" :label="currency.CcyNm_UZ" :value="currency.Ccy" />
      </el-select>

      <el-select v-model="toCurrency" placeholder="Qaysi valyutaga" @change="calculateAmount">
        <el-option v-for="currency in currencies" :key="currency.Ccy" :label="currency.CcyNm_UZ" :value="currency.Ccy" />
      </el-select>

      <el-input v-model.number="amount" placeholder="Miqdorni kiriting" type="number" @input="calculateAmount" />

      <el-button type="primary" @click="swapCurrencies">Almashtirish</el-button>
    </div>

    <div class="result">
      <p>{{ amount }} {{ fromCurrency }} = {{ convertedAmount }} {{ toCurrency }}</p>
    </div>

    <el-table :data="currencies" style="width: 100%">
      <el-table-column prop="Ccy" label="Valyuta Kodi" />
      <el-table-column prop="CcyNm_UZ" label="Valyuta Nomi" />
      <el-table-column prop="Rate" label="Kurs" />
      <el-table-column prop="Date" label="Sana" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useFetch } from '#app';

const currencies = ref([]);
const fromCurrency = ref('USD');
const toCurrency = ref('UZS');
const amount = ref(1);
const convertedAmount = ref(null);

  const calculateAmount = () => {
    // if (amount.value <= 0) {
    //   convertedAmount.value = null;
    //   return;
    // }
    
  const fromRate = currencies.value.find(c => c.Ccy === fromCurrency.value)?.Rate;
  const toRate = currencies.value.find(c => c.Ccy === toCurrency.value)?.Rate ;



  if (fromRate && toRate) { 
    convertedAmount.value = ((amount.value * parseFloat(fromRate)) / parseFloat(toRate)).toFixed(2);
  } else {
    if(fromRate) convertedAmount.value =( amount.value * parseFloat(fromRate)).toFixed(2);
    else convertedAmount.value=(amount.value / parseFloat(toRate)).toFixed(2)
  }
  
    
  
};

const swapCurrencies = () => {
  [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
  // calculateAmount();
};

const fetchCurrencies = async () => {
  try {
    const { data, error } = await useFetch('https://cbu.uz/uz/arkhiv-kursov-valyut/json/');
    if (data.value) currencies.value = data.value;
    if (error.value) console.error('Xatolik:', error.value);
    calculateAmount();
  } catch (e) {
    console.error('Xatolik:', e);
  }
};

watch([amount, fromCurrency, toCurrency], calculateAmount);

onMounted(fetchCurrencies);
</script>

<style scoped>
.currency-container {
  padding: 20px;
}
.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.result {
  margin: 20px 0;
  font-size: 1.5em;
  font-weight: bold;
}
.el-table {
  margin-top: 20px;
}
</style>
