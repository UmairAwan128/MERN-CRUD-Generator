# MERN CRUD Generator
The project is a node application that takes json schema as input and generate a MERN CRUD Application as output. The generated application contains React crud app, Node crud app with Express Api's and corresponding database in mongodb. The purpose of creating the project is
1. To save developers time generating all the four CRUD functionalities for each Entity.
2. Generate relations between these entities if there are any. 
3. To provide React, Node and Express developers with an easy to read and update code following good conventions. 
-  The MERN CRUD Generator Generates a basic CRUD application, if you have some custom requirements for your generated app or you want us to update or generate your application you can [Contact us](https://www.npmjs.com/package/mern-crud-generator#looking-for-some-other-features).

# Quick Start
To generate your MERN CRUD App the only thing you need is a json schema file in a specific format, a sample schema which uses all the features  of MERN CRUD Generator is attached at the bottom of the page here [Sample Schema File](https://www.npmjs.com/package/mern-crud-generator#sample-schema-file), you just need to run this command.
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
 <img src="https://lh3.googleusercontent.com/258qAD60gpVBulJYH3MgYi7mmIAg-LUK61d7iHyRdYeY3fHal12yg5ioAyfNHWPoUcEXwyofRtMn-RMiDS-WASRAErN8cPKrPxl7e4mYbOTOOQaIgs8VxMD5MQrEKdauK6FzcXnQ99DZCYtehv87pepy5_PtYa83O53n56w8gUcH-XWB0RYIVH4ItTIT8hhkLtKS3bxMHdw3dKvvVf3ZCQ4Gkv0W_uq-_FuANARN_doqWTd-cmsSHluUzpIWkKONi5_SI3YuOkXtK_5EU9Yo3EEDBF0eQEMvp1U3pY6OjGsaaUv-z4PsTLX1Zk1E6dW6te0kbGtVBsGbNw8mdCE-557Y6p02UlRPK7ynXS7O0Tz7Lu_-RzE0zUdpwD4mnJdoAHnuANKWHgJlHmosuoYi0vNu_5SqNM0_FzlU3bMgIza16hurnnzjhxzZIbs1XsdgAceI-7qUHjnyOsrOyurl8yuI44Quj7TMHvYoU5SeLC8vxGmpRb4hu67kdSXhvvH07LsVW7jjqsmBBfx3Q83IBMuNK7ebwBFHc7kNkeSzOvwok4hNmQnN5vRanij5DCvK8XLtXB1BMYKuRj7wycEP_ksidWaFEha1-vp_NvLM_9NN5WxzI9kx4Q83cEt7OKEwMjAipShBdxwXcAIMBF-BWFQI7-lPntxnAIe1dYeAw5YPG5JrmvUarg=w1259-h654-no" alt="SchemaIllustration.png" >

## Relations Between Entities
A realtion b/w two entities is created using 4 properties `firstTable`, `secondTable`, `relationType`, `secondTableColumn`, to understand how a relation is created lets take an example say we have two entities `product` and `category` and we want to create a relation of type `select` 
between them.
 - The `product` has two properties `prodName` and `price`.
 - The `category` has two properties `catName` and `type`.
If a relation object has these values `firstTable`="product", `secondTable`="category", `relationType`="select", `secondTableColumn`="catName".
This means in the `product` create form there will be a `category` select/dropdown and that dropdown will have the data of the `catName` property of the `category` entity.

 <img src="https://lh3.googleusercontent.com/0Zq9Q6vM0fRrh2ZEu4B2l-eE1F3VWV1M3MCQE9Q0S_xMsqck-nNwnvIASyBqWI5OVVwZKR813TnMZp-vFmFCJinG0wbdMe-sm5yHUCx4Exkm0jzrfmOmbM5_ZvZzDo2vbog03lLcmBdrI2WnrVbuTl_UD_D9LKPUrR3InzsB-dmgLvHdFlRIGXbCodQaWGX6IDgImqtQflH21vHBu8cSYA4UfBRkiRNGy_CZy1V2TwX44Fppo9FljcpHSOGn3bQDYVMbN0lvUjSZ84pe-Xto83L0HUh61ceI0poXyVAReqnImKuYqlzUuFH48_bv7TbP4gD3cwBI05mCKBevP7MDXjn1QEgUreBtxz1CrqNn3gfM0gNf_ojUWpuQLIDVyBNTS_dKKJCdLqNJCNW-q8qlccXUIJms2wSMBeckALWz74_WjtUllUmP8avRp5Dbgw2P543AAzX9YI4hlWG531L5xZRUZp-jPrKhBEZp1tmXd4it0IVXy3MWjXf1Ye1_8KMkEjxMUEdOHgI6XU5h2ZJ4YIiK3Ykk1nriRCwBINcDIX9GHJGPMG6ytulHSib-405x1lCZMGNQjFilQNHSuhL1S1IyPvkmQFbkjB_eJJjGNbg7_MWDMEOZBQV8aRyEdDeS4hVv1kIhbEvlQfdxpjKdcz4odbm691U_2ILo4S1LY_t68Miuzq45ZeAwPfOJITrykPV_b_TIhCvlAOJYVqhdyvTCUImquNUqa8aohC-WoOkw3vA=w1164-h654-no" width="360" alt="prodSelectShow.png">
 <img src="https://lh3.googleusercontent.com/ENneWOb_FCe-WELwDZrx6bVQNmJQV9d4EIkCWbmqf_N_vy3swP_CLYIPj6r61e5-59GWVy53G-Wzp-aICIs-H0gW6KRG6LAHD6HR19EYEvqg40j5w-FmOAZ-IT5kkLdRYuOgBq0Bk8Xn7DNvqCcCdzOGfkZ5Y0oI_SNZapiZO2B4pZMAOrIxlUgssZa1OafAdn4ScSi35Puwwbs4XdnSz9tL4aV8kMoDZGkiRzsXWuix-H4sT1U4BfWN3-wljV_4nh-1wNqLFKWQAKIAYeelBILHsi2PGrNbbdh55zbQmILjjzh1yHSSF1qQPM0flr95lOfuX8Z7Xo7Gu765F88Uqb5SKkPb1HRjY8qouQ3HLg9N8XtMQ9ojTZwJ3lANwO9Zjp58ciXyYahyq5Vr_3yBhk53rIT1BxnFMbBgtg88IGz4Gh8oFQ4Y20Cpjtr5OrsULt06Oy23kr5QG488tX43Tf0DKPJRDNokU803X-WQ7gZ2tjmgW1MoN3QlhLwGFcwBjRTOqjsorC1YdiAr7fBD-KRv4SAXDDrpChefJ3DApngqPjlWht2nnL5gocJL5ND7rPksnhlbRiBuzcKH9V01cTu8oB983fdIzjHl3KOLvRFeheQkieyOzoKoCwGPbqhdajgDYSwVg0rfOoyXHTutADsr2n-Wd8hTgF3ek0AIE4PWfbvNoUwCyUwRqpZdEgluV0cAoS7OabU9Mzbe2T9vvF4-a-lych94E9WcrNXJE1gldtE=w1164-h654-no" hspace="20" width="360" alt="catList.png">

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
For better understanding Checkout the screenshots at the bottom of the page [click here](https://www.npmjs.com/package/mern-crud-generator#generated-crud-app-screenshots)

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
-   For clearer picture about the features Checkout the screenshots of a generated project at the bottom of the page [click here](https://www.npmjs.com/package/mern-crud-generator#generated-crud-app-screenshots)
-   If you want to add some new fearures in your generated CRUD app you can [Contact us](https://www.npmjs.com/package/mern-crud-generator#looking-for-some-other-features)

## Node Project Features

-   For each entity seperate **database models** are created using [Mongoose](https://www.npmjs.com/package/mongoose).
-   For each entity seperate **API Endpoints** are created i.e all [get, put, post and delete] which are accessible
    by authenticated users of generated React Project. These endpoints are created using [express](https://www.npmjs.com/package/express). 
-   For Providing **Authentication System** a User database model and its respective API Endpoints are automatically
    created. The project uses [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for token managment.
-   The project creates respective **database** in MongoDB with a default user which can login.
-   The project also has [nodemon](https://www.npmjs.com/package/nodemon) which helps developers by automatically  
    restarting the application when file changes are detected.
-   If you want to add some new features in your generated CRUD app you can [Contact us](https://www.npmjs.com/package/mern-crud-generator#looking-for-some-other-features)

## Looking for some other Features
 The MERN CRUD Generator Generates a basic CRUD application. If you have some custom requirments that is you want us to modify or add some new features or you need our help in Developing a complete MERN Application for your business We are available for your help 24/7 you can contact us here on
-  Gmail [umairawan128@gmail.com](https://mail.google.com/mail/).
-  LinkedIn [linkedin.com/in/umairshehzad128/](https://www.linkedin.com/in/umairshehzad128/).

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
# Generated CRUD APP Screenshots
Some of the screenshots from the project generated by using the above Ecommerace JSON scheema, If images are not clear Open them in new tab i.e right click on image and then from dropdown select open image in new tab.

 <img src="https://lh3.googleusercontent.com/KJqxvDg9826kqn5Hle0N6ok3ALG3Q_2TUt3yOxmJQVs2M-Cq6MJx7HUZuFFRvJ_dO8itHyDeylrerWykkMAbkJaoh9SF8Zr2FN1ANMbEAw29l8vnx5C46lx_GkUY1jFSgTzI2FQPyBmIN486goAIHFxjMnd8JmZ9Z2p_3lzI9HT-cBz_L1djjHxsJeUqhV_cpBC8jo9xOUV938TTV1xd8YC3hmUekq0z4V4zKoqY7z_btb5AdU3knzq4blO0shRyWx8hwYx0FxEB3OQ6La5DGgPNtY268R4VgAJ00NRwHzVM2ixymVDvx6BQUatlV1AQ7F37xBCk7NDfu8Ai0cHAcazTjpfroc2a94sLwekxsBZxRQlOzJ2agusgU4yhARSEVq-upBZJLBt_Lbr9blf5BBHp3xJNUDbAaX4VAGQ32moYBrO8IrBX2OZikFBawQOVlErC53Dc5rg7l0bzD2UFrDmjgJROw8qntfjGakK7hRQY0PKLj-Wg4RYF9klYK1hmh_d7dSj4jDdZFkBw-gOzNUAI5nKkkhPkpZDiXFKwesynnz_xplyEfGmd0DJUHUPGqQN_99Te5clKTXYWkwjTUv5Bdu-zLQPqJRI1N_H_SNf33SVoHL9nXuRDx-vVhrqpY4dSNOP8ASB6ksUvmmIsnrvj0h3w4H1L8xSpWCWyQ49R9iDJFCOuIs4YO73GcNyTNYcxfcdKYwUWAflLQF2uBIFw5cAcJK8SWaBjILkhxT6ymnY=w1164-h654-no" width="360" alt="Login.png">
 
 <img src="https://lh3.googleusercontent.com/69D6xWJQI6dGvywbdRCr0ofOh6ihNwmjykqURJqdbgiU6nLF7VLfROiEwqi4bD5uBo6Nol4gDg6Yidx0ArxOz8C223BjGnftjigNW43bWhTE5nhmVltaATsoZ2RR0bX7wsyjo50P36QSS4qkiD8cSudBmGqw_nxV00KT41JkQ1NQRniIsC5NHXU5YViksmc8a9G1b1kmv2cKwlexkMvIzj1bHpxOfN5DcW8esoP3Q_u5B7ZbyXRF1kDlXibehSXruFcjxkj_m5yo8RgPu-0OQGG-GRME5OVbR1yzw7vfripLVmd-EYzy9yCPRqhNWWJdJ1ZBOQwpqkEwsCfKjBSSg1khNpolY8fqOkKwYkcH_J1-kf2-MwSBUYl25I9vEaUxYHPyjIE9RXYd04lq8G3d35cZ1nKV6fno_TDWupU9C0sWcktVjny5rBC2v9UGA5MhLjSqQB6bbIz534Aj-tfmpNseC9s9V7PKPrkDFo1iiq-qy6OIPLWxTuIjv5v7JmmaOmKERRaYNN3zcaLEoaHi7p9YM6d0egHfhi9r0G3uKfkKyN_ljNH-Eka20Ok94oQdOLSjHfOJ09Wip3DLHch0CD7NUbJFIwjlBEBPyPeSPI1O1yKaTo3oPPqPsALvIgwO_MaxNao4CMJzBvuhZaCDh_3dpQI0LLVdCCiNXUF4Ifa4RORtYiWD0Jqb80cCcGZ2c8QgVH-gvRUus2z2Nsdwas2N8p63FBFQNBgn3JBDi9vdvVg=w1164-h654-no"   width="360" alt="loginErr.png">
 
 <img src="https://lh3.googleusercontent.com/QA5KdNU8f7oGcj50QZS7Ols2WZFVOAqLEN7OR43JiZ52r0nssLFaAHzRrLz7Kt4vyN3yiR1uGZRowjRsFl0brTTagBjwE67yfy8WVhL5BgRUrB2Vdqn_lTn2uB7T_xtOqlpapLEglzYkxFJloXNY1-DjmdlyKfMn92G21W2QcfaBevOVFQazfxKNhzkECs7PLP4OHuKegYY5BPH_rxDbXq2_3ciMOTbUZzhgmSi_HHJ2MzX12T137TqrWcDtX7Rpk4zmc1PibVy7wdsiFV22-ZEul9F6QWapspdgT5QGdeIbnCXO2J3D-4ZGPh7VI-jY4zxQCm5qgwx2wxklQfKwBs3vvGJi81ZyEZ-sIo0VQs2SkXyp1DYs1OrrnGUM5-K9UMb8d01_6UGEw9ZztvkuUtZzcrXsYg6IDp3hiOfvp33B49pT0ojF8EzlIdFYGIhIHBOF4ZNmaX-McnNJ2ZEZ2ns553AAcjfjvK7iyv2IZ4_Sw9bSYFx7r7evpGUryvaSP7U3_jQeymFFYRMQFlqff-cNHpKJqhgUgqrGO9QiHX8UTmEfqjI0rOTV8BqtApkA2XtreeBJxEKFBD5zu5yq1WRJNxJGoA0hUo_hCOyF5-vs6CJT7EybNnkJXe2ptvIGcQbdHE4u8JgwxaL42Xfct8YVXGdVnIXCycif1unb9Cr3qjaPzM_GR_Mz-SpMG83AtbDGcgHdbL5oKH5tg1HDAP8N6tDcjE_8gn1KKEoaHcTP8qs=w1164-h654-no" width="360" alt="register.png">

 <img src="https://lh3.googleusercontent.com/k3ucTLeSdzzvfqtqjNOvW7C1x6wYjBKbkE5BBhVsGY7irkhziRlf2H_lTLs76rTEwCgu_Fu25l0mArGTnAAb6lu8APJW5mo9JTJhHV_0ah8rQDXIkGBTZtMu2j-_c6MEU2_3KtS46WFO5sE-_lsCu_VaCuahXePo_E4iZhYXaZY2dZ6NXRTPPopdTzAw3eQzJZwKa-pUGF-66ZnfZbYeXX_qrB5nUXvLiCiC1Q6G8HN47ZxbsqWQjIcOg5bLs2WNM0rp7SHoMmyK-xpBL8hRzbDGTUf2au9jFiz4FWC2sj_Gj-vxy5n7A5HcveDax8J5ix4M-KMMRRG-HrvkiX4ttrfnkZtDBz4HN1QHv4Kfnr4uQ7TZj1RZTbOyVf84y7AmLuKkfRhpQyG8Z2QuqjBeGgiovmvrQJCZnvB4lm9DDqwrzvtjahI_Mx6U1EH6APBxWMmZy_b1wQHia0OHbm8bpxeE4vTNWPZ9m8-3fiRf9r5zo96a6b5e0XcMpHr1PMFSlRNZuoBtjvfsD9emmJ6hOzmyDdiz0yVnGXiAXr9ZmzfJEerMnsFcRL_O6Romi4lTLNWCq5xxga6YjU6YpiYM7vDoxQ_dYZQCzbkHXpOJR0GHX5LJ4B9IjqULGfvMbyVN8eg6q2_v_sXVaJQ0JSzhxJVJ-XIkf1hpbQSEvoWY469C7BOEfkdsZ62t7jDIV1lNUOGbFaPbNPxmMdyiXKCERr1PHqrpEcKxgmC9__IZxrvCre0=w1164-h654-no" hspace="20" width="360" alt="registerErr.png">

 <img src="https://lh3.googleusercontent.com/RRN02yCWwqVnSs8gvMAp8LZPt6FqwcoyMt0mIM6i5ug0qHC2aAq4UgL4dkT94UjL1d8Nr4dhh67HffCAudtqTWpUyUBPH0XkZeEKkQQB_UVVPLLyKUMO-OiBbSPsEmDtjCBUVgIMTQLS0RD49CvtEDrnhZCWhpzuR2kIdPwk0DsmV_XSa_pYpqRWnlSl6YIiy5O_3Jy_Jzaq1hLtioUkN2BSeqOKz9FWGIXYOUwh2PaYcUspG3d_vLr3SDQEvm-tovr8OojzmNLSWHhgqt4UvrB-PUJ8oIhLyK4IyHHza7mkNh3Bl0sKad-jvqkzH4Fiwjz9MLZVNIOyBg5sfR1tmfz6l0PtowpRrdJ2pEnu7Xg9H0rIMj1_DAnRIkwAN4zG56sDmRq1665Dl7ErSNkN6db-1eqyWPGqM06fh2T2mYDS-7Z_GRE6k6Z4N81AzlIlG1wLkfiLIUHkFOQKWCzgV7sk57cjEVEyFukoDNZ-D81PvDtC9k-T2qJhYH2TRWGagvRBBx5H-vr4Feih2B06gUb8XPOOW2l9Ugn2vgeNhxppTivOaiB5LI3zlj_D8t3kvh9cpAozRilXnMFx5Q5gcZDRtSRfHBvSOBKogYTKpJMfQUtBW1J28UWniJM_iVg0uzfaLS-tPnzHQkTmoq0LGyiWyUkeH4ThKfQDJJoqm1P-p_siBakAevKbk9GGdvctijfpLWfTnDlX_S8xyJsOBkdo5Kg2e0D5gxbOiBRLiZ4wG1A=w1164-h654-no" hspace="20" width="360" alt="emptyHome.png">

 <img src="https://lh3.googleusercontent.com/ENneWOb_FCe-WELwDZrx6bVQNmJQV9d4EIkCWbmqf_N_vy3swP_CLYIPj6r61e5-59GWVy53G-Wzp-aICIs-H0gW6KRG6LAHD6HR19EYEvqg40j5w-FmOAZ-IT5kkLdRYuOgBq0Bk8Xn7DNvqCcCdzOGfkZ5Y0oI_SNZapiZO2B4pZMAOrIxlUgssZa1OafAdn4ScSi35Puwwbs4XdnSz9tL4aV8kMoDZGkiRzsXWuix-H4sT1U4BfWN3-wljV_4nh-1wNqLFKWQAKIAYeelBILHsi2PGrNbbdh55zbQmILjjzh1yHSSF1qQPM0flr95lOfuX8Z7Xo7Gu765F88Uqb5SKkPb1HRjY8qouQ3HLg9N8XtMQ9ojTZwJ3lANwO9Zjp58ciXyYahyq5Vr_3yBhk53rIT1BxnFMbBgtg88IGz4Gh8oFQ4Y20Cpjtr5OrsULt06Oy23kr5QG488tX43Tf0DKPJRDNokU803X-WQ7gZ2tjmgW1MoN3QlhLwGFcwBjRTOqjsorC1YdiAr7fBD-KRv4SAXDDrpChefJ3DApngqPjlWht2nnL5gocJL5ND7rPksnhlbRiBuzcKH9V01cTu8oB983fdIzjHl3KOLvRFeheQkieyOzoKoCwGPbqhdajgDYSwVg0rfOoyXHTutADsr2n-Wd8hTgF3ek0AIE4PWfbvNoUwCyUwRqpZdEgluV0cAoS7OabU9Mzbe2T9vvF4-a-lych94E9WcrNXJE1gldtE=w1164-h654-no" width="360" alt="pagination.png">

 <img src="https://lh3.googleusercontent.com/0Zq9Q6vM0fRrh2ZEu4B2l-eE1F3VWV1M3MCQE9Q0S_xMsqck-nNwnvIASyBqWI5OVVwZKR813TnMZp-vFmFCJinG0wbdMe-sm5yHUCx4Exkm0jzrfmOmbM5_ZvZzDo2vbog03lLcmBdrI2WnrVbuTl_UD_D9LKPUrR3InzsB-dmgLvHdFlRIGXbCodQaWGX6IDgImqtQflH21vHBu8cSYA4UfBRkiRNGy_CZy1V2TwX44Fppo9FljcpHSOGn3bQDYVMbN0lvUjSZ84pe-Xto83L0HUh61ceI0poXyVAReqnImKuYqlzUuFH48_bv7TbP4gD3cwBI05mCKBevP7MDXjn1QEgUreBtxz1CrqNn3gfM0gNf_ojUWpuQLIDVyBNTS_dKKJCdLqNJCNW-q8qlccXUIJms2wSMBeckALWz74_WjtUllUmP8avRp5Dbgw2P543AAzX9YI4hlWG531L5xZRUZp-jPrKhBEZp1tmXd4it0IVXy3MWjXf1Ye1_8KMkEjxMUEdOHgI6XU5h2ZJ4YIiK3Ykk1nriRCwBINcDIX9GHJGPMG6ytulHSib-405x1lCZMGNQjFilQNHSuhL1S1IyPvkmQFbkjB_eJJjGNbg7_MWDMEOZBQV8aRyEdDeS4hVv1kIhbEvlQfdxpjKdcz4odbm691U_2ILo4S1LY_t68Miuzq45ZeAwPfOJITrykPV_b_TIhCvlAOJYVqhdyvTCUImquNUqa8aohC-WoOkw3vA=w1164-h654-no" hspace="20" width="360" alt="product.png">

 <img src="https://lh3.googleusercontent.com/JjrhkpbmYTU5g1qRADJ5vaxBT3_Ti7JIv1ODjKfYfCcYJla5WC6F4_59jplZFeP3oK709SgkVaOy7inyD6KL2TV9A2xrSwj4D_Gmr497Wp0nh9YY848buHZDovXLuaXCQZ48DD4Vay0C4_izc2udZylUB4oP7jxrLa7nKcW5bMV8Ikzb7IhQ6merDZTk2s8UOgNJag4Ci-5LdDj2Dd1HFCjnH54A7D24mXPs8RarJbM38RKkNyPMSq1pd3bH3aaCC7o59O5c-wCNgAAX-BeQ9ySN_LKe-ec5umUy3Il8p-FFYKvdt2-Gh462y47MpYPziqAlhTZs-lhLW8aEiaIMS6Je5vm3Zp00Iy39V9qwN_MqR2WlhlnlTwOIi7LGUYo_oU18_yDzX1zn3MFyhJqpPQGtUn_Rp-JgiAHachDjBH-RxJMflqMsnOZ-TIrJH1tyYs7M1gHOEm3dBzz3ufTothVD2mvNk-ubwl-Fb4946T4FLGEqURFmFtZKP4iD682bVAgfpMt5Ebq1Y8ShuehZBoP1d5P296xYRBCS_ONYKEbZb90BzqA_3pvp2jJvzWjoTD0_EtAcPjf9w8zuJ6BP91HlLH7JiP-1wQQya1oU_HElg-PNrytoxvrF1AqooECPRWrlQLAyObTsHYBlIiGHtO_7D68BNN-DxurPa8hoagn4mpMsnaUvTuGZTA9DV-i9W9OWeVW4p_20QrRkJUxSlM83WzQl8GIAI3OeeaxSRECRvUw=w1164-h654-no" hspace="20" width="360" alt="productErr.png">

 <img src="https://lh3.googleusercontent.com/cLMvut1uap19j-7od80Mg13YS4pBEFQPfU1X3D9c5Mg-iqIpLO2Njq3lkU_QA2TVEopn96gwkfpfMpPL2Yqb0cPSG7W2_GGaIlDOMrpkMiZHzWrXdFLUeBj4vWt_tCE7GBGv4mPaHyuGWlt0SoX9iHIC05TZnEqi4egYda-jLFlh64mUH8sueMVMwMlHyQi-VYC3nhlSEcbzF8AGv2pooKMHEymRcWBZ38-AkO7Re8R9dTnnEL3NEcXOVi5SoSTzdE2iyOIvbrxsreiVXZelhZqUw-QT4qoDuxXs7bFdYLPbJhoizu7GgOexXTjlM64Vm2ij3Wq6lkMDTiUJg8R2LJbGDo1v4vFW2CtIS_IqeyULrYZ-dWsc7qvmSC4DmY-E-jbwDu63FXmfqDraYHCey9mkiUVsDEo-hAkFcvaeQn92CsIeMmljTV0qJ_zakUNGztEK61VhGxT1taxYQfc1iy7-pgE5uOGnC-Nt8gVuory3zu_l0lc2Fkf1F_PdXKPH2p1kfM3RFtkH0IME9SDEEWS4SnKKpHQ_aMyBAg40hr2RIU5dRS9qyGLsCuiHX-oNLweSNPXXb5ZIge6HE6Ylhr21reFs70VZylmfAOlbMqD67a5-kmBtbpSW29C_5i2elKwmIih5DRwg6t1pRwlLDEqQ6kOG6g-C4VkYH5G9k9Vtx4lm7PBh3QCkN3kWIe8-8iNbiE5Jo4vHnqiuwwKMKas-nnXB6Qf06x5ouTWS3InOf9Q=w1164-h654-no" width="360" alt="order.png">

 <img src="https://lh3.googleusercontent.com/huG2JxuqO6VCwvxsZxIJanQmANLXr5h955aJacQU0EOQOkVCGlnFztCzuVlLHVSAZrPV8HIZ3u490i19xmAjWhmGvB6YN2ZgEsb0F_TgiBnI8RLTOGxm7O7WgNxayZnoKGFw1SprFDfth0oLue8qOUloncNRNgUgtn1ObUiVQllbZ97dE2bO20aQRtWtxHjVc61FoRGL30dbJBkmF_5isrKo_6i05DZ4tz9hpRuJ2qfVhBOgs2z_c024fuDP5k1zaE4hkgfqNNbtUuB1Cn-XaGFRiJfiLgs1dqqL1kXgvjxt6P95CididT2BLBiwfE2u9-zDHlz1mdq8zn7HKq9rkpMg2YJTd1YYhpo9ibwgBxgXGQ2N3lFtho_MqOR_AAMqcAM5lNCI-lctnsb2h7MbhgVwDTTzJgMGrgw85HOA8kEtmH4R7Vvmd9K8P2xZHXXuuIUks5iAmK1ANieu8rts12Iz_kSYHiHT2YBNg1D9CmA2Gu0t9Jx_DgqBFgGgQ3IMonWhGdUeXw8q4eLq2E4sKJVrMVWPXCaqYmXqmknJuqwkJawL8RgPuLvvVMo65qO8u8SuOdaHks5cBSNgS5PQB2XO3kLxDF_4Jca05qaeTx6npQg-U0BUR-wlUMbI2posrpGRQMqFhbqbGQ4zwvRI2_pp0HtDIlBWna04XTOXh6AMy0ka6wnpXPMZZAsoX4Yx-ydX-cvG0ZdDoKc4SV5fArI-lSAFfuU6OPQPA3VvWvq2IDk=w1164-h654-no" hspace="20" width="360" alt="orderDetails.png">

 <img src="https://lh3.googleusercontent.com/e4CuXgJzPXjosi7WX5REWfYrgcTvP4vZE8Rex5xmHL3IXd51-NetRWWT7WThFdMYLH-me5WymUWe_uNwlGH2k_aPCmk-9rXSDRF0o22TcvSi_zgrIQGHm2gVe2GATfFTHpm80J4OPA18KUf4gdEwY1DPnoM9JITVXFx8cbx7oV5eAsOEhKcRYhBGNdk5g_HsbHCdonroZxNiZfw_s9SqriD-y76V1a-3SoFuoZZrLAvFHWb61wpCFGBvnuOypPgGTO7N0mBlF5SkvuDmlL2Y2alX0z8t2vwWqzI56_DuuyLkDpjimxuEfJJ93xIPHG17KBldHZEnuf1i71Qy1H2MLcnsIr85832ITATvqO2UeJe80zO8vS_CgeIUrvxnDXfSY9J46Lw20doRjyVxkxWzZcIq9ixARmoECDvOGvionctX6Qmnb5AW7ePSLEafcTLYf5RBugZCmpwsrkVNxRFl6ArbKUhgAsWntuUL_ud1olN9rB_NM3BFN4aDIBrOQZ3f4pW2ZbBJJtHX2tbq5yeMcjfJRxxyplM_-8yrBc7fzze-eXebMHEZooAYcIj7czXEo7QYZfGxJkPHodHzlS26cS29E17f3K2i2BxekqTwTCc2MIM3d8EE3EN8qXN6n4A_6ibzZSqbbtTmvnEqkKvhKRoZK8igmglVnMy_2x96uEEsma2kV8k7ZunjZbAzRIBTBpUKqSERwMZ8sl07wwZ9_M0UTNTdUBRBP44Md9FsjPfvCRE=w1164-h654-no" width="360" alt="userInfo.png">

 <img src="https://lh3.googleusercontent.com/62nOgXLEaeXmpzVwEBsjUlQx7deHr9NQm8BvylxA9waWWtmD8suN3wGB5mmq3CnV0SPzhho2tK0GAAK477o7AzDiNMnCJr4a_iX5KV9jqmPdOeuZeDV_qp4D6bAFNjcdzN9uvvEI-n9Ax9-zOM-Hwetr0nxjuXN0CNUoFJTc4MtUkOV07EeqVjtFhTdc3lJSaBvpg2is0M1ghACJzumH7uJVBED9KFsRr67hipXf4quKnR4b6u9T8HS0qWQDcruoIh-9Ylpj-tjPjK4bMAGZAv-RZMItnfVRYt3ZzxseVRQtaKQSjK3ar-AEL8JhY_hk-oS5L0opcSFLnEKzYKoVh3lWjVH0ysb99SdMPtsMAfduCScGnI_AOvREywBWLSB0NZuA4GlcQis5mQJ8smqsWNkmaAXQQghZ4zTh5jhPr0qUGAGrUmuRVJ40ccrn0n5TxGKIfdD45HZZeM-SdtuofY8ip_jbVb0iTga8RujA6k6-N8rzzyHjfduVN7hxfG4KL7YCaGUplbhkHuVWQwB43sTa5Rd05t59XCBOMKA-nnbX6HM87okeRJEe7zAMyEr3gk4jOEzO4V831htH0S7UH1wvA1eWNr38YJRhzfOdXgK4qIJr4Iw_uQbbl-NlRJFDx7oapSxmyTBd9di7Fpr29mX9fTms0bqVcjqMab-WbSeTugoEOxNoGyyaZR4zr8dAbhnd08kMOq1fSVLdnYRsjNsEuZeGc_mV28xaIamugp8Mh2k=w1164-h654-no" hspace="20" width="360" alt="updatePassword.png">

 <img src="https://lh3.googleusercontent.com/aQDta6zJRgktZoOTQoTyQLWGBJiwcbAvT4h2D_ffrG4FKvCGyZqy4q6qyDu2eJpHxDlvFUQcL-B8E6EuHMwYuULLGwbeWTadbM8aU9LaIvJxkwRoVNRI_oIhNvIU7cdaSToVLex7c_bRZqHP_ktV1bltmojLC7RlLHiZrsdQnKpoZgWDOe8AUBmx-PybeLIsLxPAc1k0GDhqXZSAZ4yEien3pf51zwFBINznEHyzQ8947L-gwxEMv8J4OdwtunnNFTa3cu-6-PleofVGZKKMkbzM7ugfjprFMhsm2JVjiebAD1SPeCCEjWpkUHTMOeF-Xp4ha94GDGkLSqR4b_HveBIK46s7aCoj-LlrNTwWbco8BqZT8xTSg6zFelbobcH4fsiyJm4iCUmsSIR7KUd6T2mZkFAPnNzu79X7V8JrP7Lp8xF9PSXb9uKEwwY_iiV6BcO6voRngXOi87J37f8gpcU9aiLHNtBDNE1Nf51TOjo5dcmzx2WnuOLJgWkT4LJsuuP45bRFrr35wAYoixHT6c-8XFZKEBJXrvPysAJgrrl-sUanWFQ1JkwNzjGJ2dyqTbLeqQH_h6oswPSrUQNpZAm0r48he3vwkips8SZWzKU9cbvnK3SLcjj7Y09QBLNgYuJJ7yqo8uHPalfOP-8oJX1bk50Q-A70CkD5nQTEQk3cu0df3FZRgLgop6-HFak2TXKjum6l1OLQBQQtfVlzfkjQ6TTWLTbanGrIZD2hg6eUcSU=w1164-h654-no" width="360" alt="supplierErr.png">

 <img src="https://lh3.googleusercontent.com/QjxX1jkdNuCWqSRO07DFtf9ecPnj_w4T3T_YdpN9pKNnM3Zgns03lCQebAB4wTbhgaRUA7luTWFUGFMx_CdcX2n_cnoRKfLWR0SdK8RrlVllXaor86blZ2-6zwj4lcSm7Dq4923yCRV-NHHhelGut7KhqVrb-shFjMxSTy6OV6Gofo5yb4pWog_TNuNuHkjDFAWOq-jTDqDTPrsL1ZiThKPHa0QCIMZbbJdMCyXjkFIrF2OldfUwiqD0gXDYv3IsNr9e-2UgZlF1X7_1RNwvYOj46J-2rca6gt_22Vx5VsNDUoW32puFlU_hNZllVdfwoajUQAEyhF9WbbH-exGvg66lAfTWU5MTxbXFmRWR2rWFzaWbPwl7P-boH1wTG2DTYaVPxBxHjobOzgpHq0QcTwTbDrZdcM0naTohfmH0aS85sTJPtNNkJYZ21G3KvdpwgUI81mOmcwHjEPkmlix9zMRPiisUG8AyJF1BdiFuPyA9ziEV3j4SPdQIGlgCWP3zYhTLZXWq3he9mPoN5P_zfNyxoRrld-P9Sb4eKv1UptPK9OpGy9NnSSzAcloT_8C5b4_PI-9GadwT1cFMdCLE0hAMh5qxSyG6WoQOJCJZJu2mdXPW8rzW0Ysr_-EjPZhoOYiT5p6GOUOulAU1WQGAlkIay0cWOXYcF4VPmjk8-HsXuUyexJSqEqG0hl4gyaU93pBEFiuPEsSYqTg8N7lvA_makMZgGUypP5QUJ6RhBybtjSA=w1164-h654-no" hspace="20" width="360" alt="supplier.png">