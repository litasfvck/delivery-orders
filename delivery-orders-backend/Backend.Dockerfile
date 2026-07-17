FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

COPY delivery-orders-backend.csproj ./
RUN dotnet restore delivery-orders-backend.csproj

COPY . ./
RUN dotnet publish delivery-orders-backend.csproj -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /out ./
EXPOSE 8080
ENTRYPOINT ["dotnet", "delivery-orders-backend.dll"]