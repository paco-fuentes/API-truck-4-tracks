# truck4tracks API
#### by Paco Fuentes

<img src="./img/prelogo-1.png" align= "center"/>

---

<details>
  <summary>Content 📝</summary>
  <ol>
    <li><a href="#objective">Objective</a></li>
    <li><a href="#about-the-project">About the Project</a></li>
    <li><a href="#deployment-🚀">Deployment</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#database-diagram">Database Diagram</a></li>
    <li><a href="#local-installation">Installation</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#future-features">Future Features</a></li>
    <li><a href="#contributions">Contributions</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

---

## Objective

The goal of this API is to create a network of tables using Node with Express and a relational database with MySQL. It will contain complementary and independent data to later handle complex search fields through user roles on the platform, equipment, and musical styles. Additionally, it will manage a group within another group, as is the case with a playlist integrated into a group. Finally, a real-time chat messaging system will be implemented.

---

## About the Project 🔎

API for CRUD management system for a sound and music social network MVP, emphasizing sound sharing and fostering collaborative composition creation among users. This project represents the culmination of the GeeksHubs Academy fullstack developer bootcamp.

 ---

## Deployment 🚀
<div align="center">
   🚀🚀🚀 <a href="https://despliegue.dkttbnrz8nnws.amplifyapp.com/"><strong>URL to AWS test deploy</strong></a> 🚀🚀🚀
</div>

---

## Stack
Used tech stacks:
<div align="center">
  <a href="https://www.mysql.com/">
    <img src="https://img.shields.io/badge/mysql-3E6E93?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/>
  </a>
  <a href="https://www.expressjs.com/">
    <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js"/>
  </a>
  <a href="https://nodejs.org/es/">
    <img src="https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  </a>
   <a href="https://www.npmjs.com/">
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm"/>
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  </a>
  <a href="https://jwt.io//">
    <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT"/>
  </a>
  <a href="https://www.postman.com/">
    <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman"/>
  </a>
  <br>
  <a href="https://www.npmjs.com/package/nodemon">
    <img src="https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white" alt="Nodemon"/>
  </a>
  <a href="https://typeorm.io/">
    <img src="https://img.shields.io/badge/TypeORM-E83524?style=for-the-badge&logo=typeorm&logoColor=white" alt="TypeORM"/>
  </a>
  <a href="https://www.npmjs.com/package/bcrypt">
    <img src="https://img.shields.io/badge/Bcrypt-2A6063?style=for-the-badge&logo=bcrypt&logoColor=white" alt="Bcrypt"/>
  </a>
  <a href="https://git-scm.com/">
    <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git"/>
  </a>
</div>

---

## Database Diagram
<img src="./img/db-diagram.png" align= "center"/>

---

## Local Installation
1. Clone the repository and run the following command to install the necessary dependencies:
```$ npm install```
2. Connect your repository to the database by following the instructions in the env.example file, where the JWT key is also stored.
3. Run migrations:
``` $ npx typeorm-ts-node-commonjs migration:run -d ./src/db.ts ``` 
4. Run developer:
``` $ npm run dev ``` 
5. Execute the endpoints using Postman with the included http-tattoo-studio.postman_collection.json in the "./http" directory.
7. You can also compile to JavaScript and run the project with the following commands:
 ``` $ npm run build ```
 ``` $ npm run start ```

---

## Endpoints
<details>
<summary>Endpoints</summary>



### Test API connection

GET
healthyCatCheck
http://localhost:4000/api/healthycat



### User

POST
register
http://localhost:4000/api/user/register


    Body
    raw (json)
    json
    {
        "activity_id": 1,
        "username": "simon",
        "email": "simon@simon.com",
        "password": "Pass1234&"
    }
POST
login
http://localhost:4000/api/user/login


    Body
    raw (json)
    json
    {
        "email": "simon@simon.com",
        "password": "Pass1234&"
    }
POST
login_paco
http://localhost:4000/api/user/login



GET
profile
http://localhost:4000/api/user/profile


    Authorization
    Bearer Token
    Token
    <token>
PUT
updateProfile
http://localhost:4000/api/user/profile


    Authorization
    Bearer Token
    Token
    <token>
    Body
    raw (json)
    json
    {
        "activity_id": 2,
        "username": "simon",
        "email": "simon@simon.com",
        "password": "Pass1234&",
        "img_url": "'default'",
        "is_active":"false"
    }
