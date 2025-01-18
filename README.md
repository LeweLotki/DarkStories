---

# **Dark Stories API**

Dark Stories API is a backend application for the **Dark Stories** game, designed to manage puzzles and provide AI-powered responses to user questions. The application uses **FastAPI** for the backend, **PostgreSQL** as the database, and integrates with a fine-tuned GPT model for generating responses. The frontend is built with **React** to provide a seamless user experience.

---

## **Purpose**
This application allows users to interact with a collection of "Dark Stories" puzzles. Players can:
- Retrieve random puzzles or specific puzzles.
- Ask the AI questions about the puzzles, with answers restricted to "YES," "NO," or "PASS."
- Manage puzzles in the backend for game updates.

---

## **Tech Stack**
- **Backend**: FastAPI, PostgreSQL
- **AI Integration**: Fine-tuned GPT model
- **Frontend**: React
- **Database**: PostgreSQL

---

## **Getting Started**

### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Set up the Python environment:
   ```bash
   poetry install
   ```

3. Configure the `.env` file:
   ```env
   OPENAI_API_KEY=<your-openai-api-key>
   DATABASE_URL=postgresql://<user>:<password>@localhost:5432/dsdb
   ```

4. Run the backend server:
   ```bash
   poetry run uvicorn app.main:app --reload
   ```

---

### **Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

The frontend communicates with the backend API for retrieving puzzles and sending questions to the GPT model.

---

## **Key API Endpoints**

### **Descriptions**
- `POST /descriptions/`  
  Add a new puzzle description and solution.

- `GET /descriptions/random`  
  Fetch a random puzzle.

- `GET /descriptions/{id}`  
  Retrieve a specific puzzle description and solution.

### **Messages**
- `GET /messages/?message=<message>&id=<id>`  
  Ask the AI a question about a specific puzzle.

---

## **Contributing**
Contributions are welcome! Create a pull request with your proposed changes.

---
