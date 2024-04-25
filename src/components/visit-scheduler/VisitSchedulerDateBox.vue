<template>
  <h2>
    Confirm you appointment with
    <b style="font-weight: 600">{{ schedulerConfig.doctorName }}</b>
  </h2>
  <div
    class="visit-window"
    :class="{ loading: isLoadingScheduleVisit }"
    ref="visitWindowRef"
  >
    <component
      :is="isLoadingScheduleVisit ? IconLoader : IconCalendar"
      class="visit-window__component"
    />
    On
    {{ scheduledDate }}
  </div>
</template>

<script setup lang="ts">
import schedulerConfig from "../../schedulerConfig.json";
import IconCalendar from "../icons/IconCalendar.vue";
import IconLoader from "../icons/IconLoader.vue";
import { formatScheduledDate } from "../../utils/dateFormatting";
import { useSchedulerStore } from "../../stores/scheduler";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";

const schedulerStore = useSchedulerStore();
const { pickedDateToShow, isLoadingScheduleVisit } =
  storeToRefs(schedulerStore);
const visitWindowRef = ref(null);

const scheduledDate = computed(() =>
  pickedDateToShow.value
    ? formatScheduledDate(pickedDateToShow.value.start)
    : formatScheduledDate(schedulerConfig.visitDate)
);

watch(pickedDateToShow, () => {
  if (visitWindowRef.value) {
    (visitWindowRef.value as HTMLElement).scrollIntoView({
      behavior: "smooth",
    });
  }
});
</script>

<style lang="scss" scoped>
.visit-window {
  display: flex;
  align-items: center;
  background-color: $white;
  margin: 24px 0 24px 0;
  padding: 16px 8px 16px 8px;
  font-weight: 600;
  border-radius: 3px;
  box-shadow: 8px 8px 24px -25px rgba(66, 68, 90, 1);
  &.loading {
    text-decoration: line-through;
  }

  &__component {
    margin-right: 32px;
  }
}
</style>
