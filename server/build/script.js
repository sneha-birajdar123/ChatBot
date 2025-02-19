const chatBox = document.getElementById("chat-box")
const userInput = document.getElementById("user-input")
const sendBtn = document.getElementById("send-btn")

const API_KEY = ""

//FUnction to add messages to chatBox
function addMessage (text, sender){
    const messageDiv = document.createElement("div")
    messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message")
    messageDiv.innerText = text
    chatBox.appendChild(messageDiv)
    chatBox.scrollTop = chatBox.scrollHeight
}
//function to send request to openAI API

async function getAIResponse(userMessage){
    const apiURL = "https://api.openai.com/v1/chat/completions"
    const headers = {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${API_KEY}`   }
        
        const body = JSON.stringify({
            model : "gpt-4o",
            messages : [{role : "system", content :  "You are a helpful AI assistant" }, {role :"user", content : userMessage}]
        })
         
        try {
            const response = await axios.post(apiURL, body, {headers})
            console.log(response.data);
            return response.data.choices[0].message.content
        } catch (error) {
            console.log("Error fetching AI reponse", error);return "Sorry, I coudln't connect AI "
        }
        }   


        sendBtn.addEventListener("click", async () => {
            const userMessage = userInput.value.trim();
            
            if (userMessage === "") {
                alert("Type Something....");
                return;
            }
            
            if (userMessage.length <= 2) {
                alert("Write something more than 2 letters");
                return;
            }
        
            addMessage(userMessage, "user");
            userInput.value = ""; // Properly clear input field
        
            const aiResponse = await getAIResponse(userMessage);
            console.log(aiResponse);
            addMessage(aiResponse, "bot");
        });
        
        // Move this outside the click event
        userInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                sendBtn.click();
            }
        });
        