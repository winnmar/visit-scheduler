<template>
  <h2>Reschedule</h2>
  <h3>Click the button to confirm</h3>
  <button
    v-if="pickedDate"
    class="confirm-button"
    :class="{ disabled: isLoadingScheduleVisit }"
    :disabled="isLoadingScheduleVisit"
    @click="scheduleDate(pickedDate)"
  >
    {{ formatScheduledDate(pickedDate.start) }}
  </button>
</template>

<script setup lang="ts">
import { useSchedulerStore } from "../../stores/scheduler";
import { storeToRefs } from "pinia";
import { formatScheduledDate } from "../../utils/dateFormatting";

const schedulerStore = useSchedulerStore();
const { scheduleDate } = schedulerStore;
const { pickedDate, isLoadingScheduleVisit } = storeToRefs(schedulerStore);
</script>

<style lang="scss" scoped>
h2 {
  font-weight: 600;
}

.confirm-button {
  cursor: pointer;
  width: 100%;
  background-color: $light-blue;
  border: $light-blue;
  color: $white;
  height: 50px;
  border-radius: 3px;
  font-size: 18px;
  margin-top: 24px;
  box-shadow: 8px 8px 24px -25px rgba(66, 68, 90, 1);
  &:hover {
    background-color: $dark-blue;
  }
  &.disabled {
    background-color: $light-grey;
    cursor: not-allowed;
    &:hover {
      background-color: $light-grey;
    }
  }
}
</style>
