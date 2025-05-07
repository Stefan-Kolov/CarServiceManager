<template>
  <div>
    <form @submit.prevent="addEvent" class="event-form calendar-form">
      <input v-model="title" placeholder="Service Type (e.g. Oil Change)" required />

      <select v-model="selectedCarVin" required>
        <option disabled value="">Select a car</option>
        <option v-for="car in cars" :key="car.vin" :value="car.vin">
          {{ car.brand }} {{ car.model }} ({{ car.vin }})
        </option>
      </select>

      <flat-pickr
          v-model="start"
          :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
          placeholder="Select start date and time"
      />

      <flat-pickr
          v-model="end"
          :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
          placeholder="Select end date and time"
      />

      <button type="submit">Add Event</button>
    </form>

    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>
</template>

<script setup>
import { ref, shallowRef } from 'vue'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

import { ScheduleXCalendar } from '@schedule-x/vue'
import { createCalendar, createViewWeek, createViewMonthGrid, createViewDay } from '@schedule-x/calendar'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import '@schedule-x/theme-default/dist/calendar.css'

const props = defineProps({
  cars: {
    type: Array,
    required: true
  }
})

const title = ref('')
const start = ref(null)
const end = ref(null)
const selectedCarVin = ref('')

const calendarApp = shallowRef(createCalendar({
  views: [createViewWeek(), createViewMonthGrid(), createViewDay()],
  selectedDate: '2025-04-30',
  plugins: [createDragAndDropPlugin()],
  events: [
    {
      id: 1,
      title: 'Initial Event',
      start: '2025-04-30 01:00',
      end: '2025-04-30 05:00'
    }
  ]
}))

function addEvent() {
  if (!title.value || !start.value || !end.value || !selectedCarVin.value) return

  const car = props.cars.find(c => c.vin === selectedCarVin.value)
  const carInfo = car ? `${car.brand} ${car.model}` : 'Unknown Car'

  calendarApp.value.events.add({
    id: Date.now(),
    title: `${title.value} - ${carInfo}`,
    start: start.value,
    end: end.value
  })

  title.value = ''
  start.value = null
  end.value = null
  selectedCarVin.value = ''
}
</script>

<style>
.event-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.event-form input,
.event-form select,
.event-form button {
  padding: 6px;
  font-size: 14px;
}
</style>