POST
register_paco
http://localhost:4000/api/user/register
﻿

    Body
    raw (json)
    json
    {
        "activity_id": 1,
        "username": "paco",
        "email": "paco@paco.com",
        "password": "Pass1234&"
    }
POST
joinBand
http://localhost:4000/api/user/joinband


    Authorization
    Bearer Token
    Token
    <token>
    Body
    raw (json)
    json
    {
        "band_id": 1
    }
POST
leaveBand
http://localhost:4000/api/user/leaveband


    Authorization
    Bearer Token
    Token
    <token>
    Body
    raw (json)
    json
    {
        "band_id": 1
    }
    Band


POST
registerBand
http://localhost:4000/api/band/register


    Authorization
    Bearer Token
    Token
    <token>
    Body
    raw (json)
    json
    {
        "band_name": "Los Simones",
        "about": "Somos una banda de valencia compuesta por simones"
    }
GET
getBandByAuthTokenId
http://localhost:4000/api/band/myband


    Authorization
    Bearer Token
    Token
    <token>
    Body
    raw (json)
    json
    {
        "band_name": "Los Simones",
        "about": "Somos una banda de valencia compuesta por simones"
    }
GET
allBands
http://localhost:4000/api/band/all


GET
selectedBand
http://localhost:4000/api/band/selected


    Body
    raw (json)
    json
    {
        "band_id": 1
    }
GET
getBandById
http://localhost:4000/api/band/1


GET
isBandMamber
http://localhost:4000/api/user/ismember/1


    Authorization
    Bearer Token
    Token
    <token>
GET
getMembersByParamsBandPage
http://localhost:4000/api/user/bandmembers/1


    Authorization
    Bearer Token
    Token
    <token>
POST
kickBandMamberAsLeader
http://localhost:4000/api/user/kickmember


    Authorization
    Bearer Token
    Token
    <token>
    Body
    raw (json)
    json
    {
        "band_id": 1,
        "user_id": 4
    }

### Message


POST
postMessage
http://localhost:4000/api/messages/band/1


    Authorization
    Bearer Token
    Token
    <token>
    Body
    raw (json)
    json
    {
        "message": "y este el segundo : ) "
    }
GET
getAllBandMessages
http://localhost:4000/api/messages/band/1


    Authorization
    Bearer Token
    Token
    <token>
    Body
    raw (json)
    json
    {
        "message": "y este el segundo : ) "
    }
PUT
updateMessage
http://localhost:4000/api/messages/band/1


    Authorization
    Bearer Token
    Token
    <token>
    Body
    raw (json)
    json
    {
        "message_id": 2,
        "message": "y este el segundo : ) editadoooo "
    }
DELETE
deleteMessage
http://localhost:4000/api/messages/band/1


    Authorization
    Bearer Token
    Token
    <token>
    Body
    raw (json)
    json
    {
        "message_id": 2
    }

### Admin


POST
adminLogin
http://localhost:4000/api/user/login


    Body
    raw (json)
    json
    {
        "email": "admin@admin.com",
        "password": "Pass1234&"
    }
GET
getAllusers
http://localhost:4000/api/admin/allusers


DELETE
deleteUserByBodyId
http://localhost:4000/api/admin/usertoremove


    Authorization
    Bearer Token
    Token
    <token>
    Body
    raw (json)
    json
    {
        "id": 22
    }

### Multitrack


POST
loginSara
http://localhost:4000/api/user/login


    Body
    raw (json)
    json
    {
        "email": "sara@sara.com",
        "password": "Pass1234&"
    }
POST
createMultitrack
http://localhost:4000/api/multitrack/create


POST
loadTrack
http://localhost:4000/api/multitrack/loadtrack/1111


    Authorization
    Bearer Token
    Token
    <token>
    Body
    raw (json)
    View More
    json
    {
        "id": 8,
        "track_name": "Una canción que hice",
        "img_url": "https://img.freepik.com/premium-vector/vinyl-record-disc-hand-drawn-engraving-style-sketch-vector-illustration_666729-557.jpg",
        "track_url": "https://actions.google.com/sounds/v1/science_fiction/alien_beam.ogg?hl=es-419"
    }


</details>

---

## License

This project is under a MIT license.

## Contact

Paco Fuentes. 2024

<a href = "mailto:pacofuentes.work@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/paco-fuentes-805a40290/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</p>
