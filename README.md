# Visit scheduler

This is a mockup of a component that is responsible for picking the date and time to schedule a visit.
It is using an endpoint that always returns timeslots for the whole week starting on Monday. Due to that there is a need to perform some data transformations.
Cache was implemented in the simplest way possible, not necessarily best. Using some dependancy like an axios interceptor would be more desirable solution.
This project is mostly done to showcase my ability in using Vue 3, SCSS and general knowledge as a Frontend Developer. Please treat it as such instead of it being an out of the box solution ready to be implemented.

## Notes

Due to the time constraints tests were not implemented. I do have a plan to implement them in the near future.

#### To start execute:

```
yarn install && yarn serve
```
