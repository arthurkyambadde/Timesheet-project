mobiscroll.setOptions({
  // theme: "ios",
  themeVariant: "light",
});

mobiscroll.datepicker("#demo-week-select", {
  controls: ["calendar"],
  select: "preset-range",
  display: "inline",
  firstSelectDay: 0,
  selectSize: 7,
});
