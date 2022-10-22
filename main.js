let source_data = null;
let modal_data = null;
let selected_data = null;
let name_modal__data = null;

$(document).ready(function () {
  $("#nameModal").DataTable();
});

$(document).ready(function () {
  fetch("./Data/data.json")
    .then((res) => res.json())
    .then((req) => {
      source_data = req.data;
      $("#tblData").DataTable({
        data: source_data,
        pageLength: 3,
        lengthMenu: [3, 5, 10, 20, 50, 100, 200, 500],
        columnDefs: [
          { orderable: false, targets: [0, 9, 10] },
          { orderable: true, targets: [1, 2, 3, 4, 5, 6, 7, 8] },
        ],
        columns: [
          { data: "CheckBoxIcon" },
          { data: "Employee" },
          { data: "Type" },
          { data: "Submitted" },
          { data: "Submission_Date" },
          { data: "Approved/Rejected By" },
          { data: "Date Approved" },
          { data: "Processed" },
          { data: "Totalhours" },
          { data: "viewIcon" },
          { data: "downloadIcon" },
        ],
        initComplete: function () {
          $("#tblData tbody ").on("click", ".view", function (e) {
            const selectedID = this.dataset.id;
            selected_data = source_data.find((item) => item.id === selectedID);
            setModalInfo(selected_data);
            openModal();
          });

          const closeModalBtn = document.querySelector(".btn-close");
          closeModalBtn.addEventListener("click", closeModal);

          const closeModalDiv = document.querySelector(".closeModal_div");
          closeModalDiv.addEventListener("click", closeModal);
        },
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
        pageLength: 3,
        lengthMenu: [3, 5, 10, 20, 50, 100, 200, 500],
        columnDefs: [
          { orderable: false, targets: [0] },
          { orderable: true, targets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
        ],
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
        initComplete: function () {
          $(".name").click(function (e) {
            const object = e.target;
            const selectedID = object.dataset.id;

            console.log(selectedID);
            name_modal__data = source_data.find(
              (item) => item.id === selectedID
            );
            console.log(name_modal__data);
            setNameModalInfomation(name_modal__data);
            closeModal();

            openNameModal();
          });
          // const nameModal = document.querySelector(".name_link");
          // nameModal.addEventListener("click", closeModal);
        },
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
      { data: "Totalhours" },
      { data: "viewIcon" },
      { data: "downloadIcon" },
    ],
    initComplete: function () {},
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

  $("#submitButtonselectAll").click(approveData);
  $("#rejectedButton").click(rejectData);
});

$(document).ready(function () {
  $("#ModalSelectAll").click(function () {
    $("table.table2 input[type=checkbox]").prop(
      "checked",
      $("#ModalSelectAll").is(":checked")
    );
  });
});

$(document).ready(function () {
  $("#submitButton").click(approveData);
  $("#rejectedButton").click(rejectData);
  $("#MsubmitButton").click(approveMData);
  $("#MrejectedButton").click(rejectMData);
  $(".closeNameModal").click(closeNameModal);
});

//approve data functions for table one

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

//reject data function for table one

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

//approve data function for table two

function approveMData() {
  const table = $("#ModalTblData").DataTable();

  const approvedData = [];

  table.$("input:checked").each(function (nodeIndex, nodeItem) {
    const id = nodeItem.dataset.id;
    const detail = source_data.find((value) => value.id === id);

    modal_data = modal_data.filter((data) => data.id !== id);
    approvedData.push({ ...detail });
  });

  renderModalTable();

  console.log(approvedData); // This data can now be sent to your preffered storage for approved data
}

//reject data function for table two

function rejectMData() {
  const table = $("#ModalTblData").DataTable();

  const rejectedData = [];

  table.$("input:checked").each(function (nodeIndex, nodeItem) {
    const id = nodeItem.dataset.id;
    const detail = source_data.find((value) => value.id === id);

    modal_data = modal_data.filter((data) => data.id !== id);
    rejectedData.push({ ...detail });
  });

  renderModalTable();

  console.log(rejectedData); // This data can now be sent to your preffered storage for rejected data
}

//row data modal functions

function openModal() {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  selected_data = null;
}

function setModalInfo(idInformation) {
  document.querySelector(".name").innerHTML = idInformation.Employee;
  document.querySelector(".timesheet_status").innerHTML = idInformation.Status;
  document.querySelector(
    ".processed_date"
  ).innerHTML = `Processed Date : ${idInformation.ProcessedDate}`;
  document.querySelector(
    ".Weekending_date"
  ).innerHTML = `Weekending Date ${idInformation.WeekendingDate}`;

  document.querySelector(
    ".ChargebilityRate"
  ).innerHTML = `Chargebility Rate : ${idInformation.ChargebilityRate}$ / hr`;

  document.querySelector(
    ".TotalBillablehours"
  ).innerHTML = `Total Billable hours : ${idInformation.TotalBillablehours} hrs`;
  document.querySelector(
    ".TotalTimeoffhours"
  ).innerHTML = `Total Timeoff hours : ${idInformation.TotalTimeoffhours} hrs`;
  document.querySelector(
    ".Totalhours"
  ).innerHTML = `Total hours : ${idInformation.Totalhours} hours`;

  // set status colors

  const timesheetStatus = document.querySelector(".timesheet_status").innerHTML;

  if (timesheetStatus === "Rejected") {
    document.querySelector(".timesheet_status").classList.add("red_color");
  } else if (timesheetStatus === "Approved") {
    document.querySelector(".timesheet_status").classList.add("green_color");
  } else if (timesheetStatus === "Pending") {
    document.querySelector(".timesheet_status").classList.add("purple_color");
  }

  //remove colors from modal
  function removeColor() {
    if (timesheetStatus === "Rejected") {
      document.querySelector(".timesheet_status").classList.remove("red_color");
    } else if (timesheetStatus === "Approved") {
      document
        .querySelector(".timesheet_status")
        .classList.remove("green_color");
    } else if (timesheetStatus === "Pending") {
      document
        .querySelector(".timesheet_status")
        .classList.remove("purple_color");
    }
  }

  document
    .querySelector(".closeModal_div")
    .addEventListener("click", removeColor);

  document
    .querySelector(".return_arrow--container")
    .addEventListener("click", removeColor);
}

//set name modal information function

function setNameModalInfomation(information) {
  console.log("information set #####################");
}

//open name modal functions

function openNameModal() {
  const modal = document.querySelector(".name_modal");
  const overlay = document.querySelector(".name_modal__overlay");
  modal.classList.remove("hidden_modal");
  overlay.classList.remove("hidden_modal");
}

function closeNameModal() {
  const modal = document.querySelector(".name_modal");
  const overlay = document.querySelector(".name_modal__overlay");
  modal.classList.add("hidden_modal");
  overlay.classList.add("hidden_modal");
}
