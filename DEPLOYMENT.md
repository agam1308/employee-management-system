# 🚀 Deployment Guide - Employee Management System Demo

## Deployment Options

This Spring Boot + MySQL application can be deployed to various platforms. Here are the recommended options:

---

## Option 1: Railway.app (Recommended - Free Tier Available)

Railway is perfect for Spring Boot apps with MySQL.

### Steps:

1. **Visit Railway**: https://railway.app/
2. **Sign up/Login** with GitHub
3. **Create New Project** → **Deploy from GitHub repo**
4. **Select**: `agam1308/employee-management-system`
5. **Add MySQL Database**:
   - Click "New" → "Database" → "MySQL"
   - Railway will auto-create a MySQL instance
6. **Configure Environment Variables**:
   ```
   SPRING_DATASOURCE_URL=jdbc:mysql://${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}
   SPRING_DATASOURCE_USERNAME=${MYSQLUSER}
   SPRING_DATASOURCE_PASSWORD=${MYSQLPASSWORD}
   SPRING_JPA_HIBERNATE_DDL_AUTO=update
   ```
7. **Deploy**: Railway will auto-deploy on every push to main branch

**Cost**: Free tier includes 500 hours/month

---

## Option 2: Render.com (Free Tier)

### Steps:

1. **Visit**: https://render.com/
2. **Sign up** with GitHub
3. **New** → **Web Service**
4. **Connect** your GitHub repository
5. **Configure**:
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/employee-management-system-1.0.0.jar`
   - **Environment**: Java 8
6. **Add PostgreSQL Database** (Render doesn't offer MySQL on free tier):
   - Update `pom.xml` to include PostgreSQL driver
   - Change `application.properties` dialect to PostgreSQL
7. **Deploy**

**Cost**: Free tier available

---

## Option 3: Heroku (Paid - $5/month minimum)

### Steps:

1. **Install Heroku CLI**: https://devcenter.heroku.com/articles/heroku-cli
2. **Login**:
   ```bash
   heroku login
   ```
3. **Create App**:
   ```bash
   heroku create employee-mgmt-demo
   ```
4. **Add MySQL (ClearDB)**:
   ```bash
   heroku addons:create cleardb:ignite
   ```
5. **Get Database URL**:
   ```bash
   heroku config:get CLEARDB_DATABASE_URL
   ```
6. **Set Config**:
   ```bash
   heroku config:set SPRING_DATASOURCE_URL=<cleardb-url>
   ```
7. **Deploy**:
   ```bash
   git push heroku main
   ```

**Cost**: $5/month minimum

---

## Option 4: AWS Elastic Beanstalk (Free Tier for 12 months)

### Steps:

1. **Install EB CLI**:
   ```bash
   pip install awsebcli
   ```
2. **Initialize**:
   ```bash
   eb init -p java-8 employee-management-system
   ```
3. **Create Environment**:
   ```bash
   eb create employee-mgmt-env
   ```
4. **Add RDS MySQL**:
   - Go to AWS Console → RDS
   - Create MySQL database
   - Update security groups
5. **Set Environment Variables** in EB Console
6. **Deploy**:
   ```bash
   eb deploy
   ```

**Cost**: Free tier for 12 months, then pay-as-you-go

---

## Option 5: Docker + Any Cloud Platform

### Create Dockerfile:

```dockerfile
FROM openjdk:8-jdk-alpine
VOLUME /tmp
COPY target/employee-management-system-1.0.0.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

### Build and Deploy:
```bash
# Build JAR
./mvnw clean package -DskipTests

# Build Docker image
docker build -t employee-management-system .

# Run locally
docker run -p 8080:8080 employee-management-system

# Push to Docker Hub
docker tag employee-management-system yourusername/employee-management-system
docker push yourusername/employee-management-system
```

Then deploy to:
- **Google Cloud Run**
- **Azure Container Instances**
- **DigitalOcean App Platform**

---

## 🎯 Recommended: Railway.app

**Why Railway?**
- ✅ Free tier with 500 hours/month
- ✅ Built-in MySQL support
- ✅ Auto-deploy from GitHub
- ✅ Easy environment variable management
- ✅ No credit card required for free tier
- ✅ Simple setup (5 minutes)

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] `.gitignore` excludes `target/`, `.mvn/`, and sensitive files
- [ ] Database credentials are in environment variables (not hardcoded)
- [ ] `application.properties` uses `${ENV_VAR}` syntax for production
- [ ] MySQL database is created on the cloud platform
- [ ] Security groups/firewall rules allow database connections
- [ ] Application builds successfully: `./mvnw clean package`

---

## 🔒 Security Notes

**For Production:**

1. **Never commit** database passwords to Git
2. **Use environment variables** for all sensitive data
3. **Enable HTTPS** on your deployment platform
4. **Update** `application.properties` for production:
   ```properties
   spring.datasource.url=${DATABASE_URL}
   spring.datasource.username=${DB_USERNAME}
   spring.datasource.password=${DB_PASSWORD}
   spring.jpa.hibernate.ddl-auto=validate
   ```
5. **Add CORS restrictions** in `WebConfig.java`

---

## 📞 Need Help?

- **Railway Docs**: https://docs.railway.app/
- **Render Docs**: https://render.com/docs
- **Heroku Docs**: https://devcenter.heroku.com/

---

**Your application is ready to deploy! Choose a platform and follow the steps above.** 🚀
