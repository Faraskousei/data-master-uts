const API_URL = 'http://localhost:3000/mahasiswa';

// Check authentication
if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'login.html';
}

// DOM Elements
const mahasiswaForm = document.getElementById('mahasiswaForm');
const mahasiswaTable = document.getElementById('mahasiswaTable').getElementsByTagName('tbody')[0];
const logoutBtn = document.getElementById('logoutBtn');
const cancelEditBtn = document.getElementById('cancelEdit');

// Event Listeners
mahasiswaForm.addEventListener('submit', handleSubmit);
logoutBtn.addEventListener('click', handleLogout);
cancelEditBtn.addEventListener('click', cancelEdit);

// Load data saat halaman dimuat
loadMahasiswa();

async function loadMahasiswa() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // Clear table
        mahasiswaTable.innerHTML = '';
        
        // Populate table
        for (const npm in data) {
            const mhs = data[npm];
            const row = mahasiswaTable.insertRow();
            
            row.innerHTML = `
                <td>${mhs.npm}</td>
                <td>${mhs.nama}</td>
                <td>${mhs.kelas}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editMahasiswa('${mhs.npm}', '${mhs.nama}', '${mhs.kelas}')">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteMahasiswa('${mhs.npm}')">Hapus</button>
                </td>
            `;
        }
    } catch (error) {
        alert('Error loading data: ' + error.message);
    }
}

async function handleSubmit(e) {
    e.preventDefault();
    
    const npm = document.getElementById('npm').value;
    const nama = document.getElementById('nama').value;
    const kelas = document.getElementById('kelas').value;
    const isEdit = document.getElementById('isEdit').value === 'true';

    try {
        const url = isEdit ? `${API_URL}/${npm}` : API_URL;
        const method = isEdit ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ npm, nama, kelas }),
        });

        if (!response.ok) throw new Error('Error saving data');

        mahasiswaForm.reset();
        document.getElementById('isEdit').value = 'false';
        cancelEditBtn.style.display = 'none';
        document.getElementById('npm').disabled = false;
        
        loadMahasiswa();
        alert(isEdit ? 'Data berhasil diupdate!' : 'Data berhasil ditambahkan!');
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function editMahasiswa(npm, nama, kelas) {
    document.getElementById('npm').value = npm;
    document.getElementById('nama').value = nama;
    document.getElementById('kelas').value = kelas;
    document.getElementById('isEdit').value = 'true';
    document.getElementById('npm').disabled = true;
    cancelEditBtn.style.display = 'inline-block';
}

function cancelEdit() {
    mahasiswaForm.reset();
    document.getElementById('isEdit').value = 'false';
    document.getElementById('npm').disabled = false;
    cancelEditBtn.style.display = 'none';
}

async function deleteMahasiswa(npm) {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;

    try {
        const response = await fetch(`${API_URL}/${npm}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Error deleting data');

        loadMahasiswa();
        alert('Data berhasil dihapus!');
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
} 