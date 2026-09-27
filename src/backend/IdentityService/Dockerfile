# -----------------------------------------------------
# Build Stage
# -----------------------------------------------------

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /emart
# Because NuGet dependencies are defined mostly in the .csproj files. 
# If .csproj does not changed, Docker can reuse the cached dotnet restore laye
COPY ["src/backend/IdentityService/IdentityService.csproj", "IdentityService/"]

# Download NuGet packages
RUN dotnet restore "IdentityService/IdentityService.csproj" 
# Copy everything from the Docker build context into the current Docker directory.
COPY src/backend/ . 
WORKDIR /emart/IdentityService
# Builds IdentityService for deployment and places the published files into a specific folder (/app/publish)
RUN dotnet publish "IdentityService.csproj" \
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
# IdentityService.dll - compiled .net application produced by dotnet publish
ENTRYPOINT ["dotnet", "IdentityService.dll"]