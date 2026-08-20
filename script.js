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
// AI Attendance
let presentCount = 0;
let absentCount = 524;
let scanning = false;

const mockStudents = [
    "Rahul Sharma", "Priya Singh", "Sneha Patel", 
    "Rohan Verma", "Amit Kumar"
];

function startScan() {
    if (scanning) return;
    scanning = true;
    
    let btn = document.getElementById('scan-btn');
    let cameraView = document.getElementById('camera-view');
    let result = document.getElementById('scan-result');
    
    btn.textContent = '⏳ Scanning...';
    btn.style.background = '#f72585';
    
    // Simulate camera active
    cameraView.innerHTML = `
        <div style="text-align:center">
            <div style="font-size:48px">🔴</div>
            <p style="color:#f72585;margin-top:8px">Scanning...</p>
            <p style="color:#555;font-size:12px">Detecting Face + Voice</p>
        </div>`;

    // Simulate scanning delay
    setTimeout(() => {
        let student = mockStudents[Math.floor(Math.random() * mockStudents.length)];
        let faceScore = (95 + Math.random() * 5).toFixed(1);
        let voiceScore = (92 + Math.random() * 8).toFixed(1);
        let time = new Date().toLocaleTimeString();
        
        // Update present count
        presentCount++;
        absentCount--;
        document.getElementById('ai-present').textContent = presentCount;
        document.getElementById('ai-absent').textContent = absentCount;

        // Show result
        result.innerHTML = `
            <h3 style="margin-bottom:8px;color:#1a1a2e">Last Scan Result</h3>
            <p style="color:#2d7a3a;font-weight:bold;font-size:16px">✅ ${student} — Present!</p>
            <p style="color:#888;font-size:13px;margin-top:4px">Face: ${faceScore}% | Voice: ${voiceScore}%</p>
            <p style="color:#888;font-size:13px">Fusion Score: ${((parseFloat(faceScore) + parseFloat(voiceScore))/2).toFixed(1)}%</p>`;

        // Add to log
        let log = document.getElementById('ai-log');
        if (log.innerHTML.includes('No scans yet')) log.innerHTML = '';
        log.innerHTML = `<tr>
            <td>${student}</td>
            <td><span class="badge green">${faceScore}%</span></td>
            <td><span class="badge green">${voiceScore}%</span></td>
            <td>${time}</td>
            <td><span class="badge green">Present</span></td>
        </tr>` + log.innerHTML;

        // Reset camera
        cameraView.innerHTML = `
            <div style="text-align:center">
                <div style="font-size:48px">✅</div>
                <p style="color:#2d7a3a;margin-top:8px">Scan Complete!</p>
                <p style="color:#555;font-size:12px">Click Start for next student</p>
            </div>`;

        btn.textContent = '▶ Start AI Scan';
        btn.style.background = '#7c73e6';
        scanning = false;
    }, 3000);
}