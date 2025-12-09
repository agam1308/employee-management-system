// API Base URL
const API_BASE_URL = 'http://localhost:8080/api';

// Global state
let employees = [];
let departments = [];
let currentEditingEmployee = null;
let currentEditingDepartment = null;

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    loadDepartments();
    loadEmployees();
    setupNavigation();
}

// ===== Navigation =====
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
            
            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const pageId = pageName + 'Page';
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
    }
    
    // Update header
    const pageTitle = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    document.getElementById('pageTitle').textContent = pageTitle;
    document.getElementById('breadcrumbCurrent').textContent = pageTitle;
    
    // Load data for specific pages
    if (pageName === 'employees') {
        loadEmployees();
    } else if (pageName === 'departments') {
        loadDepartments();
    } else if (pageName === 'dashboard') {
        loadDashboard();
    }
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Employee form submission
    document.getElementById('employeeForm').addEventListener('submit', handleEmployeeSubmit);
    
    // Department form submission
    document.getElementById('departmentForm').addEventListener('submit', handleDepartmentSubmit);
    
    // Global search
    document.getElementById('globalSearch').addEventListener('input', handleGlobalSearch);
    
    // Filters
    document.getElementById('departmentFilter').addEventListener('change', filterEmployees);
    document.getElementById('statusFilter').addEventListener('change', filterEmployees);
    
    // Sidebar toggle
    document.getElementById('toggleSidebar').addEventListener('click', toggleSidebar);
}

function toggleSidebar() {
    console.log('Toggle sidebar clicked!');
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('collapsed');
        console.log('Sidebar collapsed state:', sidebar.classList.contains('collapsed'));
    } else {
        console.error('Sidebar element not found!');
    }
}

// ===== Dashboard Functions =====
async function loadDashboard() {
    try {
        await Promise.all([loadEmployees(), loadDepartments()]);
        updateDashboardStats();
        displayRecentEmployees();
        displayDepartmentOverview();
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

function updateDashboardStats() {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(emp => emp.status === 'Active').length;
    const totalDepartments = departments.length;
    
    // Calculate new hires (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newHires = employees.filter(emp => {
        const hireDate = new Date(emp.hireDate);
        return hireDate >= thirtyDaysAgo;
    }).length;
    
    document.getElementById('totalEmployees').textContent = totalEmployees;
    document.getElementById('activeEmployees').textContent = activeEmployees;
    document.getElementById('totalDepartments').textContent = totalDepartments;
    document.getElementById('newHires').textContent = newHires;
}

function displayRecentEmployees() {
    const recentContainer = document.getElementById('recentEmployees');
    const recentEmployees = employees.slice(0, 5);
    
    if (recentEmployees.length === 0) {
        recentContainer.innerHTML = '<p class="info-text">No employees found</p>';
        return;
    }
    
    recentContainer.innerHTML = recentEmployees.map(emp => `
        <div class="employee-card">
            <img src="https://ui-avatars.com/api/?name=${emp.firstName}+${emp.lastName}&background=0ea5e9&color=fff" 
                 alt="${emp.firstName} ${emp.lastName}" 
                 class="employee-avatar">
            <div class="employee-info">
                <h4>${emp.firstName} ${emp.lastName}</h4>
                <p>${emp.position} - ${emp.department}</p>
            </div>
        </div>
    `).join('');
}

function displayDepartmentOverview() {
    const overviewContainer = document.getElementById('departmentOverview');
    
    if (departments.length === 0) {
        overviewContainer.innerHTML = '<p class="info-text">No departments found</p>';
        return;
    }
    
    overviewContainer.innerHTML = departments.slice(0, 5).map(dept => `
        <div class="department-item">
            <span class="department-name">${dept.name}</span>
            <span class="department-count">${dept.employeeCount || 0} employees</span>
        </div>
    `).join('');
}

// ===== Employee Functions =====
async function loadEmployees() {
    try {
        const response = await fetch(`${API_BASE_URL}/employees`);
        if (!response.ok) throw new Error('Failed to fetch employees');
        
        employees = await response.json();
        displayEmployees(employees);
        updateDashboardStats();
        displayRecentEmployees();
    } catch (error) {
        console.error('Error loading employees:', error);
        showNotification('Error loading employees', 'error');
    }
}

