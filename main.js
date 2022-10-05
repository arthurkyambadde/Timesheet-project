$(document).ready(function () {
  $("#example").DataTable({
    ajax: "./Data/data.json",
    columns: [
      { data: "Employee" },
      { data: "Type" },
      { data: "Submitted" },
      { data: "Submission_Date" },
      { data: "Approved/Rejected By" },
      { data: "Date Approved" },
      { data: "Processed" },
      { data: "Status" },
      { data: "viewIcon" },
      { data: "downloadIcon" },
    ],
  });
});
