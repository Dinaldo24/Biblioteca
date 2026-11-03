# Etapa 1: Compilar la aplicacion con Maven y Java 21
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: Imagen ligera para ejecucion en la nube
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/backend-biblioteca-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 3001
ENV PORT=3001

ENTRYPOINT ["java", "-jar", "app.jar"]
