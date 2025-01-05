## HackHive 🚀
Project Description
HackHive is a collaborative platform primarily designed for individuals who participate in hackathons and work on projects together in shared spaces. It combines GitHub OAuth for authentication, real-time communication, code execution, and a user-friendly interface to create a hacker-friendly environment. HackHive enables users to form teams, collaborate in virtual rooms, rate each other based on GitHub metrics, and even run code snippets directly within the platform. 🤖

Features ✨
GitHub OAuth Authentication 🔐:

Secure login using GitHub credentials.
Access to GitHub data (repositories, stars, followers, etc.).
User Rating System ⭐:

Dynamic rating based on contributions, pull requests, followers, stars received, and public repositories.
Star rating system (1 to 5 stars).
Team Management 👥:

Request users to join teams.
Create team rooms for collaboration and chatting.
Add or remove members from rooms.
Real-Time Communication 💬:

Chat functionality for team rooms.
Code Execution 💻:

Execute code snippets within the app.
Display results directly for quick feedback.
APIs 🌐
Authentication
GitHub OAuth
Enables secure login and retrieves user data from GitHub.
Chat APIs 💬
GET /chat/getRoomChats/:roomId

Fetches all chat messages in a specific room.
POST /chat/addChat

Adds a new message to a room.
Room APIs 🏠
POST /rooms

Creates a new room.
GET /rooms

Retrieves all rooms with member details.
GET /rooms/:id

Fetches details of a specific room by ID.
POST /rooms/:id/addMember

Adds a user to a room.
POST /rooms/:id/removeMember

Removes a user from a room.
User APIs 👤
GET /users

Fetches all users.
POST /users/update-rating

Updates user ratings based on GitHub metrics.
Project Inspiration 💡
HackHive was inspired by the need for an all-in-one platform for hackers, AI developers, and hackathon enthusiasts who collaborate intensively in team settings. The goal was to create a seamless environment where collaboration, real-time interaction, and GitHub data insights converge to enhance productivity and teamwork.

# Challenges Faced 💪
GitHub OAuth Integration: Ensuring secure and seamless authentication while accessing user data.
Real-Time Features: Implementing efficient communication and live updates for chat and code execution.
Dynamic Rating System: Creating a fair and scalable algorithm to calculate user ratings based on multiple metrics.
Code Execution Security: Ensuring that code execution within the platform does not compromise user data or platform security.
# Achievements 🏆
Successfully implemented GitHub OAuth for secure user authentication.
Created a robust user rating system based on real GitHub activity.
Enabled seamless team collaboration through dynamic room creation and management.
Built a functional code execution feature integrated with real-time chat.
Future Development 🚀
Advanced Code Execution:

Support for multiple programming languages.
Syntax highlighting and code formatting.
Gamification 🎮:

Leaderboards and badges for active contributors.
Incentives for team collaboration.
AI-Powered Features 🤖:

Recommendation system for team members.
Automated insights based on GitHub activity.
Mobile App 📱:

A dedicated mobile app for on-the-go collaboration.
Enhanced Security 🔒:

Advanced protection for code execution.
Two-factor authentication for user accounts.
Video Call Integration 🎥:

Enable video call functionality for better team communication and collaboration.
Built With
express.js
mongodb
node.js
react
tailwindcss
Try it out
 hack-hive-navy.vercel.app
