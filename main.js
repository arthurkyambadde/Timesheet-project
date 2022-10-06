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

function renderTable() {
  $("#tblData").DataTable().destroy();
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
}

$(document).ready(function () {
  $("#selectAll").click(function () {
    $("input[type=checkbox]").prop("checked", $("#selectAll").is(":checked"));
  });

  $("#submitButton").click(approveData);
  $("#rejectedButton").click(rejectData);
});

//approve data functions

function approveData() {
  const table = $("#tblData").DataTable();

  const approvedData = [];

  table.$("input:checked").each(function (nodeIndex, nodeItem) {
    const id = nodeItem.dataset.id;
    const detail = source_data.find((value) => value.id === id);

    source_data = source_data.filter((data) => data.id !== id);
    approvedData.push({ ...detail });
  });

  renderTable();

  console.log(approvedData); // This data can now be sent to your preffered storage for approved data
}

function rejectData() {
  const table = $("#tblData").DataTable();

  const rejectedData = [];

  table.$("input:checked").each(function (nodeIndex, nodeItem) {
    const id = nodeItem.dataset.id;
    const detail = source_data.find((value) => value.id === id);

    source_data = source_data.filter((data) => data.id !== id);
    rejectedData.push(detail);
  });

  console.log(rejectedData); // This data can now be sent to your preffered storage for rejected data
}

renderTable();
