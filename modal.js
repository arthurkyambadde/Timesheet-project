var table = $("#tblData").DataTable();

$("#tblData tbody").on("click", "tr", function () {
  console.log(table.row(this).data());
});
