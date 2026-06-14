# --- Build stage: compile and package the Spring Boot jar ---
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Cache dependencies first
COPY pom.xml .
RUN mvn -q -B dependency:go-offline

# Build (tests are skipped here; they need a database and run in CI/locally)
COPY src ./src
RUN mvn -q -B clean package -DskipTests

# --- Runtime stage: small JRE image with just the jar ---
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/caretrack-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
