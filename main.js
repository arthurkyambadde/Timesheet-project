let source_data = null;
let modal_data = null;

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
  fetch("./Data/modalData.json")
    .then((res) => res.json())
    .then((req) => {
      modal_data = req.data;
      $("#ModalTblData").DataTable({
        data: modal_data,
        columns: [
          { data: "CheckBoxIcon" },
          { data: "ProjectName" },
          { data: "Task" },
          { data: "Monday" },
          { data: "Tuesday" },
          { data: "Wednesday" },
          { data: "Thursday" },
          { data: "Friday" },
          { data: "Saturday" },
          { data: "Sunday" },
          { data: "Total" },
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

function renderModalTable() {
  $("#ModalTblData").DataTable().destroy();
  $("#ModalTblData").DataTable({
    data: modal_data,
    columns: [
      { data: "CheckBoxIcon" },
      { data: "ProjectName" },
      { data: "Task" },
      { data: "Monday" },
      { data: "Tuesday" },
      { data: "Wednesday" },
      { data: "Thursday" },
      { data: "Friday" },
      { data: "Saturday" },
      { data: "Sunday" },
      { data: "Total" },
    ],
  });
}

$(document).ready(function () {
  $("#selectAll").click(function () {
    $("table.table1 input[type=checkbox]").prop(
      "checked",
      $("#selectAll").is(":checked")
    );
  });

  $("#submitButton").click(approveData);
  $("#rejectedButton").click(rejectData);
});

$(document).ready(function () {
  $("#ModalSelectAll").click(function () {
    $("input[type=checkbox]").prop(
      "checked",
      $("#ModalSelectAll").is(":checked")
    );
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
    rejectedData.push({ ...detail });
  });

  renderTable();

  console.log(rejectedData); // This data can now be sent to your preffered storage for rejected data
}

renderTable();
