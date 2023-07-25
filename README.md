# MTTK low code

## What is it

This project provides a graphical interface to quickly develop a graphical front-end interface and assist with a small amount of code. Most of the open source low code systems are form desgined based, I do NOT think it is valuable for a real project implementation.
Here is a [demo] (http://139.129.210.30:8721/index.html) ,the data will be reset every day. I am sorry for the slow access since the performance of my server is pool.

The documentation/ User manual /Development manul is not ready yet,I will try my best to finish then ASAP.

## Design concept

### Front-end only

This project focuses on front-end only, the back-end logic,for example how to retrieve/save business data from/into database is not covered.  That means you need to write your backend logic and use this tool to present data.
This project has a simple [backend](https://github.com/jamie-mttk/mttk_lowcode_api) which is used to store application, pages, etc.

### Flexible

First it is easy to add new component and JS functions into project to extend more functionalities.
Secind refer to deploy chapter the deployed pages can be shown in low code system directly or to be shown in your own project.
Finally the page design component can also be used in your project instead of using in low code system directly.

### Page widget

Build a page and then convert it as a configurable component, is it cool?

## Quick start

### Projects

The low code system has several projects as listed below.

|Project|Description|
|---|---|
|[Backend](https://github.com/jamie-mttk/mttk_lowcode_api)|Java/Spring boot based project to to provide the APIs used by low code system. The APIs are used to create / Modify / Delete / Query applications / pages / widgets / etc. |
|[UI](https://github.com/jamie-mttk/mttk_lowcode_ui)|Vue3 based project. It is the core of mttk low code system includes page designer and page render components.|
|[Demo]()|Demo how to use deployed pages in your own project with customized layout and menus |
|[Designer demo]()|Demo how to use page designer in your own project|

Tt is recommened to use Eclipse or intelliJ IDEA to edit the first project  and use Visual Studio Code to edit the other projects.
The backend project is compiled into a executable jar and other projects can be compiled into JS/CSS files. JS/CSS files can be deployed into web container,such as Tomcat, or embedded into backend project as static resource directly.

### Deploy

Following the below steps to install

1. Install last mongodb with authorization disabled
   If mongodb is installed on a remote machine or authorization is enabled, you can config in your own application.properties. Refer to spring boot to learn how to do it.
2. Install JRE 1.8
3. Download compiled jar lowcode.jar (low code UI is already inserted as static resources) from [github]()
4. Run 

   ~~~sh
   java -jar lowcode.jar
   ~~~

5. Access at http://localhost:8721/

Compile from source code

1. Clone backend project and open it in Eclipse (Or other IDE)
2. You can modify application.properties if needed (It is recommaned to use a external application.properties instead of modify source code directly)
3. Compile Run as/ Maven Install, backend-xxx-SNAPSHOT.jar will be generated under target folder
4. Run java -jar your_jar_file
5. Clone UI project and open it with Visual Studio Code (Assume you know how to prepare enviroment)
6. Run  command in command console

   ~~~sh
   npm run install  //Download and install required libraries
   npm run dev      //Run in developmet mode
   npm run build    //Compile to CSS/JS
   ~~~

7. 


## License

MIT
