### Create Backend with USER REST API with below operaions
        1. Create new User
        2. Read all users
        3. Read a User by ID
        4. Delete a User by ID 

        User schema --> { name, email,date of birth ,mobile number}

    Create a React app to work with above API

                        App
            |       |           |           |
            |       |           |           |
            Home   AddUser   UsersList     User   

        1. Home component need to be loaded when app launch
        2. After adding new User, it should navigate to UsersList
           automatically to display all Users( name,email)
        3. When we click on User card in UsersList component, it
           should navigate to User component along with that user obj