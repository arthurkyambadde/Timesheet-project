$(document).ready(function () {
  $("#tblData").DataTable({
    ajax: "./Data/data.json",
    columns: [
      { data: "CheckBoxIcon" },
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

$(document).ready(function () {
  $("#selectAll").click(function () {
    $("input[type=checkbox]").prop("checked", $("#selectAll").is(":checked"));
  });

  $("#submitButton").click(function () {
    const table = $("#tblData").DataTable();

    let checkedvalues = table
      .$("input:checked")
      .map(function () {
        return this.id;
      })
      .get()
      .join(",");

    console.log(table.$("input:checked"));
    console.log(checkedvalues);
  });
});
