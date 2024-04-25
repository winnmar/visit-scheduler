<template>
  <main>
    <VisitSchedulerDateBox />
    <VisitScheduler />
    <VisitSchedulerRescheduleButton v-if="!isDateScheduled && pickedDate" />
  </main>
  <footer>
    <p>Visit Scheduler</p>
  </footer>
</template>

<script setup lang="ts">
import VisitScheduler from "@/components/visit-scheduler/VisitScheduler.vue";
import VisitSchedulerDateBox from "@/components/visit-scheduler/VisitSchedulerDateBox.vue";
import VisitSchedulerRescheduleButton from "@/components/visit-scheduler/VisitSchedulerRescheduleButton.vue";
import { useSchedulerStore } from "./stores/scheduler";
import { storeToRefs } from "pinia";

const schedulerStore = useSchedulerStore();
const { isDateScheduled, pickedDate } = storeToRefs(schedulerStore);
</script>

<style lang="scss" scoped>
p {
  font-size: 1.5rem;
  font-weight: 600;
  color: $white;
  margin: 0;
}
</style>
