let source_data = null;

$(document).ready(function () {
  fetch("./Data/data.json")
    .then((res) => res.json())
    .then((req) => {
      source_data = req.data;
      $("#tblData").DataTable({
        data: source_data,
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
});

$(document).ready(function () {
  $("#selectAll").click(function () {
    $("input[type=checkbox]").prop("checked", $("#selectAll").is(":checked"));
  });

  $("#submitButton").click(function () {
    const table = $("#tblData").DataTable();

    // console.log(table.$("input:checked"));
    const checkedDetails = [];

    table.$("input:checked").each(function (nodeIndex, nodeItem) {
      const id = nodeItem.dataset.id;
      const detail = source_data.find((value) => value.id === id);

      checkedDetails.push(detail);
    });

    console.log(checkedDetails);
  });
});
