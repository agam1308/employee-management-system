-- Employee Management System Database Schema

-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS employee_management_db;
USE employee_management_db;

-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    manager VARCHAR(100),
    employee_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    department VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    hire_date DATE NOT NULL,
    address TEXT,
    status VARCHAR(20) DEFAULT 'Active',
    created_at DATE,
    updated_at DATE,
    INDEX idx_department (department),
    INDEX idx_status (status),
    INDEX idx_email (email)
);

-- Insert sample departments
INSERT INTO departments (name, description, manager) VALUES
('Engineering', 'Software development and technical operations', 'John Smith'),
('Human Resources', 'Employee relations and recruitment', 'Sarah Johnson'),
('Marketing', 'Brand management and digital marketing', 'Michael Brown'),
('Sales', 'Business development and customer relations', 'Emily Davis'),
('Finance', 'Financial planning and accounting', 'David Wilson');

-- Insert sample employees
INSERT INTO employees (first_name, last_name, email, phone, department, position, salary, hire_date, address, status, created_at, updated_at) VALUES
('John', 'Doe', 'john.doe@company.com', '+1-555-0101', 'Engineering', 'Senior Software Engineer', 95000.00, '2022-01-15', '123 Tech Street, San Francisco, CA', 'Active', CURDATE(), CURDATE()),
('Jane', 'Smith', 'jane.smith@company.com', '+1-555-0102', 'Engineering', 'Full Stack Developer', 85000.00, '2022-03-20', '456 Code Avenue, San Francisco, CA', 'Active', CURDATE(), CURDATE()),
('Michael', 'Johnson', 'michael.j@company.com', '+1-555-0103', 'Engineering', 'DevOps Engineer', 90000.00, '2021-11-10', '789 Cloud Lane, San Francisco, CA', 'Active', CURDATE(), CURDATE()),
('Sarah', 'Williams', 'sarah.w@company.com', '+1-555-0104', 'Human Resources', 'HR Manager', 75000.00, '2021-06-01', '321 People Blvd, San Francisco, CA', 'Active', CURDATE(), CURDATE()),
('Robert', 'Brown', 'robert.b@company.com', '+1-555-0105', 'Human Resources', 'Recruiter', 60000.00, '2022-08-15', '654 Talent Road, San Francisco, CA', 'Active', CURDATE(), CURDATE()),
('Emily', 'Davis', 'emily.d@company.com', '+1-555-0106', 'Marketing', 'Marketing Director', 88000.00, '2020-09-01', '987 Brand Street, San Francisco, CA', 'Active', CURDATE(), CURDATE()),
('David', 'Martinez', 'david.m@company.com', '+1-555-0107', 'Marketing', 'Content Strategist', 65000.00, '2022-04-10', '147 Creative Ave, San Francisco, CA', 'Active', CURDATE(), CURDATE()),
('Lisa', 'Anderson', 'lisa.a@company.com', '+1-555-0108', 'Sales', 'Sales Manager', 82000.00, '2021-02-20', '258 Revenue Road, San Francisco, CA', 'Active', CURDATE(), CURDATE()),
('James', 'Taylor', 'james.t@company.com', '+1-555-0109', 'Sales', 'Account Executive', 70000.00, '2022-07-05', '369 Deal Drive, San Francisco, CA', 'Active', CURDATE(), CURDATE()),
('Jennifer', 'Wilson', 'jennifer.w@company.com', '+1-555-0110', 'Finance', 'Financial Analyst', 72000.00, '2021-12-01', '741 Money Lane, San Francisco, CA', 'Active', CURDATE(), CURDATE()),
('Christopher', 'Moore', 'chris.m@company.com', '+1-555-0111', 'Finance', 'Accountant', 68000.00, '2022-05-15', '852 Numbers St, San Francisco, CA', 'Active', CURDATE(), CURDATE()),
('Amanda', 'Thomas', 'amanda.t@company.com', '+1-555-0112', 'Engineering', 'Frontend Developer', 78000.00, '2023-01-10', '963 UI Boulevard, San Francisco, CA', 'Active', CURDATE(), CURDATE()),
('Daniel', 'Jackson', 'daniel.j@company.com', '+1-555-0113', 'Engineering', 'Backend Developer', 82000.00, '2023-02-01', '159 API Avenue, San Francisco, CA', 'Active', CURDATE(), CURDATE()),
('Michelle', 'White', 'michelle.w@company.com', '+1-555-0114', 'Marketing', 'Social Media Manager', 62000.00, '2023-03-15', '357 Social Street, San Francisco, CA', 'Active', CURDATE(), CURDATE()),
('Kevin', 'Harris', 'kevin.h@company.com', '+1-555-0115', 'Sales', 'Business Development Rep', 65000.00, '2023-04-20', '486 Growth Road, San Francisco, CA', 'Active', CURDATE(), CURDATE());

-- Update department employee counts
UPDATE departments d
SET employee_count = (
    SELECT COUNT(*) 
    FROM employees e 
    WHERE e.department = d.name AND e.status = 'Active'
);

-- Display summary
SELECT 'Database initialized successfully!' as Message;
SELECT COUNT(*) as 'Total Employees' FROM employees;
SELECT COUNT(*) as 'Total Departments' FROM departments;
