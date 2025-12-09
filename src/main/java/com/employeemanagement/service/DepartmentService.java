package com.employeemanagement.service;

import com.employeemanagement.exception.ResourceNotFoundException;
import com.employeemanagement.model.Department;
import com.employeemanagement.repository.DepartmentRepository;
import com.employeemanagement.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Department> getAllDepartments() {
        List<Department> departments = departmentRepository.findAll();
        // Update employee count for each department
        for (Department dept : departments) {
            int count = employeeRepository.findByDepartment(dept.getName()).size();
            dept.setEmployeeCount(count);
        }
        return departments;
    }

    public Department getDepartmentById(Long id) {
        Department dept = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));
        int count = employeeRepository.findByDepartment(dept.getName()).size();
        dept.setEmployeeCount(count);
        return dept;
    }

    public Department createDepartment(Department department) {
        if (departmentRepository.existsByName(department.getName())) {
            throw new IllegalArgumentException("Department with name " + department.getName() + " already exists");
        }
        return departmentRepository.save(department);
    }

    public Department updateDepartment(Long id, Department departmentDetails) {
        Department department = getDepartmentById(id);

        if (!department.getName().equals(departmentDetails.getName())) {
            if (departmentRepository.existsByName(departmentDetails.getName())) {
                throw new IllegalArgumentException("Department with name " + departmentDetails.getName() + " already exists");
            }
            department.setName(departmentDetails.getName());
        }

        department.setDescription(departmentDetails.getDescription());
        department.setManager(departmentDetails.getManager());

        return departmentRepository.save(department);
    }

    public void deleteDepartment(Long id) {
        Department department = getDepartmentById(id);
        departmentRepository.delete(department);
    }
}
