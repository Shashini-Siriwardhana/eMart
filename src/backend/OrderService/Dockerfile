# -----------------------------------------------------
# Build Stage
# -----------------------------------------------------

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /emart
# Because NuGet dependencies are defined mostly in the .csproj files. 
# If .csproj does not changed, Docker can reuse the cached dotnet restore laye
COPY ["src/backend/OrderService/OrderService.csproj", "OrderService/"]
COPY ["src/backend/Shared.Messaging/Shared.Messaging.csproj", "Shared.Messaging/"]

# Download NuGet packages
RUN dotnet restore "OrderService/OrderService.csproj" 
# Copy everything from the Docker build context into the current Docker directory.
COPY src/backend/ . 
WORKDIR /emart/OrderService
# Builds OrderService for deployment and places the published files into a specific folder (/app/publish)
RUN dotnet publish "OrderService.csproj" \
    -c Release \
    -o /app/publish \
    --no-restore

# -------------------------------------------------------
# Runtime Stage
# -------------------------------------------------------

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
# Copy the published files from the earlier build stage into this new final stage.
COPY --from=build /app/publish .
# Which container port the app uses
EXPOSE 8080
# Tells ASP.NET Core to listen on port 8080.
ENV ASPNETCORE_URLS=http://+:8080
# Tells Docker what command to run when the container starts.
# OrderService.dll - compiled .net application produced by dotnet publish
ENTRYPOINT ["dotnet", "OrderService.dll"]