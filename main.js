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
});

function getCheckRecords() {
  $(".selectedDiv").html("");
  $(".tblChk:checked").each(function () {
    if ($(this).prop("checked")) {
      if ($(".selectedDiv").children().length == 0) {
        const record = "<strong>" + $(this).attr("data-id") + " </strong>";
        $(".selectedDiv").append(record);
      } else {
        const record = ", <strong>" + $(this).attr("data-id") + " </strong>";
        $(".selectedDiv").append(record);
      }
    }
    console.log(this.value);
  });
}

$(document).ready(function () {
  $("#tblData").on("change", ".tblChk", function () {
    if ($(".tblChk:checked").length == $(".tblChk").length) {
      $("#chkAll").prop("checked", true);
    } else {
      $("#chkAll").prop("checked", false);
    }
    getCheckRecords();
    console.log("done");
  });

  $("#chkAll").change(function () {
    if ($(this).prop("checked")) {
      $(".tblChk").not(this).prop("checked", true);
    } else {
      $(".tblChk").not(this).prop("checked", false);
    }
    getCheckRecords();
  });
});
