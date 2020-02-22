# Overview
The project is a node application that takes json schema as input and generate a MERN CRUD Application as output.The generated projects has an easy to read and upadte code and following some great conventions.

# What Projects can be generated?
1. User can generate a complete MERN CRUD application.This option generate two projects. 
   - REACT application which contains create,update Forms and List page with View and delete option along with login, signUp and update user information form.
   - Node project which contains the database models,Express API endpoints and also creates the database in MongoDB.
2. User can generate only the Node/Express api CRUD, In this case only one project is generated.  
   - Node project which contains the database models,Express API endpoints and also creates the database in MongoDB.
3. User can generate an empty MERN Application,This option don,t require schema from user and generate two projects. 
   - REACT application haiving an empty Component along with login, signUp and update user information form.
   - Node project which in this case contains only "User" database model and Express API endpoint and a database in MongoDB.

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

