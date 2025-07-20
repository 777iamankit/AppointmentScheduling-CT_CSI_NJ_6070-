function addEvent() {
  // Collect values from the modal inputs
  const inputs = document.querySelectorAll('.modal input');
  const title = inputs[0].value.trim();
  const day = inputs[1].value.trim();
  const time = inputs[2].value.trim();

  // Basic validation
  if (!title || !day || !time) {
    alert("Please fill out all fields.");
    return;
  }

  // POST data to the backend
  fetch('/event/add-event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, day, time })
  })
    .then(res => res.json())
    .then(result => {
      alert(result.message || "Event saved.");
      closeModal();     // Hide the modal (your UI function)
      loadEvents();     // Optional: Refresh event display
    })
    .catch(err => {
      console.error("Failed to save event:", err);
      
    });
}
