# ID-Assignment-3

# Problem Statement
Nowadays,many youths,students and working adults are busy round the clock,and are very committed to their responsibilities.However,one common issue many people face is time management,caused by lack of planning and a lack of motivation.Hence,my teammate and I decided to come up with a website called orDino,which allows users to plan their schedule and organise their day-to-day events whilst leading stress-free lives. Not motivated or fascinated?? Fret not,this app will offer gamifying features for users to get going.
## Intended Audience
Working adults,students,professionals,even regular white-collar workers who have a common goal: _Organise the daily tasks and projects_

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
Points System(Activities)
==========================
Create Task : 30 points
Delete Task : -10 points
Reschedule task: -100 points
Complete Task : 80 points

Create Project : 400 points
Delete Project :  -200 points
* first time users get 100 free APPoints
This game is conducted in 3 cycles.
Cycle 1 : January - March (April break)
Cycle 2 :May- July (August Break)
Cycle 3 : September - November (December Break)
In 3 months,users can earn as much APPoints as they can.
After 3 months,it will be reset.

REWARDS 
=============================
Tier 1
===============
Cycle 1:Cable Car Vouchers (8000 APPoints)     
Cycle 2:Jewel Premium Lounge vouchers (8000 APPoints)
cycle 3:Zoo tickets(2 people) (7000 APPoints)

Tier 2
===============
cycle 1:FairPrice Voucher $35 (4500 APPoints)
cycle 2:PastaMania Voucher $25 (3000 APPoints)
cycle 3:Andes by Astons Voucher $20 (2500 APPoints)

Tier 3
==================
cycle 1:Bubble Tea Voucher ($5) (900 APPoints)
cycle 2:McDonalds Coupon ($7) (1000 APPoints)
cycle 3:7-Eleven Coupon($5) (800 APPoints)

### Purchase
1 cycle :1 Purchase (Each eligibile User)
Tier remains unchanged even if he falls short of category after purchase.(e.g.Points minus after voucher redemption)


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
8.moment.js
9.datepicker.css
10. google fonts
11. OBS Recorder (Video recording)

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
* https://www.jquery-az.com/bootstrap-datepicker-set-up-guide-with-8-online-demos-and-code/
* https://codetogo.io/how-to-create-date-in-rfc3339-format-in-javascript/
* https://www.geeksforgeeks.org/how-to-remove-arrow-in-dropdown-in-bootstrap

## Images and GIF
*[Flaticons.com](https://www.flaticon.com/authors/linector) 
 Author Name-Linector

* [Cable Car gif](https://www.pinterest.com/pin/387239267958847590/)

* [Freepik Pasta Image](https://www.freepik.com/vectors/food)  : Food vector created by macrovector 

* [Freepik Supermarket Image](https://www.freepik.com/photos/food)  : Food photo created by pressfoto 

* [7 eleven Image](https://commons.wikimedia.org/wiki/File:7-eleven_logo.svg)

* [Andes By astons Image](https://www.facebook.com/ANDESbyAstons/photos/a.1631307650520315/1729928523991560/?type=3&theater)

* [Jewel lounge image](https://www.traveller.com.au/singapore-why-singaporeans-love-their-airport-and-its-new-jewel-h1eauu)
* 
## Youtubers(Channels)
 * Coding Market
* Web Dev Simplified
* Code Tube
* Coding Shiksha
* Dani Krossing
* freeCodeCamp
* Brian design 
* Bedim code

## GITHUB link
https://alanantony24.github.io/ID-Assignment-3/
