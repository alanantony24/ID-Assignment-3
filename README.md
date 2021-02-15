# ID-Assignment-3

# Problem Statement
Nowadays,many youths,students and working adults are busy round the clock,and are very committed to their responsibilities.However,one common issue many people face is time management,caused by lack of planning and a lack of motivation.Hence,my teammate and I decided to come up with a website called orDino,which allows users to plan their schedule and organise their day-to-day events whilst leading stress-free lives. Not motivated or fascinated?? Fret not,this app will offer gamifying features for users to get going.



# API Info
* [Todoist Rest API](https://developer.todoist.com/rest/v1/#overview)

# General Features

### General 
* **User Login/Sign Up:** Users must sign up or login to an OrDino user account 
to use this app.
### User accounts
For the todoist API,we are incorporating a few custom users for our website flow.
Since each user has his own set of projects,we decided to generate a few API keys for these users using our gmail (personal and school accounts).
This would ensure that each user's projects&tasks are individualised ,smoothly read and written to.

### User credentials
No|User Name| Password | Email Address | API-KEY
--|---------|----------|---------------|---------|
1.|amanadam|amanadam24|s10207327@connect.np.edu.sg|9ffb6de49236f049524d53010b0fe7e1b55a9175
2.|kebabboy|mepro|s10204884@connect.np.edu.sg|091ba9ad13fb753c014adf401afbc0b3ce476db2
3.|macho|nonono987|mahshuk410@gmail.com|74829a769468751c27ce5dbf7c162c31c6972322
4.|mrbarbarian24|alanantony|alanantony050@gmail.com|69240a14af7f11d150b64bc00c5558cba3741041



# Gamification features
### Points system
We have implemented a three-tier system.
Through which users can gain points for completing objectives,assigned to them
Points : Anti-Procastination Points **_(APPoints)_**
**The tiers are named after dinosaurs**
Tier No.|Title |Points requirements|
--------|------|-------------------|

**Tier 1**|T-Rex Tyson |**_(>10000 APPoints)_**
**Tier 2**| Velociraptor Vin |**_(>6000 APPoints)_**
**Tier 3**| Seismosaurus Simon |**_(>2000 APPoints)_**

### Projects
* Create a new project (e.g.Exam preparation,wedding Plans etc.)
* Update an existing project
* Get all projects                           
* Get a specified project(_Search function_)
* Delete a project (_done or not necessary_)

### Tasks
* Create a new task(e.g. Study for Maths paper,negotiate wedding caterers)
> Specified,individual Tasks form up a project
> Users can add as many tasks as they like to a project
* Get active tasks(e.g. HTTP 'GET' method)
* Completing a task (e.g. Mark as done,check off list)
* Update a task (e.g. Modify due date/time,description etc.)
* Open/Close task
* Delete a task

# Technologies Used
1. HTML
2. CSS,bootstrap 5.0.0
3. JavaScript, Jquery v3.5.1 minfied
4. Lottie Animations(Adobe After Effects)
5. Visual Studio Code
6.Restdb.io(NoSQL database)
7.ionicons.com*for navbar icons*

# Design Rationale
## App name
> OrDino is originated from the Latin Language.In English,Ordino means :order/arrange, set in order; adjust, regulate; compose; 
> Hence,OrDino was the suitable name for our Todoist API app.
## Logo
* A small dinosaur was illustrated to match with the app name's 2nd word "-Dino" .It is drawn with a pen being held to tell users about the 
base functionality of the app - jotting/recording down tasks,reminders.![orDino App Logo](../assets/drawing.png)
## Side Navbar(main.html)
Responsive side navbar to navigate easily between
* Add Project/Tasks
* Inbox:Main page displaying all records of projects & task
* Log Out
*Reason:To improve User experience*

# Credits and Acknowledgements
* [W3Schools](w3schools.com)
## Youtubers(Channels)
  * Coding Market
