# MERN CRUD Generator
The project is a node application that takes json schema as input and generate a MERN CRUD Application as output. The generated application contains React crud app, Node crud app with Express Api's and corresponding database in mongodb. The purpose of creating the project is
1. To save developers time generating all the four CRUD functionalities for each Entity.
2. Generate relations between these entities if there are any. 
3. To provide React, Node and Express developers with an easy to read and update code following good conventions. 

# Quick Start
To generate your MERN CRUD App the only thing you need is a json schema file in a specific format, a sample schema  having all the feature used is here [Sample Schema File](https://www.npmjs.com/package/mern-crud-generator#sample-schema-file), you just need to run this command.
```sh
npx mern-crud-generator
```
This command shows a list of options asking for the kind of project you want to generate each of these is explained here [What Projects can be generated](https://www.npmjs.com/package/mern-crud-generator#what-projects-can-be-generated), you just need to run this command.
Once you have generated your project the only thing you need is navigate to both React and Node project and run the following command,
```sh
npm install
```
This command will connect to npm and install the required dependency packages, once the packages are installed run the following command to start your application.
```sh
npm start
```
Or Just **watch this short video** to quickly generate your first CRUD app here, [Quickest way to use MERN CRUD Generator](https://youtu.be/i2ga0nGQFOE).

## What Projects can be generated?
1. User can generate a complete MERN CRUD application.This option generate two projects. 
   - **React Project** which contains create, update Forms and a List page having View and delete functionality for each entity. The Project also constains login, signUp and update user information form. check out [React Project Features](https://www.npmjs.com/package/mern-crud-generator#react-project-features) for details.
   - **Node project** which contains the database models,Express API endpoints for each entity and also creates the database in MongoDB check out [Node Project Features](https://www.npmjs.com/package/mern-crud-generator#node-project-features) for details.
2. User can generate only the Node/Express api CRUD, In this case only node project is generated.  
   - **Node project** which contains the database models,Express API endpoints for each entity and also creates the database in MongoDB check out [Node Project Features](https://www.npmjs.com/package/mern-crud-generator#node-project-features) for details.
3. User can generate an empty MERN Application,This option don,t require schema from user and generate two projects. 
   - **React Project** haiving an empty Component along with login, signUp and update user information form.
   - **Node project** which in this case contains only "User" database model and its Express API endpoints and a database in MongoDB.

## Creating Schema for CRUD Generator input
   To successfully generate a MERN CRUD Application the only thing you need is to create a JSON file having the following set of properties. Every thing you need to know about these properties is defined in following table and also an image is below for ease.

| property name   | type      | info                                                                             |            | default value  
| --------------- | --------- | -------------------------------------------------------------------------------- | ---------- | ------------- |
|**appName**      |**string** | Its value will be used as the name of application generated.                     | optional   | `sampleApp`   |
|**appTheme**     | **enum**  | Its value  is used to decide the theme of the generated React application.       | optional   | `defaultLight`|
|                 |           | Its value can be `dark`, `defaultLight`, `electricBlue`.                         |            |               |
|**appDbName**    |**string** | Its value will be used as the name of the database created for generated project.| optional   | `sampleDB`    |
|                 |           | If its not passed but `appName` is passed then DB name will also be its value.   |            |               |
|**appSchema**    |**object** | It has two arrays representing the app to generate `tables`,`relations`.         | required   |               |
| **tables**      | **array** | It contains a collection of objects each representing an entity.                 | required   |               |
|                 |           | Each contains two properties `name` and `columns` representing its structure.    |            |               |
|  **name**       |**string** | Its value will be the name of the entity but there is a restrication that,       | required   |               |
|                 |           | the first letter of the string should be capital.                                |            |               |
|  **columns**    |**array**  | It contains a collection of objects each representing a property of an entity.   | required   |               |
|                 |           | It has three properties `name`, `type` and `required`.                           |            |               |
|   **name**      |**string** | It is the name property of columns array the first one was name for the entity.  | required   |               |
|                 |           | Its value will be used as name of the specific property of entity.               |            |               |
|   **type**      | **enum**  | Its value will be used as the type of the specific property of entity.           | required   |               |
|                 |           | Its value can be either `text`,`number`,`email`,`password`,`date`.               |            |               |
|   **required**  |**boolean**| Its value will be used to tell either the specific property of entity is required| optional   | `false`       |
|                 |           | Its value can be either `true`,`false`.                                          |            |               |
| **relations**   |**array**  | It contains a collection of objects each representing a relation b/w two entities| optional   |               |
|                 |           | It has four properties,                                                          |            |               |
|                 |           | `firstTable`, `secondTable`, `relationType`, `secondTableColumn`.                |            |               |
|**firstTable**   |**string** | Its value should be same as `name` of any entity we defined in `tables` property | required   |               |
|**secondTable**  |**string** | Its value should be same as `name` of any entity we defined in `tables` property | required   |               |
|                 |           | or it can also be `User` which is a builtin entity that is automatically created.|            |               |
|                 |           | so relation will be created b/w entities mentioned in firstTable and secondTable.|            |               |
|**relationType** | **enum**  | Its value will be used to tell the type of the relation b/w the two entities,    | required   |               |
|                 |           | we defined  in `firstTable` and `secondTable`. Its value can be either           |            |               |
|                 |           | `select`, `radio`, `checkBox`,`multiselect`,`oneToMany`,`manyToMany`.            |            |               |
|                 |           | for details regarding each type checkout [Realtions Supported](https://www.npmjs.com/package/mern-crud-generator#relations-between-entities).            |            |               |
|secondTableColumn|**string** | Its value should be same as `name` property value from `columns` array of the    | required   |               |
|                 |           | respective entity mentioned in `secondTable`, [Where its used?](https://www.npmjs.com/package/mern-crud-generator#relation-types-supported).  |            |               |

A complete structure and properties the schema needs is also explained here for quick understanding. 
 <img src="https://lh3.googleusercontent.com/NrBpQCqx_noHuRGrq7QDMnJlCdBG59am410TrAziiyqwE8An2woA0Rgvu89F5QcxlNRhc3AA-U1xHLX_GgRi1Pg_ISn2LBI11huMJt6CcM3ZGkCRPM0jQIvmx25AQZraJH0l0lDQ8VymFxJ5Gp8a_UqkzRkZwK66HtdtbqVG6X17qdsjJ3KJpKGb69V0PjBn6dzg2EKIoauCQ_ypNDIOoNbDnzdgQu2Cu4PgfI-R6qbdcwTVuB4rKkQICzHytb0oRUyiRP_rJKi5i0cF1hOyueujWTM2ZsYt3jOOkc_0JgKF-zQ9nteLjrNfPgJoVwn5pHlxvU1NuRJ_3DpP7im7nAJPMWWEC6a1ksQGLY5D7REbetPfX7j5HnD_gx7RRQy4iabx1-56i7RwvzaiBUjl3qIPCDs-l1hE4tkYz5KThT1DRQ12LgXXm5b8t4YfCj4KJsCS0lRFMU1GxPeAezrI_tHnfj3CoX-rxZZgExZlsaMQaOBSV6oxN1RvIY1yRzks588M0c101ZVnr6HuAH9dURiKwKobw_F0CuTfusdY0IBPjNiyd4L2hM4ubk-HFWlKxJ1-kUA1tfzvWjjWdcL0A19naP9vGPL4CjKmRLNjdUerdccdjSwsgbpiMv34Jx6IkkrOAg3uB_o4YIgioLGGYJE1sDpq1mkJq5RyP_puire8MIxkJlYRVgW_2XAXZXMGHPP808JmYXG6VLch5_dY56-9cCH3_mG1jJsr1-vqP6-vti8=w1259-h654-no" alt="SchemaIllustration.png" >

## Relations Between Entities
A realtion b/w two entities is created using 4 properties `firstTable`, `secondTable`, `relationType`, `secondTableColumn`, to understand how a relation is created lets take an example say we have two entities `product` and `category` and we want to create a relation of type `select` 
between them.
 - The `product` has two properties `prodName` and `price`.
 - The `category` has two properties `catName` and `type`.
If a relation object has these values `firstTable`="product", `secondTable`="category", `relationType`="select", `secondTableColumn`="catName".
This means in the `product` create form there will be a `category` select/dropdown and that dropdown will have the data of the `catName` property of the `category` entity.

 <img src="https://lh3.googleusercontent.com/89fGyafNqy6uL7qTZux-a1kO8ks31d7c0EoCuX-oztd0VaSLrJUkMvjjitS_C1LQp54t_6yxb-sk_ycOEiNWOuly6Z2wNUJyFlkCcfd-UHSsNUVmcTFDFKWvI_ZXfZc5Mg76_FW3qL2f2yUJGv8pH96KRAXE7JaR7_vO25jyi2h9kjURrqYyBWrNQ6tE9l3b335rASMIDkcD-jSVv5St4rv5vE4AZfjDkxTegNEPk9-TjVDvaYd5g5EeYWQo8CjZpHvVQXX4eV94xRndfzYWtdVV8kdzDvEbeeSirHMLPSg6TgHDLLkejKgcCTsuq8j2YNnZ9BZBJ51NvD2BMFAUJt48W_8fv5z1AmSk_SpCXZn2GfJQYYUIdsEuRfU0K7TsLve7LMeDedSrz_B_R4nI9jMT3h_vaKacGZuqaSzWt8S9Z_BlNva8npfwp8QoUahxi5VUpsuPEwLJDMJ3216dnI3CqLUWdOEAFjQSXfeajoNHxoqDd8QmZlkjcuble33SXBbkqqqqPph3C9yHcxbIVJQqsjYOs9aRy6pGA-xoFnjpWssiq1AGOzRU7qbkxXyXfgtxSl3aVKw3qhP1g8BDnc8Cvz9nw8-D2_AyXRN1iGlPClCQyqukfIByPlU_x_mJFBZNpr0FB8MI3HZpbYt7l0JMxZVnRWWrvlmRNKuh_Br6NzUqvIleqUcz4LuAc92lqdRisyJpjKH3_17SlndGrygrGl7ReKgHob3BgH1pOof8aPw=w1164-h654-no" width="360" alt="prodSelectShow.png">
 <img src="https://lh3.googleusercontent.com/eGZRR2-j7-8nmP5tangFKECWISFJSwkUwQfPs3df8D78iaRAMVWhoulb6ez-1FStVVrL9vVB-Un29114siQUHSr63e42AawMtaOTEfCZNzByrz8OdMo9zSG1vOS85QNz1MzwHyKmAiO183y1muuYe9OXDZA7t3_duCEAmoG_dcSEarqzB5_Dk9jYn7z7wQ1OUjH3ntePqHUFEOYhVbtF9WoUDaVUj2_PPYRo9OsR1fVwxJWpw-AJtvLg9JI8gd6mWmgDL1HbxEXOgekJXjLF0TTY9MhvvQxfjt_PfVPcl7K9zzDtW4Rw31qBUVHYyqJ3tjIA2cgMvLEyZ9JBhtrvlxQedZUL9uKCKglqOv53292Z4qYk5BJpVxdyukQ4lj0WULz4PiyCXK-rlzRarvd7Iipkpi8nMhgoY9RKhuUZVX9u4uTcFlDpEoqkfb996rxTsyR-MLSZsIiGNn1dYe1w3p8iRfdZZaIOy-UDSJkIYDGn9Sv2aYZ6UkaBPlXaKrXefIrw2zLxPF0AO_bgow82iRevwqEwjNLAY72tfX8_USulCYZ7UWcj9msvuvVN5z7J1vz3cqo0wuvVBMX81C3aFKzDb8aUxnh3-1ynRiuFcnF2HbAn5vBe4JZvdBG_NE-4RX7JVbC8xg8dGxq3u85Muxq3weEBmQP8m27MXgD6Ys_y92JaAOL_z5auhStZ43FKrEwMLGTMCkSMyd33OllhmG6HYn3Qp5cP1Uyw4xjPUOUZjrk=w1164-h654-no" hspace="20" width="360" alt="catList.png">

## Relation Types Supported
Currently CRUD Generator supports the following relation types.

| relationType    |  info                                                                               |
| --------------- | ----------------------------------------------------------------------------------- |
| **select**      | creates a select/dropdown representing a one to many relation b/w the entities      |
| **radio**       | creates a radio buttons representing a one to many relation b/w the entities        |
| **checkBox**    | creates checkboxes representing a many to many relation b/w the entities            |
| **multiselect** | creates a multiSelect/dropdown representing a many to many relation b/w the entities|
| **oneToMany**   | creates a select/dropdown representing                                              |
| **manyToMany**  | creates a multiSelect/dropdown representing                                         | 


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

## Dealing with Errors

To generate your CRUD app the only thing you need is a json schema file in a specific format but if the provided schema file has not valid format or schema does not follow the rules then on runtime all those errors are wrote to a file named **errors.txt** and this file will be placed where you wanted your CRUD app to be generated. So here we have disscussed about some of the most common errors and these errors are explained in such a way that they will help you in understanding any other errors that may generate.
-  `instance.appTheme is not one of enum values: dark,defaultLight,electricBlue`, here `instance.appTheme` means first `instance` means your schema file and `appTheme` is the property of schema, and the complete error statement is telling that the appTheme is an enum type property and allows only following set of value use any of these `dark,defaultLight,electricBlue`.
-  `instance.appSchema.tables[2].name does not match pattern "^[A-Z][a-zA-Z]*$"`, here `instance.appSchema` means first `instance` means your schema file and `appSchema` is the property of schema, and the complete error statement means inside the `appSchema` we have and `tables` array
and `tables[2].name` means on the second object of tables array there is a `name` property which has the error, the error is telling that `name` property value should be a string whose first letter should be capital.
-  `instance.appSchema.tables[5].columns[1].required is not of a type(s) boolean`, here `instance.appSchema` means first `instance` means your schema file and `appSchema` is the property of schema, and the complete error statement means inside the `appSchema` we have and `tables` array
and `tables[5].columns[1].required` means on the fifth object of tables array there is a `columns` array whose first index has the `required` property which has the error, the error is telling that `required` property supports type `boolean` and its value can be either `true` or `false`. 
-  `invalid table name used on firstTable of instance.appSchema.relations[3], please specify name of table that you provided in scheema `, here `instance.appSchema` means first `instance` means your schema file and `appSchema` is the property of schema, and the complete error statement means inside the `appSchema` we have and `relations` array and `firstTable of relations[3]` means on the third object of relations array there is a `firstTable` property which has the error, the error is telling that `firstTable` property value should be same as the `name` property of any of the `tables` array object of respective schema.
-  `There can only be one relation between two tables, relation between Order and Product are defined twice on instance.appSchema.relations[3] and instance.appSchema.relations[4]` means first `instance` means your schema file and `appSchema` is the property of schema, and the complete error statement means inside the `appSchema` we have and `relations` array and `relations[n]` means a specific object of relations array and the error statement is telling that two relation object have same `firstTable` and `secondTable` value but have different `relationType` property value means you are trying to create multiple relations b/w two entities and it is not possible remove any of them to resole error.
-  `invalid column name used in secondTableColumn on instance.appSchema.relations[3], please specify name of column that exist in Product scheema .`, here `instance.appSchema` means first `instance` means your schema file and `appSchema` is the property of schema, and the complete error statement means inside the `appSchema` we have and `relations` array and `firstTable of relations[3]` means on the third object of relations array there is a `secondTableColumn` property which has the error, the error is telling that `secondTableColumn` property value should be same as the `name` property of any of the `columns` array object of respective table you mentioned in the `secondTable` property. 

## Sample Schema File

   The following is a sample schema for an Ecommerace Application and it uses all datatypes,relations and fearures supported.
```json
{
    "appName": "Ecomerace",
    "appTheme": "dark",
    "appDbName": "EcomeraceDb",
    "appSchema": {
        "tables": [
            {
                "name": "Product",
                "columns": [
                    {
                        "name": "ProdName",
                        "type": "text",
                        "required": true
                    },
                    {
                        "name": "Price",
                        "type": "number",
                        "required": true
                    }
                    
                ]
            },
            {
                "name": "Category",
                "columns": [
                    {
                        "name": "CatName",
                        "type": "text",
                        "required": true
                    },
                    {
                        "name": "Type",
                        "type": "text",
                        "required": false
                    }
                ]
            },
            {
                "name": "Order",
                "columns": [
                    {
                        "name": "OrderName",
                        "type": "text",
                        "required": true
                    },
                    {
                        "name": "OrderDate",
                        "type": "date",
                        "required": true
                    }
                ]
            },
            {
                "name": "Status",
                "columns": [
                    {
                        "name": "StatName",
                        "type": "text",
                        "required": true
                    }
                ]
            },
            {
                "name": "Customer",
                "columns": [
                    {
                        "name": "Name",
                        "type": "text",
                        "required": true
                    },
                    {
                        "name": "Email",
                        "type": "email"
                    },
                    {
                        "name": "Password",
                        "type": "password"
                    },
                    {
                        "name": "Phone",
                        "type": "number",
                        "required": true
                    }
                ]
            },
            {
                "name": "Suplier",
                "columns": [
                    {
                        "name": "Name",
                        "type": "text",
                        "required": true
                    },
                    {
                        "name": "Phone",
                        "type": "number",
                        "required": true
                    }
                ]
            }
        ],
        "relations": [
            {
                "firstTable": "Product",
                "secondTable": "Category",
                "relationType": "oneToMany",
                "secondTableColumn": "CatName"
            },
            {
                "firstTable": "Order",
                "secondTable": "User",
                "relationType": "select",
                "secondTableColumn": "email"
            },
            {
                "firstTable": "Order",
                "secondTable": "Status",
                "relationType": "radio",
                "secondTableColumn": "StatName"
            },
            {
                "firstTable": "Order",
                "secondTable": "Product",
                "relationType": "checkBox",
                "secondTableColumn": "ProdName"
            },
            {
                "firstTable": "Customer",
                "secondTable": "Order",
                "relationType": "manyToMany",
                "secondTableColumn": "OrderName"
            },
            {
                "firstTable": "Suplier",
                "secondTable": "Product",
                "relationType": "multiselect",
                "secondTableColumn": "ProdName"
            }
        ]
    }
}
```