// Data storage variables
let source_data = null;
let modal_data = null;
let selected_data = null;

// On click callbacks
$(document).ready(function () {
  // Name modal DataTabble
  $("#nameModal").DataTable();

  // Approve buton function for approving data for main page
  $("#submitButtonselectAll").click(approveData);

  // Reject button function for rejecting data for main page
  $("#rejectedButton").click(rejectData);

  // Reject buton function for approving data for main modal
  $("#rejectedButton").click(rejectData);

  // Approve buton function for approving data for main modal
  $("#MsubmitButton").click(approveMData);

  // Close modal functionality icon
  $(".closeNameModal").click(closeNameModal);

  // Close modal functionality ovalay when clicked
  $(".name_modal__overlay").click(closeNameModal);

  // Checkbox checkall function for main page
  $("#selectAll").click(function () {
    $("table.table1 input[type=checkbox]").prop(
      "checked",
      $("#selectAll").is(":checked")
    );
  });

  // Checkbox checkall function for main modal
  $("#ModalSelectAll").click(function () {
    $("table.table2 input[type=checkbox]").prop(
      "checked",
      $("#ModalSelectAll").is(":checked")
    );
  });
});

// Main page datatable
$(document).ready(function () {
  fetch("./Data/data.json")
    .then((res) => res.json())
    .then((req) => {
      source_data = req.data;
      $("#tblData").DataTable({
        data: source_data,
        pageLength: 3,
        lengthMenu: [5, 10, 20, 50, 100, 200, 500],
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
          { data: "Select" },
          { data: "downloadIcon" },
        ],
        initComplete: function () {
          $("#tblData tbody ").on("click", ".view", function (e) {
            const selectedID = this.dataset.id;
            selected_data = source_data.find((item) => item.id === selectedID);
            setModalInfo(selected_data);
            openModal();
          });

          $("#tblData tbody ").on("click", ".viewSelect", function (e) {
            openSelectPage();
          });

          const closeModalBtn = document.querySelector(".btn-close");
          closeModalBtn.addEventListener("click", closeModal);

          const closeModalDiv = document.querySelector(".closeModal_div");
          closeModalDiv.addEventListener("click", closeModal);
        },
      });
    });
});

// Main modal datatable
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

            name_modal__data = source_data.find(
              (item) => item.id === selectedID
            );
            closeModal();

            openNameModal();
          });
        },
      });
    });
});

//selcet container datatable

