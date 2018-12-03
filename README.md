# Simple Microservice using SpringBoot and GraphQL.

 - Git clone the project for the directory of your choice
 - Then run it with the command:
    
    ```
     ./gradlew bootRun
     ```
     It may be better to use the wrapper cause it will download gradle for you in case you don´t have it yet.
 
 - Access it though the URL: http://localhost:8080/graphiql
 
 First example:
 
  - **Simple query**:
  
    ```
      query {
        cars {
          id,
          name
        }
      }
      ```
      
     . **Query getting cool cars**. This showcase how easy is just to pass a variable that defines a business rule implemented on the backend
     
     query {
        cars {
          id,
          name,
          isCool
        }
      }
      
      . **Query getting gifs from the cars**. With this varible, on the backend you access the API from giphy and then it will return the url 
      regarding the specific car passed
      
     ```      
     query {
        cars {
          name,
          giphyUrl
        }
      }
      ```
