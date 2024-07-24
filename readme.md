<a name="readme-top"></a>

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/paoloCammardella/Hive_Mind_backend.git">
    <img src="src/images/logo.svg" alt="Logo" width="300" height="300">
  </a>

<h3 align="center">Hive Mind</h3>

  <p align="center">
    Hive mind is a social media where you can feel free to share your idea and let other people vote for it. Will people agree with it or will they totaly disagree?
    <br />
    <a href="https://github.com/paoloCammardella/Hive_Mind_backend.git"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/paoloCammardella/Hive_Mind_backend.git">View Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This is a universitary project developed for the _Web Technologies_ course. The goal of this project was to prove we learned all the basic concept about web development including testing and security.

### Built With

- [![JWT][JWT]][JWT-url]
- [![Express][ExpressJS]][ExpressJS-url]
- [![NODEJS][NODEJS]][NODEJS-url]
- [![MongoDB][MongoDB]][MongoDB-url]
- [![Swagger][Swagger]][Swagger-url]
- [![Angular][Angular.io]][Angular-url]
- [![TypeScript][TypeScript]][TypeScript-url]
- [![Docker][Docker]][Docker-url]
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

#### (Ubuntu)

- First of all install _git_ on your machine:
  ```sh
  sudo apt-get install git.
  ```
- Install Docker (you can follow <a href="https://docs.docker.com/engine/install/ubuntu/">the official guide</a>) and run mongoDB

  ```
  docker pull mongo:latest

  docker run -d \
    -e MONGO_INITDB_ROOT_USERNAME=<YOUR_USERNAME> \
    -e MONGO_INITDB_ROOT_PASSWORD=<YOUR_PASSWORD> \
    -p 27017:27017 \
    --name <YOUR_MONGO_CONTAINER> \
    mongo:latest
  ```

- Install _NodeJS_ and npm (you can follow <a href="https://monovm.com/blog/install-npm-on-ubuntu/#Install-Node.js-and-npm-from-the-Ubuntu">this link</a>).

### Installation

#### Back-End

1. Clone the repo
   ```sh
   git clone https://github.com/paoloCammardella/Hive_Mind_backend.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

#### Front-End

1. Clone the repo
   ```sh
   git clone https://github.com/paoloCammardella/Hive_Mind_frontend.git
   ```
2. Install the necessary modules
   ```sh
   npm install
   ```

#### N.B.

Make sure to use the .env.template and replace every field with your values.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

To start the project you can run the following commands:
### Back-end

  1. 
    npm run build

  2. 

    npm start
### Front-end

  ```
  ng s --o
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Back-End: [Hive Mind back-end](https://github.com/paoloCammardella/Hive_Mind_backend.git)

Front-end: [Hive Mind front-end](https://github.com/paoloCammardella/Hive_Mind_frontend.git)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/paoloCammardella/Hive_Mind.git.svg?style=for-the-badge
[contributors-url]: https://github.com/paoloCammardella/Hive_Mind_backend.git/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/paoloCammardella/Hive_Mind.git.svg?style=for-the-badge
[forks-url]: https://github.com/paoloCammardella/Hive_Mind_backend.git/network/members
[stars-shield]: https://img.shields.io/github/stars/paoloCammardella/Hive_Mind.git.svg?style=for-the-badge
[stars-url]: https://github.com/paoloCammardella/Hive_Mind_backend.git/stargazers
[issues-shield]: https://img.shields.io/github/issues/paoloCammardella/Hive_Mind.git.svg?style=for-the-badge
[issues-url]: https://github.com/paoloCammardella/Hive_Mind_backend.git/issues
[license-shield]: https://img.shields.io/github/license/paoloCammardella/Hive_Mind.git.svg?style=for-the-badge
[license-url]: https://github.com/paoloCammardella/Hive_Mind_backend.git/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/paolocammardella
[product-screenshot]: images/screenshot.png

<!-- Tech Stack -->

[ExpressJS]: https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white
[ExpressJS-url]: https://expressjs.com/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[JWT]: https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white
[JWT-url]: https://JWT.io/
[Swagger]: https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white
[Swagger-url]: https://swagger.io/
[NODEJS]: https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[NODEJS-URL]: https://nodejs.org/en
[MongoDB]: https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/it-it
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Docker]: https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
