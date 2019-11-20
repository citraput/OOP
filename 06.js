class Auth_Class {

    constructor(username, password){
        this.username = username;
        this.password = password;
        this.saveData = {}; 
        this.saveData[this.username] = {
            id: 0,
            password: this.password,
            stillLogin: false,
            lastLogin: '',
            lastLogout: '',
        };
        this.idCounter = 0;
        this.userLogin = '';
    }

    login(obj){
        if(obj.password == this.saveData[obj.username].password){
            this.saveData[obj.username].stillLogin = true;
            this.userLogin = obj.username;
            this.saveData[obj.username].lastLogin = new Date();
            this.idCounter += 1;
            this.saveData[obj.username].id = this.idCounter;
            return `"${obj.username}" successfully login at ${this.saveData[obj.username].lastLogin}.`
        }
        return `Login failed. Your username didn't match the password.`
    }

    validate(obj){
       if(obj.username == this.username && obj.password == this.saveData[obj.username].password){
        this.saveData[obj.username].stillLogin = false;
           return `The username of ${this.username} is validated.`
       }
       return `Validation is failed.`;
    }
    
    logout(){
        if(this.userLogin){
            this.saveData[this.userLogin].stillLogin = false;
            this.saveData[this.userLogin].lastLogout = new Date();
            return `You have logged out at ${this.saveData[this.userLogin].lastLogout}.`
        }
    }

    user(){
        if(this.userLogin){
            return `Current login by user: "${this.userLogin}" with last login: ${this.saveData[this.userLogin].lastLogin}.`
        }
        return `No user logged in at this moment.`;
    }

    id(){
        if(this.userLogin){
            return `Current id: ${this.saveData[this.userLogin].id}`
        }
        return `No current id.`;
    }

    check(){
        if(this.userLogin != ''){
            return true;
        }
        return `Please login.`
    }

    guest(){
        if(this.userLogin == ''){
            return true;
        }
        return `You are a guest.`
    }

    lastLogin(){
        if(this.userLogin){
            return `Last login of user: "${this.userLogin}" is ${this.saveData[this.userLogin].lastLogin}.`
        }
        return `Last login cannot be found.`;
    }
}

const Auth = new Auth_Class('root', 'secret');
console.log(Auth.login({username: 'root', password: 'secret'}))      // If valid, user will log in.

console.log(Auth.validate({username: 'root', password: 'secret'})  ) // Just verify username and password without log in.

console.log(Auth.logout())        // Log out the current logged in user.

console.log(Auth.user())          // Get information about current logged in user.

console.log(Auth.id())              // Get the User ID.

console.log(Auth.check())           // Will returns true if user already logged in.

console.log(Auth.guest())           // Will returns true if user not logged in.

console.log(Auth.lastLogin())       // Get information when the user last logged in.