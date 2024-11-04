const API_URL = 'http://localhost:3000/api';

class ApiService {
    static async login(username, password) {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            return await response.json();
        } catch (error) {
            throw new Error('Login failed');
        }
    }

    static async getAllMahasiswa() {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/mahasiswa`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return await response.json();
        } catch (error) {
            throw new Error('Failed to fetch data');
        }
    }

    static async createMahasiswa(data) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/mahasiswa`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            throw new Error('Failed to create data');
        }
    }

    static async updateMahasiswa(npm, data) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/mahasiswa/${npm}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            throw new Error('Failed to update data');
        }
    }

    static async deleteMahasiswa(npm) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/mahasiswa/${npm}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return await response.json();
        } catch (error) {
            throw new Error('Failed to delete data');
        }
    }
}

export default ApiService; 