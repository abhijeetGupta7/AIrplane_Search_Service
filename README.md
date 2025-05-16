# ✈️ Airline Search Service – API Documentation

## 📘 Base URL

```
/api/v1
```

---

## ✈️ Airplane APIs

### 🔹 Create Airplane

* **Endpoint:** `POST /api/v1/airplane`
* **Request Body:**

  ```json
  {
    "modelNumber": "airbus340",
    "capacity": 900
  }
  ```
* **Response:** `201 Created`
  Returns the created airplane object.

### 🔹 Get All Airplanes

* **Endpoint:** `GET /api/v1/airplane`
* **Response:** `200 OK`
  Returns a list of all airplanes.

### 🔹 Get Airplane by ID

* **Endpoint:** `GET /api/v1/airplane/:id`
* **Response:** `200 OK`
  Returns the airplane object.

### 🔹 Update Airplane

* **Endpoint:** `PATCH /api/v1/airplane/:id`
* **Request Body:**
  Partial or full airplane object.
* **Response:** `200 OK`

### 🔹 Delete Airplane

* **Endpoint:** `DELETE /api/v1/airplane/:id`
* **Response:** `200 OK`

---

## 🏙️ City APIs

### 🔹 Create City

* **Endpoint:** `POST /api/v1/city`
* **Request Body:**

  ```json
  {
    "name": "Delhi"
  }
  ```
* **Response:** `201 Created`

### 🔹 Get All Cities

* **Endpoint:** `GET /api/v1/city`
* **Response:** `200 OK`

### 🔹 Get City by ID

* **Endpoint:** `GET /api/v1/city/:id`
* **Response:** `200 OK`

### 🔹 Update City

* **Endpoint:** `PATCH /api/v1/city/:id`
* **Request Body:**
  Partial or full city object.
* **Response:** `200 OK`

### 🔹 Delete City

* **Endpoint:** `DELETE /api/v1/city/:id`
* **Response:** `200 OK`

---

## 🛬 Airport APIs

### 🔹 Create Airport

* **Endpoint:** `POST /api/v1/airport`
* **Request Body:**

  ```json
  {
    "name": "Indira Gandhi International",
    "code": "DEL",
    "address": "New Delhi",
    "cityId": 1
  }
  ```
* **Response:** `201 Created`

### 🔹 Get All Airports

* **Endpoint:** `GET /api/v1/airport`
* **Response:** `200 OK`

### 🔹 Get Airport by ID

* **Endpoint:** `GET /api/v1/airport/:id`
* **Response:** `200 OK`

### 🔹 Update Airport

* **Endpoint:** `PATCH /api/v1/airport/:id`
* **Request Body:**
  Partial or full airport object.
* **Response:** `200 OK`

### 🔹 Delete Airport

* **Endpoint:** `DELETE /api/v1/airport/:id`
* **Response:** `200 OK`

---

## 🛫 Flight APIs

### 🔹 Create Flight

* **Endpoint:** `POST /api/v1/flights`
* **Request Body:**

  ```json
  {
    "flightNumber": "AI101",
    "airplaneId": 1,
    "arrivalAirportId": "DEL",
    "departureAirportId": "BOM",
    "arrivalTime": "2024-08-30T10:00:00Z",
    "departureTime": "2024-08-30T07:00:00Z",
    "price": 5000,
    "boardingGate": "A1",
    "totalSeats": 200
  }
  ```
* **Response:** `201 Created`

### 🔹 Get All Flights

* **Endpoint:** `GET /api/v1/flights`
* **Query Parameters:**

  * `trips=departureCode-arrivalCode`
  * `price=min-max`
  * `travellers=n`
  * `tripDate=YYYY-MM-DD`
  * `sort=field_order` (e.g., `price_ASC`)
* **Response:** `200 OK`

### 🔹 Get Flight by ID

* **Endpoint:** `GET /api/v1/flights/:id`
* **Response:** `200 OK`

### 🔹 Update Remaining Seats

* **Endpoint:** `PATCH /api/v1/flights/:id/seats`
* **Request Body:**

  ```json
  {
    "seats": 2,
    "dec": "true"
  }
  ```
* **Response:** `200 OK`

---

## ℹ️ Info API

### 🔹 Get API Status

* **Endpoint:** `GET /api/v1/info`
* **Response:** `200 OK`

  ```json
  {
    "message": "API is live"
  }
  ```

---

## ❌ Error Response Format

All error responses follow this structure:

```json
{
  "success": false,
  "message": "Error message",
  "data": {},
  "error": {
    "Explanation": "Detailed explanation"
  }
}
```

---

## ✅ Success Response Format

All success responses follow this structure:

```json
{
  "success": true,
  "message": "Success message",
  "data": {
    /* response data */
  },
  "error": {}
}
```
