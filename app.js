const Jarvis = {

    version: "2.0",

    async ask(message) {

        const lower = message.toLowerCase();

        // Local commands
        if (lower.includes("what can you do")) {
            return `
I am J.A.R.V.I.S. 2.0.

I can:
• Chat with you
• Manage tasks
• Search the web
• Work with selected files
• Remember conversations locally
• Help organize school work

My AI connection can be added through a secure backend.
`;
        }

        if (lower.startsWith("/search ")) {

            const query =
                message.substring(8).trim();

            window.open(
                "https://www.google.com/search?q=" +
                encodeURIComponent(query),
                "_blank"
            );

            return "Opening a web search for: " + query;
        }

        if (lower.startsWith("/task ")) {

            const task =
                message.substring(6).trim();

            tasks.push({
                text: task,
                done: false
            });

            saveTasks();
            renderTasks();

            return "Task added: " + task;
        }

        // AI backend
        try {

            const response = await fetch("/api/chat", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message
                })

            });

            if (!response.ok) {
                throw new Error("AI backend unavailable");
            }

            const data = await response.json();

            return data.reply;

        } catch (error) {

            return `
I couldn't reach my AI brain right now.

Your message was received, but the AI backend isn't connected yet.

Try:
 /search <something>
 /task <something>
`;
        }
    }
};
