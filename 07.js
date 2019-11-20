// const data = {
//     username: 'mul14',
//     email: 'email@example.com',
//     name: 'Mulia',
//     zip: 75324,
//     is_admin: true,
//     age: 28,
//   }

const data = {
    username: 'kaka__',
    email: 'testes',
    name: '',
    zip: 'asa',
    is_admin: true,
    age: 22,
  }
  
  const rules = {
    username: 'required|alphanum',
    email: 'required|email',
    name: 'required',
    zip: 'required|numeric',
    is_admin: 'boolean',
    age: 'numeric|min:21',
  }
  
  // The message is optional. But user should be able to customize the messages.
  const message = {
    required: 'The %s field is required.',              // Message will be "The username field is required."
    age: 'The %s field must a number.',                 // The age field must a number.
  }

class Validator {
    constructor(data, rules, message){
        this.data = data;
        this.rules = rules;
        this.message = message;
        this.errorMessage = [];
    }
    fails(){
        let fail = 0;
        let keys = Object.keys(this.data);
        for(let i = 0; i < keys.length; i++){
            if(!this.data[keys[i]] && Object.keys(this.message).includes(this.rules[keys[i]].split('|')[0])){
                this.errorMessage.push(this.message[this.rules[keys[i]].split('|')[0]].replace(/%s/, keys[i]))
                fail += 1;
            }
        }
        return fail > 0 ? true : false;
    }
    passes(){
        let success = 0;
        if(this.data.username && this.data.username.match(/^[a-z0-9]+$/i)){
            success += 1;
        } else if (this.data.username && !this.data.username.match(/^[a-z0-9]+$/i)){
            this.errorMessage.push('The username must be alphanumeric.')
        }
        if(this.data.email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){
            success += 1;
        } else if(this.data.email && !this.data.email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){
            this.errorMessage.push('The email address must be an email type (e.g.: example@example.com).')
        }
        if(this.data.name){
            success += 1;
        } 
        if(String(this.data.zip).match(/^\d+$/)){
            success += 1;
        } else if (this.data.zip && !String(this.data.zip).match(/^\d+$/)){
            this.errorMessage.push('The zip must be numeric.')
        }
        if(typeof this.data.is_admin == 'boolean'){
            success += 1;
        } else {
            this.errorMessage.push('The admin type must be Boolean.')
        }
        if(String(this.data.age).match(/^\d+$/) && this.data.age >= 21){
            success += 1;
        } else {
            this.errorMessage.push(`${this.message.age.replace(/%s/, 'age')} With minimum of 21 years old.`)
        }
        if(success == Object.keys(this.data).length){
            // console.log('Passes All The Validation');
            return true;
        } else {
            // console.log('Didn\'t Passed The Validation');
            return false;
        }
    }
    errors(){
        this.errorMessage.forEach(message => console.log(message));
    }
}
  
  const validator = new Validator(data, rules, message)
  
  validator.fails()          // If data contain not valid field, will return true.
  
  validator.passes()         // If all data valid, will return true.
  
  validator.errors()         // Show all error fields with error message.