# Employee Management System

A full-stack Employee Management System built with **Java 8**, **Spring Boot**, **MySQL**, and modern **HTML/CSS/JavaScript**.

## 🚀 Features

### Backend Features
- ✅ RESTful API with Spring Boot
- ✅ MySQL database integration with JPA/Hibernate
- ✅ Complete CRUD operations for Employees and Departments
- ✅ Input validation and error handling
- ✅ Search and filter functionality
- ✅ CORS enabled for frontend integration

### Frontend Features
- ✅ Modern, responsive dashboard UI
- ✅ Real-time statistics and analytics
- ✅ Employee management (Add, Edit, Delete, Search)
- ✅ Department management
- ✅ Advanced filtering by department and status
- ✅ Beautiful dark theme with gradient effects
- ✅ Smooth animations and transitions

## 📋 Prerequisites

Before running this application, make sure you have:

- **Java 8** or higher installed
- **Maven** 3.6+ installed
- **MySQL** 5.7+ or 8.0+ installed and running
- A web browser (Chrome, Firefox, Edge, etc.)

## 🛠️ Installation & Setup

### 1. Database Setup

First, create the MySQL database and user:

```sql
-- Login to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE employee_management_db;

-- (Optional) Create a dedicated user
CREATE USER 'emp_user'@'localhost' IDENTIFIED BY 'emp_password';
GRANT ALL PRIVILEGES ON employee_management_db.* TO 'emp_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Configure Database Connection

Update the database credentials in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/employee_management_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
```

**Note:** Change `root` and `root` to your MySQL username and password.

### 3. Initialize Sample Data (Optional)

To populate the database with sample data, run the SQL script:

```bash
mysql -u root -p employee_management_db < database/init.sql
```

### 4. Build and Run the Application

```bash
# Navigate to project directory
cd "d:\fullstack\backendJAVA\01 app"

# Clean and build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The application will start on **http://localhost:8080**

## 🌐 Accessing the Application

Once the application is running:

1. Open your web browser
2. Navigate to: **http://localhost:8080**
3. You should see the Employee Management System dashboard

## 📚 API Endpoints

### Employee Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/{id}` | Get employee by ID |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |
| GET | `/api/employees/department/{dept}` | Get employees by department |
| GET | `/api/employees/status/{status}` | Get employees by status |
| GET | `/api/employees/search?keyword={keyword}` | Search employees |

### Department Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/departments` | Get all departments |
| GET | `/api/departments/{id}` | Get department by ID |
| POST | `/api/departments` | Create new department |
| PUT | `/api/departments/{id}` | Update department |
| DELETE | `/api/departments/{id}` | Delete department |

## 📁 Project Structure

```
employee-management-system/
├── src/
│   ├── main/
│   │   ├── java/com/employeemanagement/
│   │   │   ├── controller/          # REST Controllers
│   │   │   ├── model/               # Entity Models
│   │   │   ├── repository/          # JPA Repositories
│   │   │   ├── service/             # Business Logic
│   │   │   ├── exception/           # Custom Exceptions
│   │   │   └── EmployeeManagementApplication.java
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── css/             # Stylesheets
│   │       │   └── js/              # JavaScript files
│   │       ├── templates/           # HTML templates
│   │       └── application.properties
│   └── test/                        # Test files
├── database/
│   └── init.sql                     # Database initialization script
├── pom.xml                          # Maven dependencies
└── README.md
```

## 🎨 Technology Stack

### Backend
- **Java 8**
- **Spring Boot 2.7.18**
- **Spring Data JPA**
- **MySQL 8.0**
- **Lombok**
- **Maven**

### Frontend
- **HTML5**
- **CSS3** (Custom styling with CSS Variables)
- **Vanilla JavaScript** (ES6+)
- **Font Awesome** (Icons)
- **Google Fonts** (Inter)

## 🔧 Configuration

### Change Server Port

Edit `src/main/resources/application.properties`:

```properties
server.port=8081
```

### Enable/Disable SQL Logging

```properties
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

### Database Auto-Creation

```properties
# Options: create, create-drop, update, validate, none
spring.jpa.hibernate.ddl-auto=update
```

## 🧪 Testing the API

You can test the API using tools like:

- **Postman**
- **cURL**
- **Browser DevTools**

Example cURL command:

```bash
# Get all employees
curl http://localhost:8080/api/employees

# Create new employee
curl -X POST http://localhost:8080/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "+1-555-9999",
    "department": "Engineering",
    "position": "Developer",
    "salary": 75000,
    "hireDate": "2024-01-01",
    "status": "Active"
  }'
```

## 🐛 Troubleshooting

### MySQL Connection Issues

1. Ensure MySQL is running:
   ```bash
   # Windows
   net start MySQL80
   
   # Linux/Mac
   sudo systemctl start mysql
   ```

2. Verify credentials in `application.properties`
3. Check if port 3306 is available

### Port Already in Use

If port 8080 is already in use, change it in `application.properties`:

```properties
server.port=8081
```

### Build Errors

Clean and rebuild:

```bash
mvn clean install -U
```

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created with ❤️ using Java 8, Spring Boot, and MySQL

---

**Happy Coding! 🚀**
