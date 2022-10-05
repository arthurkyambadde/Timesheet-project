window.loadData();

let statisticsData;
const pending = [];
const approved = [];
const rejected = [];

async function loadData() {
  fetch("./Data/data.json")
    .then((res) => res.json())
    .then((dataObject) => {
      statisticsData = dataObject.data;
      const quantityOfTimesheets = statisticsData.length;

      document.getElementById("submitted").innerHTML = statisticsData.length;

      statisticsData.forEach((item) => {
        if (item.Status === "Approved") {
          approved.push(item);

          percentage = Math.floor(
            (approved.length / quantityOfTimesheets) * 100
          );

          document.getElementById("approved").innerHTML = approved.length;

          document.getElementById("approvedperc").innerHTML = `${percentage}%`;
        } else if (item.Status === "Rejected") {
          rejected.push(item);

          percentage = Math.floor(
            (rejected.length / quantityOfTimesheets) * 100
          );

          document.getElementById("rejected").innerHTML = rejected.length;

          document.getElementById("rejectedperc").innerHTML = `${percentage}%`;
        } else if (item.Status === "Pending") {
          pending.push(item);

          percentage = Math.floor(
            (pending.length / quantityOfTimesheets) * 100
          );

          document.getElementById("pending").innerHTML = pending.length;

          document.getElementById("pendingperc").innerHTML = `${percentage}%`;
        }
      });
    });
}
