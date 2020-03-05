# MERN CRUD Generator
The project is a node application that takes json schema as input and generate a MERN CRUD Application as output. The generated application contains React crud app, Node crud app with Express Api's and corresponding database in mongodb. The purpose of creating the project is
1. To save developers time generating all the four CRUD functionalities for each Entity.
2. Generate relations between these entities if there are any. 
3. To provide React, Node and Express developers with an easy to read and update code following good conventions. 
If you have some custom requirements you can [Contact us](https://www.npmjs.com/package/mern-crud-generator#looking-for-some-other-features).

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
 <img src="https://lh3.googleusercontent.com/NrBpQCqx_noHuRGrq7QDMnJlCdBG59am410TrAziiyqwE8An2woA0Rgvu89F5QcxlNRhc3AA-U1xHLX_GgRi1Pg_ISn2LBI11huMJt6CcM3ZGkCRPM0jQIvmx25AQZraJH0l0lDQ8VymFxJ5Gp8a_UqkzRkZwK66HtdtbqVG6X17qdsjJ3KJpKGb69V0PjBn6dzg2EKIoauCQ_ypNDIOoNbDnzdgQu2Cu4PgfI-R6qbdcwTVuB4rKkQICzHytb0oRUyiRP_rJKi5i0cF1hOyueujWTM2ZsYt3jOOkc_0JgKF-zQ9nteLjrNfPgJoVwn5pHlxvU1NuRJ_3DpP7im7nAJPMWWEC6a1ksQGLY5D7REbetPfX7j5HnD_gx7RRQy4iabx1-56i7RwvzaiBUjl3qIPCDs-l1hE4tkYz5KThT1DRQ12LgXXm5b8t4YfCj4KJsCS0lRFMU1GxPeAezrI_tHnfj3CoX-rxZZgExZlsaMQaOBSV6oxN1RvIY1yRzks588M0c101ZVnr6HuAH9dURiKwKobw_F0CuTfusdY0IBPjNiyd4L2hM4ubk-HFWlKxJ1-kUA1tfzvWjjWdcL0A19naP9vGPL4CjKmRLNjdUerdccdjSwsgbpiMv34Jx6IkkrOAg3uB_o4YIgioLGGYJE1sDpq1mkJq5RyP_puire8MIxkJlYRVgW_2XAXZXMGHPP808JmYXG6VLch5_dY56-9cCH3_mG1jJsr1-vqP6-vti8=w1259-h654-no" alt="SchemaIllustration.png" >

## Relations Between Entities
A realtion b/w two entities is created using 4 properties `firstTable`, `secondTable`, `relationType`, `secondTableColumn`, to understand how a relation is created lets take an example say we have two entities `product` and `category` and we want to create a relation of type `select` 
between them.
 - The `product` has two properties `prodName` and `price`.
 - The `category` has two properties `catName` and `type`.
If a relation object has these values `firstTable`="product", `secondTable`="category", `relationType`="select", `secondTableColumn`="catName".
This means in the `product` create form there will be a `category` select/dropdown and that dropdown will have the data of the `catName` property of the `category` entity.

 <img src="https://lh3.googleusercontent.com/S89fzWGmhhkoOFXHkJEe8mG_AjcUb51m4BSxz54sV9w80D4_ys_4MRg0W_wsxl-3OS8GZElemceobqDsZnPZ-1wP-nfDS_Zn7UdqHRsb78XKd2S6VAP6_JLotJXlQ1bR0fQQ1QudOzXMCmDLuDxvJNfcH--KF6IUsXDpturGXh7gWzGTdChqjbUYksPF0PBNnovax3ZU8OTROTea0rLnZFZJ_cmHJBv6EdOfHcj59Aj4pHb3fuHcfGf1LjwK1YXBwouT_h2BSOBz4EoZi-BNcEaowmIuGWQPYAkoJA4V3ST9E9mtHr2CIrrGEI6fonMByCL_uNzCXsMm_ZokEcTTyuBipufqDKC2sm6CZDK_CDWGp2b6Ajpp5StJXtwQW8dZBQH4PNzB0Ug8w0cT3D5sn7FbRLXqeDQkWGrQ-ewgZaYVpR8vVjZGR_AKnNtOiRAQoXeeDjoiwQtrKIUphYOmDGPyOHEKL_332U1o85Sv_1WJT6Hhbc82mvDuO2E7puAddjTMCnXgE75_guP6weEWwN-Av8fmSQvXQDzMmIdjOTzoFth0EtvnBwps0NC6jB-y_RCzBSm1Hvt4yzliHIICJL3bONHNeJhzjtHO03dOWvLMhYVdsecTBpZtBTD_RsRkzMgOdIGTvxb8jba_6u8ylwqy6B-8R9nz96sFULLuxnKp5V-_3cHPWQ=w1233-h693-no" width="360" alt="prodSelectShow.png">
 <img src="https://lh3.googleusercontent.com/pQWytQfyt7aRng5J1z_K85Mxzrv5byOJxAvpfUT77v1InJreOZXdRr-0yBECyN11ecBgAyFzwhB9irNbM6IDgyvLnDuv_nMhHHlARXf5yYRgK1InlEUKcNZI2jbJ6O_1KT5oPb_ezqno1R9QCTkD1XSz7HH8K8nrWaLw8Fxe-pFq1G2S8myiYJFWmrNQxbmcAAhe47ZJPMuWeE7LMBJyiI9WQ6JfYLOA6vopEtrcI-8OfrQpp2YyjjTJqT7AfL1Tgd5XqSmoy6ZN8bOuYuz_sQk0AiQIi_9OHVT7Aalabl67ZK2JZzRBQ4BVX5HsdZxaESHjKLPLYxou4Ku2-8rCOwTlgZDVLNI_rZbu5EuWbXl-05zSdxL2m88kc8tPWzblTGrzOy2cG8CycFZ3IK1Wd38YEAlD46VzNX0PQ5oel1Zj7ygx9BxE7uUNi3gamKFfR-sYZ8Zf6EQz3B8oC4SYI4nYkBgyWyCgSSrnV7IYU7FB_sOAq_TlklMG69nqGWQFPgcWfecktE-1gTYhlR2aVrRJA-8ldAeBEBQGZ6ior7LthH5eysNHHIkp6IS0QzHCtcS0Ccrnoeo0wnEYZwvE-0ZGzAHSe0_vdJ7qitv2L_Xk8lU9bUS0dJbxweuzxFMvjiwnXL6JlpJF9fii1nz4NF1pEfvpc_9baZERk1c0a5hGfdT1Umc6tQ=w1233-h693-no" hspace="20" width="360" alt="catList.png">

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
If you have some custom requirments, want to modify or add some new features to your generated CRUD app We are available for you 24/7 you can contact us here on
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
 <img src="https://lh3.googleusercontent.com/7gJ14vNzXqwH8fFbJpspRZdZkSlk02iu5b8VxKimy_pumjXH_QJZ4cELHKADfzDtdoxzWFddIeOBWnbU9aNIQemqnxOAd9BFqn97_k-r4wgr6P3H1pQHKtwZ5oDKt8Ujqarra-YhlqWSTCwtjh-_N6pI17wzL9mpoEqNG8ZvQRv8wiBAZr1SttlWkBGQngtrKMOjapz1TRXo27X80SpKeyb7XlbfHEePezfvf12ketJZD4qzNtlKi_zJTo0U-K0e06sUOu3uy0Jqr6reKUIaNGSSvenu5b8GTucVYxoHwh_BniWUZAxRHftsttGOJMv8cJPAePYJsgxzUkPmHjlRsaKEF-rzXPT-26oKFS3wNQG4mZzMqP2-SxB66xaAqWZIRQbhEnvEawge8S3wm7dWqgDLhFNhE77SJJ4-bDUVEIM3gaIboKLk4Za_lRkpnss9CvPr_qkg9LX6ZE5uzx2pZ8lMYr_9LKlw5eUPXiQ8Wu-WMAL50Lb1SYRoAYCUCuqcVYsfTxq03dGp-hXKlik4dBTzOpPavB-O8NiL8fpFq1bkA9WGaCst0Z5dc0n82viNjfgox3gTHLv9yQ26SSbpDQBNaVOnkjdpIdYQG39Of9bihas-_P0wXuT5XoeN-qiTW-bh3CoOVWTUUHk_9YS4fcx9aET0TIohSUfg7v5DG18047sHDLA3ZQ=w1233-h693-no" width="360" alt="Login.png">]
 
 <img src="https://lh3.googleusercontent.com/t4bzmU6O1wyh9kqNCFkxGkhnd2aNw4Anr9DVgw7bcJ3N9EWUSSqGZFWSH647J0m-stlMTps792ntPy2ZpqQfpgYmbkkn0wVNou20Zcwko9hwx0UwQZs9sCjzWv4L2dv3UgR49WJsmIPh-gSqCFn07wQkiS0SeLuc2ffxEugTi0QgEQo00Ix1vSlhEFefvdG_JCUZoensiwrLrTxYVtp33rGjlr7ylh2IWIDlS-oMQWdOG2J8syGY84pU4d-g__8UxlegRV7-hsPnGjGZzsfxTlUCGVs_kBQutfmh6HpjAVWPr0D5nLUrvAfhBVW0o-gFlc_HjNllLlHZuyRi8rs1UUtOypU76m20JZgFC6QvjZgtw-j-TYDf_Km7lzinG2OcvAWykMU6ZB7X0nYOOAJTPsdUlBnf5eqcNa24fZaJPgFhZWNtyyOu8mqOvj_eJAXhIbHWxOsRWIT5k6siD5u6B-Hp7SZIxWRBzDh1bVzr4VDDikjGhO6lz1zZLflv_xM_1qkx_78o_rQCYAjDAnBUnZh3rfJKMqq865UvMwFNlLPFVQ_XlqZA0eDrsNy6QCJCX2isP0o0XpT62TmoKXPbFb3I867o9y_TbYh6irmMYoa2mwYK_7LQuMdUoXunDEppGUQKP2Gf2cIbaC_l1nQWhPDP2eGlz8V5xAkuASaPHNBJYWD0kRpPRw=w1233-h693-no" width="360" alt="loginErr.png">
 
  <img src="https://lh3.googleusercontent.com/cJYEeHlem9W_yJ9tIMVfD2wIXsCVMX_qbbG_fUCl2eXFp1QUunsh7Y-ddaafKR1iEbn4UseUg5XAScJ1ZLpR4jYt5v4871eRgUAWkJz_BS3fX4Bee1WFEvovJ4eedOV5aIioV0oXFj2fs6LfT4AJB8QynI5ryTl1eaQP54QmfDrpfgy6s6yzMd1naFKwZaK70yhp95EkwsKJwpY7I-fu5u5KRQnM9B6aLNqlXIh21fQylM4JvJplPvb8vUTu1FWx6788iHvhY3YxeQvWLVSzw7yw5j6YyMWm3GpXy49njZPAOV1LJU7xo8YB6msntHMLjCzXY2ZVAImG_Y79o8ISCuG8VJNXiuBhlLTgAUnDRJn6dosyb4argpsyPFhrbm1mr8I2xJQruakI8NGLLvXnN6vRF9UJqEw3dQvvOMPcxlS8SahoJuaombzQ7Q2yBNnt1fUlMH_3g5lzm4mVwRtPkq1fiEuZ25b-x8nGg6i5Cid9yjYH-k1nww6P8sO7q3G7lRNSGeEfWEIb7tHXQcLif2lgh13xBi-XNGt1XLk4xJVway7pjNmuLRDABNf8ETQzlmkfOJ5J2L7-OUbGkPQVI-4N67ySUp58Frxb3GES1cTbuOApzct7EQ2vZxhUGfTOp0LYuTd7rkNHvNDCvPBjQJ6F0gp1Gm7jpKHZZP1PKDOH65mlIDnksw=w1233-h693-no" width="360" alt="register.png">]

 <img src="https://lh3.googleusercontent.com/e9rReP0DhpDUR8YhHFJA-DFREGlkgCYVwIDqQhbRqTs4OxDuB1K5KMI1qXgpv4KldFagaBNI9JN_ZWdFf35xhNfTt2sZlNeJxlb_wHnfpw945uea7BjdkFeBUgCj6SgbqT0YPgJ6SYDdHEyaVVp_o1xDhdbTQr8KglueRej486ei5BfyPyAq3xOY0fhk3z4UOaH_JoI-YEaByPmZGopkgtGjF1KByTB3mhWCKw6Lks1g1wIauETouczDAkK7X0CuXmAVDEGE7001nRsvG8Rz_7us8pGKi8SC2cC4MaOLkMzWBovK9ekXh2o5KV3-S_nehi43PiaMC8cAjRst7FzqpeFbBjTyxdFa4--ZRqbD6G7PeEBz1pf4dZCgQ0_mvrWp5i9G8oT4hWlIFtbJuRozcRvIH6GXF4HdoXdpCoHe0CAXPXWjr-B8q6HbOL_m_7Z__IO7mLk8Y2L10RtuzrrOzF3Pjurdd9Gac6yL30bHTd9Wd2wYpqulvf588j5YlPEpVEf9u5jakxbGubMJwfb7ALGJMeXUsDPn-120Ob0oQdK0HZ0ZLRlzK2CcygIw5epSCtQxGxS4gACBd66pJaVanWaqz6e8DY0B8KWYhPvHny3wObqVorXdwG9MuKd438PJbMgqSpQfiNifYMdsy8X8r54eCSbi5pG0xQCHreQ8I_dhXI0Iw4MZZA=w1233-h693-no" hspace="20" width="360" alt="registerErr.png">

 <img src="https://lh3.googleusercontent.com/4G0iaW9faEyDfu77E2kRtSMCX9q_XQHaM1X7_dzRM2xpik6Q5yYJhu1b8GHRnqmIzqvJQ0OrNRS2oRPrlbVN6a1cYEUGXqQ4r9OdYGkgdcrY_-UNbL_P9B7G60FQkuWds8nGuyra_F0RitaIaLdodhaGPqnd9xM9h4gsiQiM1454FsNlJd0pIhzXRG9wn9fXs6kUC7PnDQQmdd-xt0UpaQV_wnnuDeyu_9768Ym1k-gZwBYN2JzQX9tYF5qaHwhqJmuZWRLnRrpyGsrzbL7jjuhoDqjCoypOzTsDcLvsaVpS-HXhaHpboeZi8pKE_BVv0hWZNng_RNPJ4h_nahW1eehJwt-8z7N-xXbq3cpYjvNcKNcvBRMDnV1V_YSlh4-RwBwpIhJ1tWWr2APQwLjkzaO_ChTrdvxtII5gM44Z_hSUJKl8Cec3qSOMBqWN4ZcoVQp67DRcVPoZufZG3DLIquBuErMo_rEIvY9t9f0LHSauISRQ77oLXan0ZZZmH7GUqkx4uPX6ckI81uDNwjFCZmfUesoMT7u-4xzYnCn1UUrfAFnW-KTz2VpzQOyUbiBIxeeF46mIOWlSkT7GT-MDJll8CMwjnv7JM_gq73xmcH4rRN6EYLLrrmMzYJ4UU9LNCa501SnOGNZsi0d7P7ei7YcimoDkIeKjP68he0GnL7kx7uUFK39ujA=w1233-h693-no" hspace="20" width="360" alt="emptyHome.png">

 <img src="https://lh3.googleusercontent.com/msfFywY8OqkSCN7cCY0ejb6Gg0eENRIZ5OHnhBHJp194iEZyXtJqyGy6ZgthT4Iw12_1sI8XBvhmeAwdmhF3for8qsTZxldpqPbNVjSQbHfp5DDuqVqtWHsPiWksihKyEg2nktlSEj_rCJhcM6wFjScc-hQQeaJ7xhaDIey98548DE4mYlbQfZwBIyHovqQO2XbSW3uKs7u_FD3GUWoZgFbVts28PYWt8dsmVkSXvZxZcEI1gFlq1YXSBx2s9JTeo7DAPH1a8J_Zwnir--mfKH1KPHRp9htx76GrBby0XV_NgR607oOD6G2kKqUu1HWqk8_mZ1LBw70cCpFoF2F60JP5SpS0NcGvipBFNfCVoDGRlfVKWzMiDYdw1qX8jqrrp8OE-DiPbFCBNm3OT1QbhGZTu6KPCjjHrqild308BCSj8m2Ocq4oYnnazKFpGkA1IkvZSiVJeljYGCpwcPLC-L9Utf8Jp0M2gET-F6gipQ-sowWPaRZumjylP98JS0CcZjZG0iO7OKe1iMT1EEDlO9ORy6gLpuIlQLAEml6bfTiaHJyhwWQ-ixhGWdimFPQohE1mxwq_qx0PuXZE2ZYyyxIKtMJ8mUsi346iaE38dJ_EtyOjNg98Tr5LyrkVwWg1HbVfF22E7XfoudcCxLY0qXhvS8KYNac9CdqVhkDyJ-Nbx-zK2rhldQ=w1233-h693-no" width="360" alt="pagination.png">

 <img src="https://lh3.googleusercontent.com/pQWytQfyt7aRng5J1z_K85Mxzrv5byOJxAvpfUT77v1InJreOZXdRr-0yBECyN11ecBgAyFzwhB9irNbM6IDgyvLnDuv_nMhHHlARXf5yYRgK1InlEUKcNZI2jbJ6O_1KT5oPb_ezqno1R9QCTkD1XSz7HH8K8nrWaLw8Fxe-pFq1G2S8myiYJFWmrNQxbmcAAhe47ZJPMuWeE7LMBJyiI9WQ6JfYLOA6vopEtrcI-8OfrQpp2YyjjTJqT7AfL1Tgd5XqSmoy6ZN8bOuYuz_sQk0AiQIi_9OHVT7Aalabl67ZK2JZzRBQ4BVX5HsdZxaESHjKLPLYxou4Ku2-8rCOwTlgZDVLNI_rZbu5EuWbXl-05zSdxL2m88kc8tPWzblTGrzOy2cG8CycFZ3IK1Wd38YEAlD46VzNX0PQ5oel1Zj7ygx9BxE7uUNi3gamKFfR-sYZ8Zf6EQz3B8oC4SYI4nYkBgyWyCgSSrnV7IYU7FB_sOAq_TlklMG69nqGWQFPgcWfecktE-1gTYhlR2aVrRJA-8ldAeBEBQGZ6ior7LthH5eysNHHIkp6IS0QzHCtcS0Ccrnoeo0wnEYZwvE-0ZGzAHSe0_vdJ7qitv2L_Xk8lU9bUS0dJbxweuzxFMvjiwnXL6JlpJF9fii1nz4NF1pEfvpc_9baZERk1c0a5hGfdT1Umc6tQ=w1233-h693-no" hspace="20" width="360" alt="product.png">

 <img src="https://lh3.googleusercontent.com/VC9TB9Cly0o6mQOhSiIbPPlLSuFLygKd9_peEM8sPVP8w0vzwXS_US95sU0GO9TOcPnhhrMssgEKJfxiSVYen2k9_F7kOr-km2PoPgynTx3OdyC7e9R6Cui52ziQZ8hFvzNoKpTknAOq4Ke-7WqjCZwqlfywN13JUAIqtRkhQX6TUMRSqnIJVIQVQjJL25Ps3Ph7KMHR5vn3eWFQHCjLnkeP8XUw_P4QVE7etGTOfYY31xNPeFU-zqBWjcZKRXr8jnLguNrnBfebE3LOOCFaNlzGg8BZ_hvxSFFsOdFxAzrS15yv2FmSUZWqZYq-VM_Oy5BBM3vlqqBXd60w1xGY2DJBzZ3XVb9l8vnQK6Xwj6ga-25_9WLD2yNLf0RXvxAw5ftROuunD_K-b6O7XB4NrdQgMdF4PWCbPZOPP8OSRlDdayn5mkYaEHMkqaKv2DNfKfn7iQk4B4zFMxESTi0EePR7qo9_kRe5t6Ymy6JQb_fT6B8TOxa-Xvbdm9qTSe57NgueIMwBQuA4a4-VMSYLrPunW3NOPbS0KYkqSsKkFsiz-JmHcISLCy_uXJdoZkiv7LL9XPfB-pcd3d6TrNEZlG5qU61-MEwjoBblv58SjjJaNuNUmqShsbzKuKTk23aq67fL3-M6dsB3tefnw-vSnNCzd5mpvqdclP1t0YSIZT1xXZ4aMPETEg=w1233-h693-no" hspace="20" width="360" alt="productErr.png">

 <img src="https://lh3.googleusercontent.com/eMVIcY055Ro-PS4_1NiKK_7_RmSWwHckuRDGCxUQhIXz-WeeCC9kVSG-GAYkk8PEdgK2c_Fwy5UZpSwREYU_bpi9vfap6UbHn8gRwKV596a7G_9UnOTsEtSlM5ZGYvCtpUbmd5RPnlnuIMySZWnh-76QGIQWiN-kvp9irwB-I412YxiZhmpsQ03v3NEjFpDk2hCh6ILOM8JeL96KwyDN93dtBB33rMGqbK8tdoWxIS3GkVjfa1qlolIZJlHySUaRB_QopBtu_ecmVrF6XsXHwd1HI-4uAO2OT0-EWCYX9dZQ2BxhyTb18xcJdMdgtfJK4LvqHzrLSfkxit1l7HjuXUUUibACNCOs1cbtaGOKBwhDlFl3vHx0Snb0faNBUS-Ce4W4itZddDYjQ-a2eyO_9nRiasLccX_nHgb7lUwgvkmBnax5azGhohOTVEpMeLoNo4VlJtoFOJwsaRwq14GUIse1uuvtOiNNbGiPeyMV2Fh8bpVD6IrRX_HPYJyq9PZ4G_n_cha5oXlxJeXMiDTpCsvNX4gN6AG_qXKjM-nZKgGRXl9O3kTcWOfIkvSeoexDH0DFihUaBspkiWQAcFpyNbkea8sh5H75VWH_Thn_igPITe2u3UFEq2LRzhEpum5CG1KOguU_P4K8o9BoQkicU48phypZAuzNk6LAKuzHBpzDbITwfLrjoA=w1233-h693-no" width="360" alt="order.png">

 <img src="https://lh3.googleusercontent.com/ZF83mTU0FmbkGb0uQk47oraWWLvjcNy5OiTTjAU74DV-ECRdj-e0wyvVUbchfnE8b0V6xctzsy-oS8Lais9sKmpdRPfwhjnbSsD-Qk7U4JaNUaco5tnx2lQOwFilZEye9BEgOpOim3Q9l_oqc9zOd9KMpotwutqI1k96NUklg4dPIHeZXzwVCTAoinNbMttrinE89LI1UbJ-qHM0UtuLmhd30QPNsXFwBQVOLVSjOU7rBf48wkik9GHuBvyV8MsYrd3XMTI32j0niQM0aeprOr8SCi5DZWx0sTLOE2LVBxGnozR1_sLH5SFI3Q1cEKFMJlcMlHBakYmzpffh1I2q5L2Kbi_sJ3xEIGYjORDFAIptUkGYmGLCXpm4SEZbHvrEY0JgTu7C5q20P6etHQO-w5P_Nb21Ju5aLJYnQWud3YNL1wEwQvAVnhq0xFdxrT3yhcdtXIFJ26et80ROGU9P2yAGl6A_N_In6CiXSEZw-TJwfPniVTRmMTly6doZ8P4JYEn13EPI7x2PM7ALz2UwUENu_ZMf6ZmG_BCf1P-0lxxIGRt2PqXu2VxEkLhW8ywHi1IaKOM_VTpuDndSdPPfiRFNLr6H-o4e7GEYQdSiZoV5t0a_HlDdomr9DhWtQZbCbVua80WInDLsB8gaMz7vloD5EVWKrJ9MRDykjLj_T7YhzkljSMYorQ=w1233-h693-no" hspace="20" width="360" alt="orderDetails.png">

 <img src="https://lh3.googleusercontent.com/SvtZYm6BrIYQv5hX7PAwC3YU4aElHvWq6fI4ZGXXTbgsPeme-S21dRioDrNWyOPmk6CFIs3YHRuRPwvrCA6TctZXReOzvl8Z8v5BvG3oQwrJUWdQKiROy8k9yaWCMCA9RvfruGAwLRDttOd4J7_VOXcjz1nCr8m081QInYq4uAgHOhRqq_RSvU3qiCHYPOt88Gd7PE3c44m2qTuNNrvJC4b3hEJh-XCwJvbhXO3RIyFZhd4X7xmUvP7zQEDh1ex66CVIV1Jl4-9uWdrVoWdVGzMmui8tWxHvdg7PvvlUkCUjg-NqGoDBpNK3Z-WAJh5sOo7DNncgNkyAYOTTbvHZE3NR4EgJpePnRdYBIFCSyIpEIUSNIeLNs9gw-gXCU8FltxgfCcUIbaR2KOHM2wqI1_oCCSkQoqBxLPZK50EAp00NLHABdpNXNUIpDhVssKifeCHEUy9mczr671biFYxyetUQgCpGNxR51c5RnBjTX-bNunvVx1vRA3vGFmlZ49CddgHPOD28xvEJB9Me0bLgOm6Yeu-nLLmJfNKgy1UJxbWBpVnyq6BLblIilV4DELTIq6bB3wF4eAAoP1WzErtHhm4GLD-DKOaeSjN740I1--8wKkYO3JFdJoSIh1FkAnB06zbKxa0Zq7NodL7LH3bSotcaB-VSVoLT1pFbK38J8vSj_A-2UYOEZQ=w1233-h693-no" width="360" alt="userInfo.png">

 <img src="https://lh3.googleusercontent.com/-5LyfZW4rTWw5jgISQYLRTIyWCAigOWFDlU1xd-7SgLwzW1xHdLSN8lFg_pQ6oh7Yj4cBcnNduG-PY6l6tK-LKXuhNN86cXMW9yMVGU_G3h4HRd6mVtUUgtgrDm6cy_qJuOfzMEsRqxbxr5KllIXcCKIv0SPcSH32u6lVn9Dcg4TwzrIUfjaQE_Dts14XMYMjXIBY2eeIHrkHNlcJPe5xpicXcvczTgljOn5BZJTqRAdzzz8MaXElIkVOmX5E-kaFl_SVvJFuO74FPpCwBXXPGjL_LHfpxaNFoM_5rLGx0SP7Fm4Rrwp-8pdu22D8-tWQkER8QlXqThnO1V9ASQ1oHNU_j_I5P9tQ7c5EFMVbuhmrIfvaofT0ex3uubcVX8SuTnfI91TKQMF2Wu4e9jNtqZEJyWPpu_ZVMxDbVYBmfSv1uA3zOrfM3utI1YE_rdAEcgK1RCAydauPSp4mu781_cc1pSbXLIJjQS5O5iJMZhTBk7z8-czfHCT3LyV_T2fkyMspNYvi0kgqQNKn_gJO-zbLOvc1ctX5WoAe8069XDOGewZDktvyZFVOP8wYEIMbYauk0Px-wbXIZ9CGeXRKet8Hm14y_muAiCc3MFnHKgJqM8mItqIWzWq0Etl7I75vysAafd2krsY_zgGm_l4_6Oc8i2rCjuUZE0F5yJJ4rRmn6Ppc1qIxA=w1233-h693-no" hspace="20" width="360" alt="updatePassword.png">

 <img src="https://lh3.googleusercontent.com/h5ghajS6cNpmzfD-TXcuQO6aIPbRPp0IBbmNNAmsJpFTVYlMqK0me8b6XZSqqG93n_xp1V73HHZvMd_K4aqcZkOlT2KGsNbfcs3g-R2N1AnyclCsz9IIWUPKOgZnDmp-BSOQChYYJWLQbpSDHVgT7O-KfbDQ2BApdmrxVLzZSsZXUFRkhXQ2D5gsCHfBK5kYkzoCmAzB7NYFJJej6gpJac31glDJKuWK_afSO11BO6YSDaREuho6w6bCwmTel9X5rWx5UHi06zXBHBilA0sWweF1sRqaLJ7dnh6rcbUlqR7lOySzbv7lQaWTzSg8PgnWOk4ua3stjfAWaqTLJEb2xoEyOdirBlachpjK5j7YT4oj30Aw652ZFPphQAHYFafRj3vWirlnjOnmqEwBSAS_7XlFu-JO4wMpCvcWlAZAC8aRYJFTdMePb5ppxxVub-FxxoNdr5cSVH66jW4DMB_4g_wJpHEC-k2drMH5wctXVpoFt0bcWX3Unsdas1a_LK9aEpTohYXyXMIry8S9HgDnMBaldhsJEG_rqo2IWLClN6NdLxKyHsBiJppu_24f-1tEO8155PAQ0bOL90ucMIokzTPhiha9b8HKH4Y-zjiA4b3cgx0hy06tIupjP2JFIBLJJXgeWsmAOhqHlEad5TCRA2xTg31MW4O0FRtKn9NYElb_djlwb63zRg=w1233-h693-no" width="360" alt="supplierErr.png">

 <img src="https://lh3.googleusercontent.com/XkihvhYSnZWEaZAEX37ulpzdVq0qUii5xdMFaZCTAbd5DS47yAPDnZf8uInSTK-_61mmEaLJROzrGDiEgS862fprIO5sbUY9W_T4HUIPwu0Djg67nRXmHIl4_Xab5rwMe9JJrmefVaf3TZNqu6C4jMZLr6peXai1PONJ3axvN0_PwNbQu_MBk6kRIWVYXN0NF5ljE852gcPjGhfpadAXmrK52VByG9RqmRMathzPkpHrah7_DxSOUJKWjWfrgkHmQLgpq_diwaZPjDdBSBz3Vf_jYVG7Kxg3ZvsqfMxKKl7Itq8SaC8bpP0OnqqTt-XzUH4f6T7sxnCR4CHWPBDw0ByOfhaZMMnnkpn_UEEQlqzaSHTsVL8QKn1JMNzDJea7o51wKU3aUQkWb7HBwjJPjkN0FREKfQfjqjNWK4oDS1IDY9Ldc7dIIFy9phdOhaf1a2bJkgSVAq8cF2ckZ1z6YkRGLL4up7H48gLa-FFjR4MRHErbAqmFSMRFkFSd61yTky0H7ZHZ5pCblf2ly1Kgk5d4HwwCftoVZWKR2kDB5KT91xlu4uHR6GngHftkWkKabDUdptiMgWucsrgFPO1X4f0lMF16R7ojbDwe_Cw6ynQR74Koq_-2qR2Y5qDqzitGkRO3mMy19IxkeEpJS_0q8PO5W9ENIrH5ydAqhN-7VV0CE9lIKB9Cuw=w1233-h693-no" hspace="20" width="360" alt="supplier.png">