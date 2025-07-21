function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(), diff = d.getDate() - day + (day == 0 ? -6:1);
  return new Date(d.setDate(diff));
}

function renderMonthCalendar() {
  const container = document.getElementById('monthCalendar');
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  let firstDay = new Date(year, month, 1);
  let lastDay = new Date(year, month+1, 0);
  let startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay()-1; // Monday start

  let html = `<table><tr>
    <th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th>
    </tr>`;

  let date = 1 - startDay;
  let todayStr = today.toISOString().slice(0,10);

  for(let week=0; date <= lastDay.getDate(); week++) {
    let row = '';
    let rowDates = [];
    for(let i=0; i<7; i++, date++) {
      let thisMonthDay = date >= 1 && date <= lastDay.getDate();
      let cellClass = '';
      const thisDate = new Date(year, month, date);
      if (thisDate.toISOString().slice(0,10) === todayStr)
        cellClass = 'current-day';

      if (thisMonthDay) {
        row += `<td class="${cellClass}">${date}</td>`;
        rowDates.push(thisDate.toISOString().slice(0,10));
      } else {
        row += `<td></td>`;
        rowDates.push("");
      }
    }
    let weekStart = getMonday(today).toISOString().slice(0,10);
    let weekDates = rowDates.filter(d=>d);
    let currWeekClass = (weekDates.includes(todayStr)) ? 'current-week' : '';
    html += `<tr class="${currWeekClass}">${row}</tr>`;
  }
  html += `</table>`;
  container.innerHTML = html;
}

const weekEvents = [
  { day: "Mon", text: "Shift 9AM-5PM" },
  { day: "Tue", text: "Remote Day" },
  { day: "Wed", text: "Team Mtg 2PM" },
  { day: "Fri", text: "Shift 9AM-3PM" }
];

function getEventColor(text) {
  if (/Shift/i.test(text)) return "#4caf50";
  if (/Remote/i.test(text)) return "#9c27b0";
  if (/Mtg|Meeting/i.test(text)) return "#2196f3";
  return "#607d8b";
}

function renderCurrentWeekSchedule() {
  const container = document.getElementById('weekSchedule');
  const weekdays = ["Mon","Tue","Wed","Thu","Fri"];
  let schedule = '<table style="width:100%;border-collapse:separate;border-spacing:6px 0;"><tr>';
  weekdays.forEach(day=>{
    let ev = weekEvents.find(e => e.day === day);
    schedule += `<td style="min-width:86px;">
      ${ev ? `<div style="
        padding:8px 0;
        border-radius:6px;
        color:#fff;
        font-weight:500;
        background:${getEventColor(ev.text)};
        text-align:center;">${ev.text}</div>` : ''}
    </td>`;
  });
  schedule += '</tr></table>';
  container.innerHTML = schedule;
}

// Render on page load
window.onload = function() {
  renderMonthCalendar();
  renderCurrentWeekSchedule();
};
