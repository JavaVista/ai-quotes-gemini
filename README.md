# AI Quote Generator with Firebase Functions and Gemini

This project provides an API endpoint to generate unique AI-powered quotes based on a given category. It uses Firebase Functions for serverless deployment and connects to the Gemini AI Flash 1.5 model for quote generation. The quotes are designed to be original and not imitate existing authors.

## Features

- **Generate Unique Quotes:**  Creates original quotes based on a provided category.
- **Gemini AI Integration:** Utilizes the powerful Gemini AI Flash 1.5 model for high-quality quote generation.
- **Serverless Deployment:**  Deployed easily and scalably using Firebase Functions.
- **Metadata Generation** Return the quote along with its author (Gemini), category (Provided by the user), and occupation (AI).


## Getting Started

### Prerequisites

- **Firebase Project:** Create a Firebase project in the Firebase console ([https://console.firebase.google.com/](https://console.firebase.google.com/)).
- **Gemini API Key:** Obtain an API key for
 the Gemini AI model.
- **Node.js and npm:**  Install Node.js and npm on your local machine.

### Installation

1. **Clone the Repository:**

2. **Install Dependencies:**
3. **Set Up Environment Variables:**
   * **Create a `.env` file:** In your project's root directory, create a file named `.env`.
   * **Add your API key:** Paste your Gemini API key into the `.env` file like this:
 ``API_KEY=YOUR_ACTUAL_API_KEY``

    **Important:** Never commit your `.env` file to version control!

4. **Deploy to Firebase Functions:** 
    ```firebase deploy --only functions```
### Usage

1. **Send a POST Request:**
   Send a POST request to the deployed Firebase Function endpoint with the following JSON payload:
Replace `"inspiration"` with the desired quote 

```curl -X POST -H "Content-Type: application/json" -d '{"category": "inspiration"}' http://127.0.0.1:5001/[your-project-id]/us-central1/generateAiQuote```

