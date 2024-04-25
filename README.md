# MTTK Open BI

## About this project

### Brief

A user-friendly lightweight BI tool.

A live demo is  is avaibale at [http://139.129.210.30:8825](http://139.129.210.30:8825)

User name: admin 

Password : 123456

Please DO NOT CHANGE THE PASSWORD and the data will be reset every day.
And since the server performance is pool it is a little slow to access especially the first time since some JS should be download.

### Documents

|Document|Description|
|---|---|
|README|This file|
|[User manual](https://github.com/jamie-mttk/mttk-bi/blob/master/UserManual.md)| How to use MTTK Open BI|
|[Developer manual](https://github.com/jamie-mttk/mttk-bi/blob/master/DeveloperManual.md)|How to develop new plugin|
|[Release Note](https://github.com/jamie-mttk/mttk-bi/blob/master/ReleaseNote.md)|Change history|

## Screen captures

![Login](https://github.com/jamie-mttk/mttk-lowcode-designer/blob/master/src/screenCaptures/login.png)
![App list](https://github.com/jamie-mttk/mttk-lowcode-designer/blob/master/src/screenCaptures/app_list.png)
![Launch](https://github.com/jamie-mttk/mttk-lowcode-designer/blob/master/src/screenCaptures/launch.png)
![Data model](https://github.com/jamie-mttk/mttk-lowcode-designer/blob/master/src/screenCaptures/data_model.png)
![Design](https://github.com/jamie-mttk/mttk-lowcode-designer/blob/master/src/screenCaptures/design.png)
![Page design](https://github.com/jamie-mttk/mttk-lowcode-designer/blob/master/src/screenCaptures/single_page.png)

### Project list

There are serveral projects related to MTTK Open BI as described below

|Project|Description|
|---|---|
|[mttk-lowcode-server](https://github.com/jamie-mttk/mttk-lowcode-server) | A spring boot project with the compiled result of mttk-lowcode-designer as static resource. It is both lowcode engine backend and BI backend as well|
|[mttk-lowcode-engine](https://github.com/jamie-mttk/mttk-lowcode-engine) | Lowcode engine front-end, the compiled result is a JS package named 'mttk-lowcode-engine'.|
|[mttk-vue-wrap](https://github.com/jamie-mttk/mttk-vue-wrap) | The foundation technology of lowcode engine.|
|[mttk-bi](https://github.com/jamie-mttk/mttk-bi) | A set of lowcode plugins to implement a lightweight BI. The compiled result is a JS package named 'mttk-bi'.|
|[mttk-lowcode-designer](https://github.com/jamie-mttk/mttk-lowcode-designer) |A project combined mttk-lowcode-engine and mttk-bi, the compiled result is an index.html +JS/CSS which can be lauched|

## Features

### Easy to use

All operations are achieved through drag and drop on the webpage. The operation of creating a chart is also simple and intuitive, and online help is also available.

### Scalability

The MTTK Open BI is based on [MTTK Lowcode Engine] (https://github.com/jamie-mttk/mttk_lowcode_engine). On the otherword ,BI is a set of plugins of MTTK lowcode engine.

So it is easy to extend the BI functionalities by building your own plugins,such as new component to present data.
How to build a new plugin is described in developer manual (Not finished yet)

### Authorization control

A full authorization control is built based on the concept of resource/owner/owner group/role. Refer to user manual for more detail.


## Design concept

First, it is a lightweight BI which does not offer a data processing engine.  Refer to architecture chapter of user manual.
Second, easy to use. For example ,to build an echart need to provide many many configurtaions/options, such as title location, grid position,etc. To simplified the usage only the important options should be configured by user with default setting, other options are set by BI system automatically.

## Installation

1. Install mongodb
    Skip this step if alreay installed
    Download mongodb from [MongoDB official site](https://www.mongodb.com/)
    The min version required is 4.2, the last version is recommended to use.
    Install mongodb.
2. Install last version of Java (Min version 20)
3. Download lowcode.jar from [Here](https://github.com/jamie-mttk/mttk_lowcode_api/blob/main/lowcode.jar)
    This jar includes all the necessary JS/CSS/HTML as static resouce.
4. Start
   Run command below ,replace %xxx% to correct path
   %your java path%/bin/java -jar %your lowcode jar path%/lowcode.jar
   Defautly the lowcode.jar will connect to local mongodb:27017 without authorization. Admin account and other configuration will automatiaclly be created in mongodb.
   If the mongodb is not at local machine or authorization is enabled, you need to create your own application.properties and then start with spring boot command parameter --spring.config.location
   By the way the backend is not well defined and will be optimzied later.
   Below is a template of application.properties

```sh
#Web server port
server.port=8825

#Database
spring.data.mongodb.uri=mongodb://localhost:27017
spring.data.mongodb.database=mttk_bi

#
spring.servlet.multipart.enabled=false
```

5. Finish
  Access URL  http://localhost:8825/ with username: admin and password: 123456

## How to use

Refer to [User manual](https://github.com/jamie-mttk/mttk-bi/blob/master/UserManual.md)