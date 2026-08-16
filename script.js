// Set today's date
document.getElementById('pageDate').textContent = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

// Show section
function showSection(sectionId, clickedLi) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    // Show selected
    document.getElementById(sectionId).style.display = 'block';
    // Update active sidebar
    document.querySelectorAll('.sidebar ul li').forEach(li => li.classList.remove('active'));
    clickedLi.classList.add('active');
    // Update title
    const titles = {
        dashboard: 'Welcome, Admin 👋',
        students: 'Students 👨‍🎓',
        attendance: 'Attendance 📋',
        results: 'Results 📝'
    };
    document.getElementById('pageTitle').textContent = titles[sectionId];
}

// Search
document.getElementById('searchInput').addEventListener('input', function() {
    let searchValue = this.value.toLowerCase();
    let rows = document.querySelectorAll('#studentTable tr');
    rows.forEach(function(row) {
        let name = row.cells[1].textContent.toLowerCase();
        row.style.display = name.includes(searchValue) ? '' : 'none';
    });
});

// Toggle add form
function toggleForm() {
    let form = document.getElementById('addForm');
    form.style.display = form.style.display === 'none' ? 'flex' : 'none';
}

// Add student
function addStudent() {
    let name = document.getElementById('newName').value;
    let cls = document.getElementById('newClass').value;
    let attendance = document.getElementById('newAttendance').value;
    if (!name || !cls || !attendance) { alert('Please fill all fields!'); return; }
    let status = attendance >= 75 ? '<span class="badge green">Active</span>' : '<span class="badge red">At Risk</span>';
    let table = document.getElementById('studentTable');
    let rowCount = table.rows.length + 1;
    table.innerHTML += `<tr>
        <td>00${rowCount}</td>
        <td>${name}</td>
        <td>${cls}</td>
        <td>${attendance}%</td>
        <td>${status}</td>
    </tr>`;
    document.getElementById('newName').value = '';
    document.getElementById('newClass').value = '';
    document.getElementById('newAttendance').value = '';
    toggleForm();
}

// Toggle attendance
function toggleAttendance(id) {
    let badge = document.getElementById(id);
    if (badge.textContent === 'Present') {
        badge.textContent = 'Absent';
        badge.className = 'badge red';
    } else {
        badge.textContent = 'Present';
        badge.className = 'badge green';
    }
}