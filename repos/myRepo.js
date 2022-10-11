
let fs = require('fs');
const { resolve } = require('path');

const FILE_NAME = './assets/test.json';

let myRepo = {
    get: function(resolve, reject){
        fs.readFile(FILE_NAME, function (err, data) {
         if (err) {
                reject(err);
            } 
            else {
                resolve(JSON.parse(data));
         }
        }); 
    },
    getById: function (id, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err){
                reject(err);
            }
            else {
                let person = JSON.parse(data).find(p => p.id == id);
                resolve(person);
            }
        })
    },
    search: function (searchObject, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let people = JSON.parse(data); 
                // Perform search
                if (searchObject) {
                    // EXAMPLE SEARCH OBJECT
                    // let searchObject = {
                    //     "id": 1,
                    //     "name": 'bob'
                    // };
                    people = people.filter(
                        p => (searchObject.id ? p.id == searchObject.id : true)
                    
                )}
                resolve(people);
            }
        })
    },
    insert: function (newData, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err){
                reject(err)
            }
            else {
                let people = JSON.parse(data);
                people.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(people), function (err) {
                    if (err){
                        reject(err);
                    }
                    else {
                        resolve(newData);
                    }
                });
            }
        })
    },
    update: function (newData, id, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let people = JSON.parse(data);
                let person = people.find(p => p.id == id);
                if (person) {
                    Object.assign(person, newData);
                    fs.writeFile(FILE_NAME, JSON.stringify(people), function (err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(newData);
                        }
                    })
                }
            }
        });
    },


    delete: function (id, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err)
            }
            else {
                let people = JSON.parse(data);
                let index = people.findIndex(p => p.id == id);
                if (index != -1) {
                    people.splice(index, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(people), function(err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(index);
                        }
                    })
                }
            }
        });
    }
};

module.exports = myRepo;