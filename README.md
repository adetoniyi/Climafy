### **Project: Climafy Weather API**

#### **Tech Stack:**

- **Backend Framework**: Node.js (with Express) + TypeScript
- **Database**: MongoDB Atlas
- **ORM**: Mongoose
- **Authentication**: JWT
- **API Source**: OpenWeatherMap API
- **Real-time Communication**: WebSocket (Socket.io)
- **API Documentation**: Swagger (OpenAPI 3.0)
- **Deployment**: Render

---

### **Features & Requirements:**

1. **Authentication & Authorization:**

   - JWT-based authentication.
   - Single role: Authenticated user.
   - Users can register and login to manage weather preferences and locations.

2. **User Preferences:**

   - Users can set preferences:
     - Temperature unit (`metric` or `imperial`)
     - Enable/disable severe and custom alerts

3. **Location Management:**

   - CRUD operations for user-specific locations.
   - Location fields:
     - Name (e.g., Home, Work)
     - Latitude
     - Longitude

4. **Weather Forecasting:**

   - Integrate OpenWeatherMap API.
   - Provide:
     - **Current Weather**
     - **Hourly Forecast** (48 hours)
     - **Daily Forecast** (7 days)
   - Convert units based on user preference.

5. **Custom Alerts:**

   - Users can define severe weather conditions based on:
     - Temperature, Wind, or Humidity
     - Condition (greater than, less than, equal to)
     - Threshold value
   - Alerts are stored and matched against live weather data.

6. **Real-time Severe Weather Alerts (WebSocket):**

   - WebSocket connection to push:
     - Severe alerts (admin-triggered or system-triggered)
     - Custom alerts when thresholds are breached

7. **API Documentation:**

   - Full Swagger documentation for all endpoints:
     - Auth, Users, Locations, Weather, Alerts
   - Auth headers and schema definitions included

8. **Database Schema (using Mongoose):**
   - **User** model with preferences and reference to locations and alerts.
   - **Location** model with name, coordinates, and owner reference.
   - **Alert** model defining type, condition, threshold, and location.

---

### **Extra Challenges (Optional):**

- Implement weather polling and matching to auto-trigger alerts
- Admin panel (future addition) to send global severe alerts

---

### **Project Deliverables:**

- Functional API deployed locally and on Render
- API documentation accessible via Swagger (`/api-docs`)
- Source code repository (GitHub) with clear setup instructions
- Project adheres to clean, modular architecture
- WebSocket server integrated and working with custom alerts

---

This project allows backend engineers to showcase real-time system design, integration of third-party APIs, user preference handling, and clean RESTful API architecture — all within a production-grade TypeScript codebase.
"""