function displayEmployees(employeeList) {
    const tbody = document.getElementById('employeesTableBody');
    
    if (employeeList.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="loading">No employees found</td></tr>';
        return;
    }
    
    tbody.innerHTML = employeeList.map(emp => `
        <tr>
            <td>${emp.id}</td>
            <td>${emp.firstName} ${emp.lastName}</td>
            <td>${emp.email}</td>
            <td>${emp.phone}</td>
            <td>${emp.department}</td>
            <td>${emp.position}</td>
            <td>$${emp.salary.toLocaleString()}</td>
            <td><span class="status-badge status-${emp.status.toLowerCase()}">${emp.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editEmployee(${emp.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-delete" onclick="deleteEmployee(${emp.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function filterEmployees() {
    const departmentFilter = document.getElementById('departmentFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    let filtered = employees;
    
    if (departmentFilter) {
        filtered = filtered.filter(emp => emp.department === departmentFilter);
    }
    
    if (statusFilter) {
        filtered = filtered.filter(emp => emp.status === statusFilter);
    }
    
    displayEmployees(filtered);
}

function handleGlobalSearch(e) {
    const keyword = e.target.value.toLowerCase();
    
    if (!keyword) {
        displayEmployees(employees);
        return;
    }
    
    const filtered = employees.filter(emp => 
        emp.firstName.toLowerCase().includes(keyword) ||
        emp.lastName.toLowerCase().includes(keyword) ||
        emp.email.toLowerCase().includes(keyword) ||
        emp.department.toLowerCase().includes(keyword) ||
        emp.position.toLowerCase().includes(keyword)
    );
    
    displayEmployees(filtered);
}

// ===== Employee Modal Functions =====
function openEmployeeModal(employeeId = null) {
    const modal = document.getElementById('employeeModal');
    const form = document.getElementById('employeeForm');
    const title = document.getElementById('employeeModalTitle');
    
    form.reset();
    currentEditingEmployee = employeeId;
    
    if (employeeId) {
        title.textContent = 'Edit Employee';
        const employee = employees.find(emp => emp.id === employeeId);
        if (employee) {
            document.getElementById('employeeId').value = employee.id;
            document.getElementById('firstName').value = employee.firstName;
            document.getElementById('lastName').value = employee.lastName;
            document.getElementById('email').value = employee.email;
            document.getElementById('phone').value = employee.phone;
            document.getElementById('department').value = employee.department;
            document.getElementById('position').value = employee.position;
            document.getElementById('salary').value = employee.salary;
            document.getElementById('hireDate').value = employee.hireDate;
            document.getElementById('status').value = employee.status;
            document.getElementById('address').value = employee.address || '';
        }
    } else {
        title.textContent = 'Add Employee';
        document.getElementById('employeeId').value = '';
    }
    
    modal.classList.add('active');
}

function closeEmployeeModal() {
    document.getElementById('employeeModal').classList.remove('active');
    currentEditingEmployee = null;
}

async function handleEmployeeSubmit(e) {
    e.preventDefault();
    
    const employeeData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        department: document.getElementById('department').value,
        position: document.getElementById('position').value,
        salary: parseFloat(document.getElementById('salary').value),
        hireDate: document.getElementById('hireDate').value,
        status: document.getElementById('status').value,
        address: document.getElementById('address').value
    };
    
    try {
        let response;
        if (currentEditingEmployee) {
            response = await fetch(`${API_BASE_URL}/employees/${currentEditingEmployee}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employeeData)
            });
        } else {
            response = await fetch(`${API_BASE_URL}/employees`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employeeData)
            });
        }
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to save employee');
        }
        
        showNotification(currentEditingEmployee ? 'Employee updated successfully' : 'Employee added successfully', 'success');
        closeEmployeeModal();
        loadEmployees();
        loadDashboard();
    } catch (error) {
        console.error('Error saving employee:', error);
        showNotification(error.message, 'error');
    }
}

function editEmployee(id) {
    openEmployeeModal(id);
}

async function deleteEmployee(id) {
    if (!confirm('Are you sure you want to delete this employee?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to delete employee');
        
        showNotification('Employee deleted successfully', 'success');
        loadEmployees();
        loadDashboard();
    } catch (error) {
        console.error('Error deleting employee:', error);
        showNotification('Error deleting employee', 'error');
    }
}

