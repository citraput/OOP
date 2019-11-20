const fs = require('fs');
const Datastore = require('nedb');
let mysql = require('mysql');

class Config {
    constructor(configFile){
        this.configFile = configFile;
    }
    get(key){
        return this.configFile.get(key);
    }
    put(key, value){
        return this.configFile.put(key, value);
    }
    remove(key){
        return this.configFile.remove(key);
    }
}

class ConfigFileStorage{
    constructor(configFileJSON){
        this.configFileJSON = configFileJSON;
    }
    put(key, value){
        let path = './' + this.configFileJSON;
        let dataTemp;
        if (fs.existsSync(path)) {
            fs.readFile(path, (err, data) => {
                if (err) {
                    console.log('Tidak ada')
                };
                dataTemp = data;
                if (data.toString() == ''){
                    dataTemp = {};
                    dataTemp[key] = value;
                } else {
                    dataTemp = JSON.parse(data);
                    dataTemp[key] = value;
                }
                // console.log(data.toString());
                fs.writeFile(path, JSON.stringify(dataTemp, null, 2), err => {
                    if(err){
                        console.log('Failed to add data.');
                        return;
                    }
                    console.log('Successfully add data.')
                })
            });
        } else {
            dataTemp = {};
            dataTemp[key] = value;
            fs.writeFile(path, JSON.stringify(dataTemp, null, 2), err => {
                if(err){
                    console.log('Failed to add data.');
                }
                console.log('Successfully add data.')
            })
        }
    }
    get(key){
        let path = './' + this.configFileJSON;
        fs.readFile(path, (err, data) => {
            let dataTemp = JSON.parse(data)
            if(dataTemp[key]){
                console.log(dataTemp[key])
            } else {
                console.log('Key is not available.')
            }
            if(err){
                console.log('The data is not available.');
            }
        })
    }
    remove(key){
        let path = './' + this.configFileJSON;
        fs.readFile(path, (err, data) => {
            let dataTemp = JSON.parse(data)
            delete dataTemp[key];
            fs.writeFile(path, JSON.stringify(dataTemp, null, 2), err => {
                if(err){
                    console.log('Failed to delete the key and value.');
                    return;
                }
                console.log('Successfully delete the key and value.')
            })
        })
    }
}
  
class ConfigNedb {
    constructor(configFile) {
      this.configFile = configFile;
      this.database = new Datastore({ filename: this.configFile });
      this.database.loadDatabase();
    }
  
    put(key, value) {
      const insertPromise = new Promise((resolve, reject) => {
        this.database.insert({ _id: key, value: value }, (err) => {
          if (err) {
            reject('Error inserted the data to database.');
          }
          resolve('Successfully inserted the data to database.');
        });
      });

      insertPromise.then(data => console.log(data)).catch(this.database.update({ _id: key }, { $set: { value: value } }), (err, numReplaced) => {
        if(err){
            console.log('Error updated the data.')
        }
        console.log('Successfully updated data.')
      })
    }
  
    get(key) {
      const findPromise = new Promise((resolve, reject) => {
        this.database.findOne({ _id: key }, (err, docs) => {
          if (err) {
            reject(err);
          }
          resolve(docs);
        });
      });
      findPromise.then(data => console.log(data)).catch(err => console.log('Key is not available.'))
    }
  
    remove(key) {
      const deletePromise = new Promise((resolve, reject) => {
        this.database.remove({ _id: key }, {}, (err, numReplaced) => {
          if (err) {
            reject(err);
          }
          resolve(numReplaced);
        });
      });
      deletePromise.then(data => console.log(`Successfully deleted: "${key}" from the database.`)).catch(err => console.log('Failed to delete.'))
    }
  }
  

// class ConfigMysql{
//     constructor(connection){
//         this.connection = connection;
//         // this.connection = mysql.createConnection(connection);
//         // this.createTable = `CREATE TABLE IF NOT EXISTS BIODATA(
//         //     id int primary key auto_increment,
//         //     key VARCHAR(255)not null,
//         //     value VARCHAR(255)not null
//         //   )`;
//     }
//     // get(){

//     // }
//     put(key, value){
//         let connection = mysql.createConnection(this.connection)
//         connection.connect(function(err){
//             if(err){
//                 return console.log('Error: ' + err.message);
//             }
//             console.log('Connected!')
//             // let createTable = `CREATE TABLE IF NOT EXISTS BIODATA(
//             //                     id int primary key auto_increment,
//             //                     key VARCHAR(255)not null,
//             //                     value VARCHAR(255)not null
//             //                   )`;
//             // connection.query(this.createTable, function(err, results, fields){
//             //     if(err){
//             //         console.log(`Error: ` + err.message);
//             //     }
//             //     console.log('Success')
//             // });
//             // connection.end(function(err){
//             //     return console.log(err.message)
//             // })
//         })
//     }
//     // get(key){

//     // }
//     remove(key){

//     }
// }

// CONFIG FILE STORAGE
// const clase = new Config(new ConfigFileStorage('config.json'))
// console.log(clase.get())

// const config = new Config(new ConfigFileStorage('config.json'))    // Use local file system to store config file.
// console.log(config.get())

// NEDB
const configDb = new Config(new ConfigNedb('config.db'))           // Use NeDB.
// configDb.put('site_name', 'Blog')
// configDb.put('maintenance', false)        // Be able to save boolean.
// configDb.put('age', 30) 
// configDb.put('meta', {"description": "lorem ipsum"}) // Be able to save object or array.
// configDb.get('site_name')
// configDb.put('site_name', 'Perfect Blog')    // Will update the "site_name" with new value.
// configDb.remove('site_name')        // Remove "site_name" key.
// configDb.get('age')

// MySQL
// const connection = {username: 'root', password: '', db: 'config'}

// const configMysql = new Config(new ConfigMysql(connection))        // Use MySQL database as config storage.
// console.log(ConfigMysql)
// console.log(config.put('site_name', 'Blog')) 
// console.log(configMysql.put('site_name', 'Blog')) 
// console.log(configDb.put('percobaan_2', 'C'))         // Be able to save string.
// console.log(configDb.put('maintenance', false)) 
// console.log(config.put('maintenance', false))        // Be able to save boolean.
// console.log(configDb.put('age', 30))                   // Be able to save number.
// console.log(configDb.put('meta', {"description": "lorem ipsum"})) // Be able to save object or array.

// config.get('site_name')            // Will return "Blog".

// config.put('site_name', 'Perfect Blog')    // Will update the "site_name" with new value.

// config.remove('site_name')         // Remove "site_name" key.

// config.get('site_name')            // Return null, because "site_name" was deleted.
// console.log(configDb.get('age'))
// console.log(configDb.remove('age'))
