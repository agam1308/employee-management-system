@echo off
echo ================================================
echo Loading Test Data into Employee Management DB
echo ================================================
echo.

"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -proot employee_management_db < "%~dp0init.sql"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================
    echo SUCCESS! Test data loaded successfully!
    echo ================================================
    echo.
    echo You now have:
    echo - 5 Departments
    echo - 15 Employees
    echo.
    echo Refresh your browser at http://localhost:8080
    echo ================================================
) else (
    echo.
    echo ================================================
    echo ERROR! Failed to load data.
    echo Please check your MySQL password and try again.
    echo ================================================
)

echo.
pause
