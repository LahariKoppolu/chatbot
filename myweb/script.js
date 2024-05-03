
document.addEventListener('DOMContentLoaded', function() {
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbot = document.getElementById('chatbot');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.toggle('closed');
        chatbotToggle.classList.toggle('closed');
    });

    sendBtn.addEventListener('click', function() {
        sendMessage();
    });

    userInput.addEventListener('keypress', function(e) {// Assuming you're using Dialogflow, replace with your specific integration code. 
        // This is a simplified example.
        
        const dialogflow = require('dialogflow');
        
        // Your Dialogflow configuration
        const projectId = 'your-dialogflow-project-id';
        const sessionId = 'session-id';
        const languageCode = 'en-US';
        
        // Initialize Dialogflow session client
        const sessionClient = new dialogflow.SessionsClient();
        const sessionPath = sessionClient.sessionPath(projectId, sessionId);
        
        // Function to detect user intent
        async function detectIntent(queryText) {
            const request = {
                session: sessionPath,
                queryInput: {
                    text: {
                        text: queryText,
                        languageCode: languageCode,
                    },
                },
            };
        
            const responses = await sessionClient.detectIntent(request);
            const result = responses[0].queryResult;
            return result.fulfillmentText; // Get chatbot response 
        }
        
        // Example usage (assuming you have a chat input element with id "chat-input")
        document.getElementById('chat-input').addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                const userQuery = this.value;
                detectIntent(userQuery).then(response => {
                    // Display chatbot response in the chat window
                    // ...
                });
            }
        });
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage !== '') {
            appendMessage('user', userMessage);
            sendMessageToDialogflow(userMessage);
            userInput.value = '';
        }
    }
    

    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.innerText = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessageToDialogflow(userMessage) {
        const projectId = iselect-mvrg; // Replace 'your-project-id' with your Dialogflow project ID
        const apiKey = AIzaSyDxgER06oTcmecl4e1r_kh00E74l6OomNQ; // Replace 'your-api-key' with your Dialogflow API key or token
    
        const url = `https://dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions/${Math.random().toString(36).substring(7)}:detectIntent`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        };
        const data = JSON.stringify({
            queryInput: {
                text: {
                    text: userMessage,
                    languageCode: 'en-US', // Set the language code (e.g., 'en-US' for English)
                },
            },
        });
    
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: data,
        })
        .then(response => response.json())
        .then(json => {
            const chatbotResponse = json.queryResult.fulfillmentText;
            appendMessage('bot', chatbotResponse);
        })
        .catch(error => {
            console.error('Error sending message to Dialogflow:', error);
        });
    }
    
});