$(document).ready(function () {
  fetch("./Data/data.json")
    .then((res) => res.json())
    .then((req) => {
      source_data = req.data;
      let option = req.data;

      $("#selecttblData").DataTable({
        data: source_data[1].children,
        pageLength: 5,
        lengthMenu: [5, 10, 20, 50, 100, 200, 500],
        lengthMenu: [3, 5, 10, 20, 50, 100, 200, 500],
        columnDefs: [
          { orderable: false, targets: [0] },
          { orderable: true, targets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
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
          $("#workers").change(function () {
            dropdown = $("#workers").val();
            for (let i = 0; i < option.length; i++) {
              if (dropdown === option[i].name) {
                $("#selecttblData").DataTable({
                  data: source_data[i].children,
                  pageLength: 5,

                  destroy: true,
                  searching: false,

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
                });
              } else if (dropdown === "root") {
                const selectPage = document.querySelector(
                  ".selectChildren_container"
                );
                selectPage.classList.add("hidden_page");
              }
            }
          });
        },
      });
    });
});

// MAin page datatable reloading
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

// Main modal datatable reload
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

//approve data functions for main page Datatable

function approveData() {
  const table = $("#tblData").DataTable();

  const approvedData = [];

  table.$("input:checked").each(function (nodeIndex, nodeItem) {
    const id = nodeItem.dataset.id;
    const detail = source_data.find((value) => value.id === id);

    source_data = source_data.filter((data) => data.id !== id);
    approvedData.push({ ...detail });
  });

  // rerender and reload after approval
  renderTable();

  console.log(approvedData); // This data can now be sent to your preffered storage for approved data
}

//reject data function for main page  Datatable

function rejectData() {
  const table = $("#tblData").DataTable();

  const rejectedData = [];

  table.$("input:checked").each(function (nodeIndex, nodeItem) {
    const id = nodeItem.dataset.id;
    const detail = source_data.find((value) => value.id === id);

    source_data = source_data.filter((data) => data.id !== id);
    rejectedData.push({ ...detail });
  });

  // rerender and reload after rejection
  renderTable();

  console.log(rejectedData); // This data can now be sent to your preffered storage for rejected data
}

//approve data function for main modal Datatable
function approveMData() {
  const table = $("#ModalTblData").DataTable();

  const approvedData = [];

  table.$("input:checked").each(function (nodeIndex, nodeItem) {
    const id = nodeItem.dataset.id;
    const detail = source_data.find((value) => value.id === id);

    modal_data = modal_data.filter((data) => data.id !== id);
    approvedData.push({ ...detail });
  });

  // rerender and reload after approval
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

  // rerender and reload after rejection
  renderModalTable();

  console.log(rejectedData); // This data can now be sent to your preffered storage for rejected data
}

// Function for opening main modal
function openModal() {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

// Function for closing main modal
function closeModal() {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  selected_data = null;
}

// Function for setting main modal header information
function setModalInfo(idInformation) {
  document.querySelector(".name").innerHTML = idInformation.Employee;
  document.querySelector(".timesheet_status").textContent =
    idInformation.Status;
  document.querySelector(
    ".processed_date"
  ).textContent = `Processed Date : ${idInformation.ProcessedDate}`;
  document.querySelector(
    ".Weekending_date"
  ).textContent = `Weekending Date ${idInformation.WeekendingDate}`;

  document.querySelector(
    ".ChargebilityRate"
  ).textContent = `Chargebility Rate : ${idInformation.ChargebilityRate}$ / hr`;

  document.querySelector(
    ".TotalBillablehours"
  ).textContent = `Total Billable hours : ${idInformation.TotalBillablehours} hrs`;
  document.querySelector(
    ".TotalTimeoffhours"
  ).textContent = `Total Timeoff hours : ${idInformation.TotalTimeoffhours} hrs`;
  document.querySelector(
    ".Totalhours"
  ).textContent = `Total hours : ${idInformation.Totalhours} hours`;

  // Setting colors for timesheet status
  const timesheetStatus = document.querySelector(".timesheet_status").innerHTML;

  if (timesheetStatus === "Rejected") {
    document.querySelector(".timesheet_status").classList.add("red_color");
  } else if (timesheetStatus === "Approved") {
    document.querySelector(".timesheet_status").classList.add("green_color");
  } else if (timesheetStatus === "Pending") {
    document.querySelector(".timesheet_status").classList.add("purple_color");
  }

  //remove colors from modal when closed to reload color
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

  // Closing main modal using overlay
  document
    .querySelector(".closeModal_div")
    .addEventListener("click", removeColor);

  // Closing main modal using return arrow
  document
    .querySelector(".return_arrow--container")
    .addEventListener("click", removeColor);
}

//set name modal information function

//open name modal functions
function openNameModal() {
  const modal = document.querySelector(".name_modal");
  const overlay = document.querySelector(".name_modal__overlay");
  modal.classList.remove("hidden_modal");
  overlay.classList.remove("hidden_modal");
}

//close name modal functions
function closeNameModal() {
  const modal = document.querySelector(".name_modal");
  const overlay = document.querySelector(".name_modal__overlay");
  modal.classList.add("hidden_modal");
  overlay.classList.add("hidden_modal");
  openModal();
}

// ######################################################
// ######################################################
// Imediately call function on window object
window.loadCardData();

// Data storage variables
let statisticsData;
const pending = [];
const approved = [];
const rejected = [];

// Function for setting statistics card data
async function loadCardData() {
  // Fetch data from json object
  fetch("./Data/data.json")
    .then((res) => res.json())
    .then((dataObject) => {
      // Set statistics data
      statisticsData = dataObject.data;
      const quantityOfTimesheets = statisticsData.length;

      document.getElementById("submitted").textContent = statisticsData.length;

      statisticsData.forEach((item) => {
        if (item.Status === "Approved") {
          approved.push(item);

          percentage = Math.floor(
            (approved.length / quantityOfTimesheets) * 100
          );

          document.getElementById("approved").textContent = approved.length;

          document.getElementById(
            "approvedperc"
          ).textContent = `${percentage}%`;
        } else if (item.Status === "Rejected") {
          rejected.push(item);

          percentage = Math.floor(
            (rejected.length / quantityOfTimesheets) * 100
          );

          document.getElementById("rejected").textContent = rejected.length;

          document.getElementById(
            "rejectedperc"
          ).textContent = `${percentage}%`;
        } else if (item.Status === "Pending") {
          pending.push(item);

          percentage = Math.floor(
            (pending.length / quantityOfTimesheets) * 100
          );

          document.getElementById("pending").textContent = pending.length;

          document.getElementById("pendingperc").textContent = `${percentage}%`;
        }
      });
    });
}

//select page

function openSelectPage() {
  const selectPage = document.querySelector(".selectChildren_container");
  selectPage.classList.remove("hidden_page");
}
