# MERN CRUD Generator

The project is a node application that takes json schema as input and generate a MERN CRUD Application as output.The purpose of creating the project is
1. To save developers time generating all the four CRUD functionalities for each Entity.
2. Generate relations between these entities if there are any. 
3. To provide React, Node and Express developers with an easy to read and update code following good conventions. 

## React Project Features
-   For each entity seperate React Components are created for Create,View,Update,delete and list page.
-   For each entity seperate **service** is created for get, put, post and delete calls to the Node Project the
    services uses [axios](https://www.npmjs.com/package/axios) for this purpose.
-   Each Form element/input will have **client side validation** applied using [JOI](https://www.npmjs.com/package/joi) depending upon type of the element that user provides.
-   List Page avoid lengthy pages by providing **pagination**. 
-   Provides **Authentication System** containing 5 functionalties 
    login, logout, register, update password and user inforamtion using their forms.
-   The Navbar will have the name of all the Entities user provided for easy **navigation** b/w all these CRUD's. 
    We used [react-router-dom](https://www.npmjs.com/package/react-router-dom) for ease.
-   Depending upon the name of **theme** provided the UI of the App changes.
-   Responsive Design for both Desktop and mobile size displays.

## Node Project Features
-   For each entity seperate **database models** are created using [Mongoose](https://www.npmjs.com/package/mongoose).
-   For each entity seperate **API Endpoints** are created i.e all [get, put, post and delete] which are accessible
    by authenticated users of generated React Project. These endpoints are created using [express](https://www.npmjs.com/package/express). 
-   For Providing **Authentication System** a User database model and its respective API Endpoints are automatically
    created. The project uses [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for token managment.
-   The project creates respective **database** in MongoDB with a default user which can login.
-   The project also has [nodemon](https://www.npmjs.com/package/nodemon) which helps developers by automatically  
    restarting the application when file changes are detected.

# What Projects can be generated?
1. User can generate a complete MERN CRUD application.This option generate two projects. 
   - **React Project** which contains create, update Forms and a List page having View and delete functionality for each entity. The Project also constains login, signUp and update user information form. check out [React Project Features](https://github.com/UmairAwan128/MERN-CRUD-Generator#react-project-features) for details.
   - **Node project** which contains the database models,Express API endpoints for each entity and also creates the database in MongoDB check out [Node Project Features](https://github.com/UmairAwan128/MERN-CRUD-Generator#node-project-features) for details.
2. User can generate only the Node/Express api CRUD, In this case only node project is generated.  
   - **Node project** which contains the database models,Express API endpoints for each entity and also creates the database in MongoDB check out [Node Project Features](https://github.com/UmairAwan128/MERN-CRUD-Generator#node-project-features) for details.
3. User can generate an empty MERN Application,This option don,t require schema from user and generate two projects. 
   - **React Project** haiving an empty Component along with login, signUp and update user information form.
   - **Node project** which in this case contains only "User" database model and its Express API endpoints and a database in MongoDB.

# While Creating Schema for CRUD Generator keep these thing in mind
- The property "appName" is string type and takes the name of your application that will be generated, the property is optional if user don,t pass "sampleApp" will be the name. 
- The property "appTheme" is enum type and takes the name of the theme the React application, currently we are offering only three themes "dark", "defaultLight", "electricBlue", this property is also optional if not passed the "defaultLight" will be the theme of the application.
- The property "appDbName" is string type and takes the name of the database that will be created for the generated application.
- The property "appSchema" is a required property, It contains two arrays represting the generated application.
1. The first array is the "tables" which contains a collection of objects each representing a table.
   Each object has 
   - "name" property telling the name of the table, this property is required and its type is string and there is a restrication that first letter should be capital.
   - "columns" is of type array each column has three properties.
      1. "name" property is of type string and is required property.
      2. "type" property is of type enum and currently supports the folllowing types "text","number","email","password","date" and is a required property.
      3. "required" is of type boolean it tells either the column is rquired or not and is optional property. 
2. The second array is the "relations" which contains a collection of object, each representing a relation between two tables, each relation object has 4 properties and all are required.
   - Both "firstTable" and "secondTable" properties are of type string and are required property
   - The property "relationType" is of type enum and allows the following set of values "select", "radio", "checkBox","multiselect","oneToMany","manyToMany".
   - The property "secondTableColumn" is also of type string and only allows the name of any column from the table you mentioned in "secondTable" property.    

