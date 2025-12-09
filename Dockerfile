FROM openjdk:8-jdk-alpine

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY .mvn/ .mvn
COPY mvnw.cmd mvnw
COPY pom.xml .

# Copy source code
COPY src ./src

# Build the application
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "target/employee-management-system-1.0.0.jar"]
