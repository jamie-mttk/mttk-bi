# MTTK low code Developer Manual

## Preliminary

### Context

Context is a variable to interact between low code system and user script. There are three context with different scope.

|Context|Scrope|
|---|---|
|GlobalContext|Global|
|AppContext|Application|
|PageContext|Page|

#### GlobalContext

As it is shared among all the application, only one instance for each client is created during low code startup.

Below is the method to create a global context

~~~ sh
function createGlobalContext(baseUrl: string = '', vueApp: App,routerInit:Router)
~~~

|Parameter|Description|
|---|---|
|baseUrl|Base URL to create axios requester|
|vueApp|Vue3 app instance, returned by calling createApp|
|routerInit|Vue router 4.x instance, returned by calling createRouter|

It has the following properties/methods. To distinguish between attributes and methods, the method will be followed by parentheses.

|Propertiy/Method|Description|
|---|---|
|request|[axios](https://github.com/axios/axios) instance|
|vueApp|Vue 3 app instance|
|router|Vue router 4.x instance|

#### AppContext

AppContext will create for each application with the below function

~~~ sh
function createAppContext(globalContext: object)
~~~

The only parameter is GlobalContext

|Propertiy/Method|Description|
|---|---|
|app|Vue 3 app instance, wrapped by ref|
|key|A unique string,, wrapped by ref|
|getGlobalContext()|return GlobalContext|
|emitter|[mitt instance](https://github.com/developit/mitt) used to mitt or listen events|
|queryPages()|Return a promise with all the pages of this application|
|loadPage(id)|Load page souce by page id|
|loadPageByName(name)|Load page source by page name|
|loadDeployedMenus()|Load all the deployed menu tree|

#### PageContext

If it is not specially mentioned later, it is called as context. And it is very important in programming in pager designer.

~~~ sh
function createContext(modeInit: string,appContext:object,contextParentInit:object)
~~~

|Parameter|Description|
|---|---|
|modeInit|Init mode, refer to runnning mode chapter|
|appContext|AppContxt instnace|
|contextParentInit|If the page A is opened by another page B, this is the page context of page B|


|Propertiy/Method|Description|
|---|---|
|key|A unique string to identify this page context|
|mode|Runnig mode warpped by ref|
|contextParent| The paramter of contextParentInit,wrapped by ref|
|cp|Shortcut of contextParent|
|repositoryManager|Refer to proper chapter below|
|functionManager|Refer to proper chapter below|
|f|Shortcut of functionManager|
|getAppContext()|Returnn app context|
|emitter| Mitt instance to mitt/subsribe events among page|
|dataManager|Refer to proper chapter below|
|d|Shortchut of dataManager|
|computedManager|Refer to proper chapter below|
|c|Shortcut of computedManager|
|methodManager|Refer to proper chapter below|
|m|Shortcut of methodManager|
|apiManager|Refer to proper chapter below|
|a|Shortcut of apiManager|
|The below items are not recommended to use, low code system internally used only|
|codeManager|Code manager|
|param|Use to transfer data during opening new page|
|choosedManager|Component choosed management|

##### Running mode

|Mode|Description|
|edit|Edit page in page designer, switch to view mode by pressing button "Switch to preview"|
|view|Preview in page designer or present in lauched screen|

#### repositoryManager

Manage the folders and widgets which will be shown in the pallet of page designer.
Refer to the "Build customized component and functions" chapter for more detail.

#### functionManager

Manage the functions. 
Refer to the "Build customized component and functions" chapter for more detail.

#### dataManager

Get/Set the value of data.

|Propertiy/Method|Description|
|---|---|
|getData()|Return the data value, the first paramter is the data key, the second is path(optional.) For example, if data value is {a: b :{c :123]}},the path is a.b.c getData will return 123. If no init data is set, the getData will return a proper value according to data type.|
|g()|Shortcut of getData|
|setData()|Set the data value, the first paramter is the data key, the second is value to set ,the third one is path(optional)|
|s()|Shortcut of setData|
|clearData()|Reset data to init value, the paramter is the data key|
|c()|Shortcut of clearData|

Below are same examples, variable "c" is page context instance.

~~~ sh
//Get the value of data content
c.d.g('content')
//Set the value of data content to 'Hello world'
c.d.s('content',)
~~~


#### computedManager

Get/Reset the computed
|Propertiy/Method|Description|
|---|---|
|get()|Get the computed value, the only parameter is computed key.|
|g()|Shortcut of get|
|reset()|Reset the computed value, so the incoming get() call will evaluate again|

#### methodManager

Call defined method

|Propertiy/Method|Description|
|---|---|
|methodCall()|The first paramter is method indicator, the remainder paramters are method paramters. If the first parameter is a string, it is considered as method key; otherwise, consider it is an object and try to get method key from property method.|
|m()|Shortcut of methodCall|
|scriptCall()|The first parameter is script indicator, and the remainder paramters are script paramters which means they can be referenced directly.If the first parameter is a string, it is considered as script body; otherwise, consider it is an object and try to get script body from property code.|
|s()|Shortcut of scriptCall|
|openPage()|The parameter is a object, refer to the below table|

Open page paramter properties
|Property|Description|
|---|---|
|pageId|The page id to show|
|pageName|The page name to show, the priority of pageId is higher than pageName|
|openPageType|'dialog'/'drawer'|
|param|The parameter tranfer to the page to open, the opened page can retrieve from pageContext.param|
|Others|Other properties will be set the properties of el-dialog/el-drawer depends on openPageType|


#### apiManager

Invoke defined API
|Propertiy/Method|Description|
|---|---|
|invoke|Invoke the API, the parameter is the API key|
|i|Shortcut of invoke|

### Expression

Expression is used to dynamically config properties. it is a string with a special prefix, and the remainder string will be explained accordingly as described in the below table
|Prefix|Remainder string|
|---|---|
|___data:|Explained as the data key|
|___computed:|Explained as the computed ke|
|___script:|Explained as a script, the script eval value will be set to the property|

### Script evaluation

Normally there are two ways of evaluation script. The first one is [eval funciton](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval); the second one is [function constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function)
This project eval script with the second way. Let's say there is a piece of script as below

~~~ sh
const base=100
return x+y+base
~~~

x and y is passed from caller. So the below function will be constructed and called,assume x is assinge to 5 and y is assigned to 6. code is the script above.

~~~ sh
const result=new Function (x,y,code)(5,6)
~~~

### VueWrapper context

VueWrapper is the fundamental technology of this project. Refer to [vueWrapper developer manual](https://github.com/jamie-mttk/vueWrapper/blob/master/MANUAL.md), 

## Coding in page designer

Since the coding is simpl jav script, this chapter will focus the parameters which can be used in script.
Tips: If you don't know the parameters, just use the below script to show 

~~~ sh
console.log(arguments)
~~~

### Computed

|Parameter|Description|
|---|---|
|c|PageContext|

### Method

|Parameter|Description|
|---|---|
|c|PageContext|
|Parameters|And the parameters in method definition|

### Lifecycle

|Parameter|Description|
|---|---|
|c|PageContext|

### Event

|Parameter|Description|
|---|---|
|c|PageContext|
|wrapperContext|WrapperContext|
|argx|x is 1,2,3,4,etc. These are the original event arguments.|

Notice: wrapperContext.props.slotParaStack can get the slotParaStack

## Present pages in your own project

## Using page desiner in your project

## Build customized component and functions

## Build-in functions
