
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
    }
};

module.exports = myRepo;