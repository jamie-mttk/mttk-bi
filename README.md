# MTTK low code

## What is it

This project can easily and quickly to build a vue 3 based UI and assist with a small amount of code.  The target of this project is to quickly develop a data presentation project ,such as report, daigram, etc. although it can build a really complex system.
Here is a [demo](http://139.129.210.30:8721/index.html)  ,the data will be reset every day. I am sorry for the slow access since the performance of my server is pool. Please try to refresh if load failed.

## Screen captures

![Main screen](https://github.com/jamie-mttk/mttk_lowcode_ui/blob/master/src/screenCaptures/main.png)
![Page widget](https://github.com/jamie-mttk/mttk_lowcode_ui/blob/master/src/screenCaptures/pageWidget.png)
![Page widget wizard](https://github.com/jamie-mttk/mttk_lowcode_ui/blob/master/src/screenCaptures/pageWidget_wizard.png)
![App](https://github.com/jamie-mttk/mttk_lowcode_ui/blob/master/src/screenCaptures/app.png)
![Designer](https://github.com/jamie-mttk/mttk_lowcode_ui/blob/master/src/screenCaptures/designer.png)
![Larunch](https://github.com/jamie-mttk/mttk_lowcode_ui/blob/master/src/screenCaptures/launch.png)

## Manuals

The documentation/ User manual /Development manul is not ready yet,I will try my best to finish then ASAP.
|Document|Description|
|---|---|
|[User manual](https://github.com/jamie-mttk/mttk_lowcode_ui/blob/master/UserManual.md)|Basic usage manual, no coding included|
|[Developer manual](https://github.com/jamie-mttk/mttk_lowcode_ui/blob/master/DeveloperManual.md)|Describe coding skills|

## Design concept

### Front-end only

This project focuses on front-end only, the back-end logic,for example how to retrieve/save business data from/into database is not covered.  That means you need to write your backend logic and use this tool to present data.
This project has a simple [backend](https://github.com/jamie-mttk/mttk_lowcode_api) which is used to store application, pages, etc.

### Flexible

First it is easy to add new component and JS functions into project to extend functionalities. The build-in components include [Element Plus](https://github.com/element-plus/element-plus) and [Echarts](echarts.apache.org/), but you can more component libarary or user defined component in your own project. Refer to project mttk-lowcode-designer.
Second refer to deploy chapter the deployed pages can be shown in low code system directly or to be shown in your own project to have a special layout/menu. Refer to project vueWrapperDemo. 
Finally the page design component can also be used in your project instead of using in low code system directly. Refer to project mttk-lowcode-designer.

### Page widget

Build a page and then convert it as a configurable component!

## Quick start

### Projects

The low code system has several projects as listed below.

|Project|Description|
|---|---|
|[Backend](https://github.com/jamie-mttk/mttk_lowcode_api)|Java/Spring boot based project to to provide the APIs used by low code system. The APIs are used to create / Modify / Delete / Query applications / pages / widgets / etc. |
|[UI](https://github.com/jamie-mttk/mttk_lowcode_ui)|Vue3 based project. It is the core of mttk low code system includes page designer and page render components.|
|[Demo](https://github.com/jamie-mttk/mttk-lowcode-demo)|Demo how to use deployed pages in your own project with customized layout and menus |
|[Designer demo](https://github.com/jamie-mttk/mttk_lowcode_designer)|Demo how to use page designer in your own project|

It is recommened to use Eclipse or intelliJ IDEA to edit the first project  and use Visual Studio Code to edit the other projects.
The backend project is compiled into a executable jar and other projects can be compiled into JS/CSS files. JS/CSS files can be deployed into web container,such as Tomcat, or embedded into backend project as static resource.

### Deploy

Following the below steps to install

1. Install mongodb with authorization disabled
   If mongodb is installed on a remote machine or authorization is enabled, you should config in your own application.properties. Refer to spring boot to learn how to do it.
2. Install JRE 1.8
3. Download compiled jar lowcode.jar (low code UI is already inserted as static resources) from [github](https://github.com/jamie-mttk/mttk_lowcode_api/blob/main/lowcode.jar)
4. Run 

   ~~~sh
   java -jar lowcode.jar
   ~~~

5. Access at http://localhost:8721/

Compile from source code

1. Clone backend project and open it in Eclipse (Or other IDE)
2. You can modify application.properties if needed (It is recommaned to use a external application.properties instead of modify source code directly)
3. Compile "Run as/ Maven Install", backend-1.0.jar will be generated under target folder
4. Run java -jar your_jar_file
5. Clone UI project and open it with Visual Studio Code (Assume you know how to prepare enviroment)
6. Run  commands in console

   ~~~sh
   npm run install  //Download and install required libraries
   npm run dev      //Run in developmet mode
   npm run build    //Compile to CSS/JS(package only, normally use to publish to repository)
   npm run build-test    //Compile to CSS/JS, include index.html
   ~~~

7. You can copy the compile result of npm run build-test to the resource/static folder of backend project

## Others

### Security

So far there is no build-in security control.  Security control may be considered later.

### Backend API

Backend API development may be implemented later.

## License

MIT
