#!/bin/bash

#Create User

#Try a valid account 
printf "Trying a valid account\n"
curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST -d "{\"username\":\"test123\",\"password\":\"rodriquez\",\"firstName\":\"Juicy\",\"lastName\":\"JJJJJ\",\"email\":\"yandexKills@gmail.com\"}" https://activitize.net/mixbook/user/createUser

#Try an account missing info
printf "Trying an account with missing info\n"
curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST -d "{\"username\":\"user2\",\"password\":\"password123\",\"firstName\":\"\",\"lastName\":\"UserLast\",\"email\":\"\"}" https://activitize.net/mixbook/user/createUser

#Try an account with info that is too long
printf "Trying an account with info that is too long\n"
curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST -d "{\"username\":\"jdoe2\",\"password\":\"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\",\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"jdoe@gmail.com\"}" https://activitize.net/mixbook/user/createUser

#Login
printf "Getting a valid token\n"
token=`curl -i -H "Content-Type: application/json" -X POST -d '{"username":"paul","password":"rodriquez"}' https://activitize.net/mixbook/auth | awk -F\" '{print $4}' | sed '/^$/d'`

printf "Token is $token\n"

tokenCheck=${#token}

printf "Getting an invalid token\n"
badToken=`curl -i -H "Content-Type: application/json" -X POST -d '{"username":"JohnDoe","password":"password100"}' https://activitize.net/mixbook/auth | awk -F\" '{print $4}' | sed '/^$/d'`

printf "Invalid token is $badToken\n"

badTokenCheck=${#badToken}

if [ $tokenCheck -ge 200 ];
	then
		printf "Token is valid!\n"
else
	printf "Token is invalid\n"
fi


if [ $badTokenCheck -ge 200 ];
	then
		printf "badToken is valid!\n"
else
	printf "badToken is invalid\n"
fi

#Edit User

#Trying edit with a valid user
printf "Editting a valid account\n"
curl -i -H "Content-Type: application/json" -H "Authorization: $token" -X POST -d '{"firstName":"Juan"}' https://activitize.net/mixbook/user/editUser

#Trying edit with bad info
printf "Editing a valid account with bad info\n"
curl -i -H "Content-Type: application/json" -H "Authorization: $token" -X POST -d '{"firstName":""}' https://activitize.net/mixbook/user/editUser

#Trying edit with bad info
printf "Editing a valid account with more bad info\n"
curl -i -H "Content-Type: application/json" -H "Authorization: $token" -X POST -d '{"firstName":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}' https://activitize.net/mixbook/user/editUser
 
#Delete User
 
#Try to delete an invalid user
printf "Deleting an invalid user\n"
curl -i -H "Content-Type: application/json" -H "Authorization: $badToken" -X POST https://activitize.net/mixbook/user/deleteUser

printf "Deleting a valid user\n"
curl -i -H "Content-Type: application/json" -H "Authorization: $token" -X POST https://activitize.net/mixbook/user/deleteUser
 
