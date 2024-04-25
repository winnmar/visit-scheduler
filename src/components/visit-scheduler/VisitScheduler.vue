<template>
  <h2>Did you have an unexpected situation?</h2>
  <h3>You can change the appointment for when it suits you better</h3>
  <div class="visit-scheduler" :class="{ expanded: isExpanded }">
    <button
      class="visit-scheduler__button-left circle"
      :class="{ disabled: !canGoBack }"
      :disabled="!canGoBack"
      @click="getPreviousWeek"
    >
      {{ "<" }}
    </button>
    <div class="visit-scheduler__swiper" :class="{ expanded: isExpanded }">
      <div
        v-for="(day, index) in schedulerData"
        :key="index"
        class="visit-scheduler__swiper-element"
      >
        <div>
          <h3>
            {{ dateToShow(day.calendarDay) }}
          </h3>
        </div>
        <div class="visit-scheduler__date">
          {{ format(day.calendarDay, "d MMM") }}
        </div>
        <transition-group name="list" tag="div">
          <div
            v-for="(slot, index) in day.timeslots"
            :key="`${index}-${slot.start}`"
            class="visit-scheduler__timeslot"
            :class="{
              disabled: slot.taken,
              active: slot.start === pickedDate?.start && !slot.taken,
            }"
            @click="updatePickedDate(slot)"
          >
            {{ format(new Date(slot.start), "H:mm") }}
          </div>
        </transition-group>
      </div>
    </div>
    <button @click="getNextWeek" class="visit-scheduler__button-right circle">
      {{ ">" }}
    </button>
    <div @click="isExpanded = !isExpanded" class="visit-scheduler__expand-bar">
      {{ isExpanded ? "See less" : "See more hours" }}
      <IconChevron class="chevron-icon" :class="{ rotate: isExpanded }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { format } from "date-fns";
import { useSchedulerStore } from "@/stores/scheduler";
import { storeToRefs } from "pinia";
import IconChevron from "../icons/IconChevron.vue";

const schedulerStore = useSchedulerStore();
const { dateToShow, getWeek, updatePickedDate, getNextWeek, getPreviousWeek } =
  schedulerStore;
const { schedulerData, canGoBack, pickedDate } = storeToRefs(schedulerStore);

const isExpanded = ref<boolean>(false);

const today = new Date();

onMounted(() => {
  getWeek(today);
});
</script>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s linear;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

h2 {
  font-weight: 700;
}

h3 {
  font-weight: 500;
}

.visit-scheduler {
  display: flex;
  position: relative;
  background-color: $white;
  padding: 32px 16px 32px 16px;
  margin: 24px 0 24px 0;
  max-height: 400px;
  min-height: 400px;
  overflow: hidden;
  border-radius: 3px;
  box-shadow: 8px 8px 24px -25px rgba(66, 68, 90, 1);

  &.expanded {
    transition: max-height 0.3s ease-in-out;
    max-height: none;
  }

  &__swiper {
    display: flex;
    gap: 50px;
    justify-content: center;
    min-width: 800px;
    &.expanded {
      margin-bottom: 24px;
    }
  }

  &__timeslot {
    cursor: pointer;
    max-width: 65px;
    padding: 4px 12px;
    margin: 8px 0 8px 0;
    background-color: $off-white;
    color: $dark-blue;
    font-weight: 550;
    border-radius: 3px;

    &.disabled {
      cursor: not-allowed;
      pointer-events: none;
      text-decoration: line-through;
      background-color: transparent;
      color: $text-disabled;
    }
    &.active {
      background-color: $dark-blue;
      color: $white;
    }
    &:hover {
      outline: 1px solid $dark-blue;
    }
  }

  &__swiper-element {
    text-align: center;
    text-align: -webkit-center;
  }

  &__button-left {
    cursor: pointer;
    margin: 8px 24px 0 8px;
    color: $dark-blue;
    &.disabled {
      color: $light-grey;
      pointer-events: none;
    }
    &:hover {
      background-color: $light-blue;
      &.disabled {
        pointer-events: none;
      }
    }
  }

  &__button-right {
    cursor: pointer;
    color: $dark-blue;
    margin: 8px 8px 0 24px;
    &:hover {
      background-color: $light-blue;
    }
  }

  &__expand-bar {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    padding: 8px 0 16px 0;
    background-color: $white;
    color: $dark-blue;
    font-weight: 500;
    border-top: 1px $light-grey solid;
  }

  &__date {
    font-weight: 500;
    color: $dark-grey;
  }

  .circle {
    align-items: center;
    border: 0;
    border-radius: 50%;
    display: inline-flex;
    font-size: 1rem;
    height: 42px;
    justify-content: center;
    padding: 0;
    width: 42px;
    font-weight: bold;
  }

  .chevron-icon {
    margin-left: 16px;
  }

  .rotate {
    rotate: 180deg;
  }
}
</style>
