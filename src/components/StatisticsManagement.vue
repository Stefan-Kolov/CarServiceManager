<template>
  <div class="statistics-management">
    <h2>Service Statistics</h2>

    <div class="statistics">
      <h3>Statistics Overview</h3>
      <p><strong>Total Services: </strong>{{ totalServices }}</p>
      <p><strong>Total Revenue: </strong>${{ totalRevenue.toFixed(2) }}</p>
    </div>

    <div class="chart">
      <h3>Service Type Breakdown</h3>
      <PieChart :data="serviceTypeData" />
    </div>

    <div class="chart">
      <h3>Revenue Breakdown</h3>
      <BarChart :data="revenueData" />
    </div>
  </div>
</template>

<script>
import { Pie, Bar } from 'vue-chartjs';
import { reactive, computed } from 'vue';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

export default {
  props: {
    services: Array,
  },
  components: {
    PieChart: Pie,
    BarChart: Bar,
  },
  computed: {
    totalServices() {
      return this.services.length;
    },

    totalRevenue() {
      return this.services.reduce((sum, service) => sum + service.price, 0);
    },

    serviceTypeBreakdown() {
      const breakdown = {};
      this.services.forEach(service => {
        breakdown[service.description] = (breakdown[service.description] || 0) + 1;
      });
      return breakdown;
    },

    serviceTypeData() {
      const labels = Object.keys(this.serviceTypeBreakdown);
      const data = Object.values(this.serviceTypeBreakdown);
      return {
        labels,
        datasets: [
          {
            data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          },
        ],
      };
    },

    revenueData() {
      const labels = this.services.map(service => service.description);
      const data = this.services.map(service => service.price);
      return {
        labels,
        datasets: [
          {
            label: 'Revenue per Service',
            data,
            backgroundColor: '#4BC0C0',
            borderColor: '#36A2EB',
            borderWidth: 1,
          },
        ],
      };
    },
  },
};
</script>
