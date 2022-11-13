# Lendsqr Demo Credit Application

## About
This is a Demo Credit. A Minimum Viable Product wallet service where users can signUp, create an account/wallet, fund their account/wallet, withdraw funds from their account/wallet and transfer funds to other user's account/wallet. This app uses JWT(Json Web Token) authentication.

This API was built using :
- NodeJs
- Express
- KnexJs
- MySQL
- Mocha - Chai
- AWS
- Heroku

## Usage
To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/Joveee05/lendsqr_demo_credit.git

# Navigate into the cloned repository
$ cd into the currently cloned directory

# Install dependencies
$ npm install

# Create .env file for environmental variables in your root directory like the config.env file and provide the keys

# Run the app
$ npm start

# Run app in production
$ npm run start:prod

# Run test
$ npm run test
```

## EndPoints
```bash
# SignUp

POST /api/v1/users/sign-up

POST /api/v1/users/login

#Create Account/wallet

POST /api/v1/accounts/create-account/:userId

```
## Link to Hosted API
- [Lendsqr](https://brian-etaghene-lendsqr-be-test.herokuapp.com/)


## ER - Diagram
This represents or describes the data and information structure implemented in the database.


![Image Link](https://github.com/Joveee05/lendsqr_demo_credit/blob/master/data/ER-diagram.png)

## Author
**©️ Brian E. Etaghene** 

## License 
**ISC**