// ===== Department Functions =====
async function loadDepartments() {
    try {
        const response = await fetch(`${API_BASE_URL}/departments`);
        if (!response.ok) throw new Error('Failed to fetch departments');
        
        departments = await response.json();
        displayDepartments();
        populateDepartmentFilters();
        updateDashboardStats();
        displayDepartmentOverview();
    } catch (error) {
        console.error('Error loading departments:', error);
        showNotification('Error loading departments', 'error');
    }
}

function displayDepartments() {
    const grid = document.getElementById('departmentsGrid');
    
    if (departments.length === 0) {
        grid.innerHTML = '<p class="info-text">No departments found</p>';
        return;
    }
    
    grid.innerHTML = departments.map(dept => `
        <div class="department-card">
            <div class="department-card-header">
                <div>
                    <h3>${dept.name}</h3>
                    <p>${dept.description || 'No description'}</p>
                    ${dept.manager ? `<p><strong>Manager:</strong> ${dept.manager}</p>` : ''}
                </div>
            </div>
            <div class="department-stats">
                <div class="department-stat">
                    <strong>${dept.employeeCount || 0}</strong>
                    <span>Employees</span>
                </div>
            </div>
            <div class="action-buttons" style="margin-top: 1rem;">
                <button class="btn-edit" onclick="editDepartment(${dept.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-delete" onclick="deleteDepartment(${dept.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function populateDepartmentFilters() {
    const departmentFilter = document.getElementById('departmentFilter');
    const departmentSelect = document.getElementById('department');
    
    const options = departments.map(dept => 
        `<option value="${dept.name}">${dept.name}</option>`
    ).join('');
    
    departmentFilter.innerHTML = '<option value="">All Departments</option>' + options;
    departmentSelect.innerHTML = '<option value="">Select Department</option>' + options;
}

// ===== Department Modal Functions =====
function openDepartmentModal(departmentId = null) {
    const modal = document.getElementById('departmentModal');
    const form = document.getElementById('departmentForm');
    const title = document.getElementById('departmentModalTitle');
    
    form.reset();
    currentEditingDepartment = departmentId;
    
    if (departmentId) {
        title.textContent = 'Edit Department';
        const department = departments.find(dept => dept.id === departmentId);
        if (department) {
            document.getElementById('departmentId').value = department.id;
            document.getElementById('departmentName').value = department.name;
            document.getElementById('departmentManager').value = department.manager || '';
            document.getElementById('departmentDescription').value = department.description || '';
        }
    } else {
        title.textContent = 'Add Department';
        document.getElementById('departmentId').value = '';
    }
    
    modal.classList.add('active');
}

function closeDepartmentModal() {
    document.getElementById('departmentModal').classList.remove('active');
    currentEditingDepartment = null;
}

async function handleDepartmentSubmit(e) {
    e.preventDefault();
    
    const departmentData = {
        name: document.getElementById('departmentName').value,
        manager: document.getElementById('departmentManager').value,
        description: document.getElementById('departmentDescription').value
    };
    
    try {
        let response;
        if (currentEditingDepartment) {
            response = await fetch(`${API_BASE_URL}/departments/${currentEditingDepartment}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(departmentData)
            });
        } else {
            response = await fetch(`${API_BASE_URL}/departments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(departmentData)
            });
        }
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to save department');
        }
        
        showNotification(currentEditingDepartment ? 'Department updated successfully' : 'Department added successfully', 'success');
        closeDepartmentModal();
        loadDepartments();
        loadDashboard();
    } catch (error) {
        console.error('Error saving department:', error);
        showNotification(error.message, 'error');
    }
}

function editDepartment(id) {
    openDepartmentModal(id);
}

async function deleteDepartment(id) {
    if (!confirm('Are you sure you want to delete this department?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/departments/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to delete department');
        
        showNotification('Department deleted successfully', 'success');
        loadDepartments();
        loadDashboard();
    } catch (error) {
        console.error('Error deleting department:', error);
        showNotification('Error deleting department', 'error');
    }
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#0ea5e9'};
        color: white;
        border-radius: 0.75rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        animation: slideIn 0.3s ease-in-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
