# 📊 How to Add Test Data Using MySQL Workbench

## Quick Steps

### 1. Open MySQL Workbench
- Launch MySQL Workbench from your Start Menu

### 2. Connect to Your Database
- Click on your local MySQL connection (usually "Local instance MySQL80")
- Enter password: `root`

### 3. Open the SQL Script
- Go to **File** → **Open SQL Script**
- Navigate to: `d:\fullstack\backendJAVA\01 app\database\init.sql`
- Click **Open**

### 4. Execute the Script
- Click the **⚡ Execute** button (lightning bolt icon) in the toolbar
- OR press **Ctrl + Shift + Enter**

### 5. Verify Data Loaded
Run this query to check:
```sql
USE employee_management_db;
SELECT COUNT(*) as 'Total Employees' FROM employees;
SELECT COUNT(*) as 'Total Departments' FROM departments;
```

You should see:
- **15 employees**
- **5 departments**

### 6. Refresh Your Application
- Go back to your browser at http://localhost:8080
- Press **F5** to refresh the page
- You should now see all the test data!

---

## 📋 What Test Data is Included?

### 5 Departments:
1. Engineering
2. Human Resources
3. Marketing
4. Sales
5. Finance

### 15 Employees:
- John Doe - Senior Software Engineer
- Jane Smith - Full Stack Developer
- Michael Johnson - DevOps Engineer
- Sarah Williams - HR Manager
- Robert Brown - Recruiter
- Emily Davis - Marketing Director
- David Martinez - Content Strategist
- Lisa Anderson - Sales Manager
- James Taylor - Account Executive
- Jennifer Wilson - Financial Analyst
- Christopher Moore - Accountant
- Amanda Thomas - Frontend Developer
- Daniel Jackson - Backend Developer
- Michelle White - Social Media Manager
- Kevin Harris - Business Development Rep

---

## 🔄 Alternative: Copy & Paste SQL

If you prefer, you can also:

1. Open MySQL Workbench
2. Connect to your database
3. Open a new SQL tab
4. Copy the SQL from `database\init.sql` file
5. Paste it into MySQL Workbench
6. Click Execute

---

## ✅ Success!

Once the script runs successfully, refresh your browser and you'll see:
- Dashboard statistics updated
- Recent employees displayed
- Department overview populated
- Full employee table with all 15 employees

**Enjoy your fully populated Employee Management System!** 🎉
