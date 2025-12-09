# 🚀 Quick Start Guide - Employee Management System

## ✅ What You Need

1. **Java 8 or higher** - [Download here](https://www.oracle.com/java/technologies/javase-downloads.html)
2. **MySQL 5.7+ or 8.0+** - [Download here](https://dev.mysql.com/downloads/mysql/)
3. A web browser (Chrome, Firefox, Edge, etc.)

**Note:** You DON'T need Maven installed! This project includes Maven Wrapper.

---

## 📦 Step-by-Step Setup

### Step 1: Verify Java Installation

Open PowerShell or Command Prompt and run:

```powershell
java -version
```

You should see something like:
```
java version "1.8.0_xxx" or higher
```

If not installed, download and install Java 8 or higher.

---

### Step 2: Setup MySQL Database

#### 2.1 Start MySQL Service

```powershell
# Start MySQL service
net start MySQL80
```

#### 2.2 Create Database and User

Open MySQL Command Line Client or MySQL Workbench and run:

```sql
-- Login to MySQL (default password is usually 'root' or empty)
mysql -u root -p

-- Create the database
CREATE DATABASE employee_management_db;

-- Verify database creation
SHOW DATABASES;

-- Exit MySQL
EXIT;
```

#### 2.3 Load Sample Data (Optional but Recommended)

```powershell
# Navigate to project directory
cd "d:\fullstack\backendJAVA\01 app"

# Load sample data
mysql -u root -p employee_management_db < database\init.sql
```

Enter your MySQL password when prompted.

---

### Step 3: Configure Database Connection

Open the file: `src\main\resources\application.properties`

Update these lines with your MySQL credentials:

```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

Replace `YOUR_MYSQL_PASSWORD` with your actual MySQL password.

---

### Step 4: Build and Run the Application

#### Option A: Using Maven Wrapper (Recommended)

```powershell
# Navigate to project directory
cd "d:\fullstack\backendJAVA\01 app"

# Clean and build the project
.\mvnw.cmd clean install -DskipTests

# Run the application
.\mvnw.cmd spring-boot:run
```

#### Option B: If you have Maven installed

```powershell
# Clean and build
mvn clean install -DskipTests

# Run the application
mvn spring-boot:run
```

---

### Step 5: Access the Application

Once you see this message in the console:

```
===========================================
Employee Management System is running!
Access the application at: http://localhost:8080
===========================================
```

Open your web browser and go to:

**http://localhost:8080**

---

## 🎯 Using the Application

### Dashboard
- View total employees, departments, and statistics
- See recent employees and department overview

### Employees Page
- View all employees in a table
- Add new employees (click "+ Add Employee")
- Edit existing employees (click "Edit" button)
- Delete employees (click "Delete" button)
- Filter by department and status
- Search employees by name, email, department, or position

### Departments Page
- View all departments as cards
- Add new departments
- Edit department information
- Delete departments
- See employee count per department

---

## 🔧 Troubleshooting

### Problem: "mvnw.cmd is not recognized"

**Solution:** Make sure you're in the project directory:
```powershell
cd "d:\fullstack\backendJAVA\01 app"
```

### Problem: "Cannot connect to MySQL"

**Solutions:**
1. Verify MySQL is running:
   ```powershell
   net start MySQL80
   ```

2. Check your credentials in `application.properties`

3. Test MySQL connection:
   ```powershell
   mysql -u root -p
   ```

### Problem: "Port 8080 already in use"

**Solution:** Change the port in `application.properties`:
```properties
server.port=8081
```

Then access the app at `http://localhost:8081`

### Problem: "JAVA_HOME not found"

**Solution:** Set JAVA_HOME environment variable:
```powershell
# Find Java installation path
where java

# Set JAVA_HOME (replace path with your Java installation)
setx JAVA_HOME "C:\Program Files\Java\jdk1.8.0_xxx"
```

Restart your terminal after setting JAVA_HOME.

---

## 📱 API Testing

You can test the REST API using tools like Postman or cURL:

### Get All Employees
```powershell
curl http://localhost:8080/api/employees
```

### Create New Employee
```powershell
curl -X POST http://localhost:8080/api/employees -H "Content-Type: application/json" -d "{\"firstName\":\"Test\",\"lastName\":\"User\",\"email\":\"test@example.com\",\"phone\":\"+1-555-9999\",\"department\":\"Engineering\",\"position\":\"Developer\",\"salary\":75000,\"hireDate\":\"2024-01-01\",\"status\":\"Active\"}"
```

### Get All Departments
```powershell
curl http://localhost:8080/api/departments
```

---

## 🛑 Stopping the Application

Press `Ctrl + C` in the terminal where the application is running.

---

## 📂 Project Structure

```
employee-management-system/
├── .mvn/                           # Maven wrapper files
├── database/
│   └── init.sql                    # Sample data script
├── src/
│   ├── main/
│   │   ├── java/com/employeemanagement/
│   │   │   ├── config/             # Configuration classes
│   │   │   ├── controller/         # REST Controllers
│   │   │   ├── exception/          # Exception handlers
│   │   │   ├── model/              # Entity models
│   │   │   ├── repository/         # Data repositories
│   │   │   ├── service/            # Business logic
│   │   │   └── EmployeeManagementApplication.java
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── css/            # Stylesheets
│   │       │   └── js/             # JavaScript
│   │       ├── templates/          # HTML templates
│   │       └── application.properties
├── .gitignore
├── mvnw.cmd                        # Maven wrapper (Windows)
├── pom.xml                         # Maven dependencies
├── README.md                       # Full documentation
└── SETUP_GUIDE.md                  # This file
```

---

## 🎉 Success!

If everything is working, you should see:
- ✅ Application running on http://localhost:8080
- ✅ Beautiful dashboard with statistics
- ✅ Sample employees and departments loaded
- ✅ All CRUD operations working

---

## 📞 Need Help?

Common issues and solutions are in the **Troubleshooting** section above.

For more details, check the main **README.md** file.

---

**Happy Coding! 🚀**
