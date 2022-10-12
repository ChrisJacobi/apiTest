// Bring in the express server and create application
let express = require('express');
let app = express();
let myRepo = require('./repos/myRepo');
let cors = require('cors');
// Use the express router object
let router = express.Router();

// Configure middleware to support JSON data parsing in request object
app.use(express.json());

// Configure CORS
app.use(cors());

// Create GET to return data
router.get('/', function(req, res, next){
   myRepo.get(function (data) {
    res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All data retrieved",
        "data": data
    });
   }, function(err) {
        next(err);
   });
});

// Create GET/search?id=n&name=str to search for people by 'id' and/or 'name
router.get('/search', function (req, res, next) {
    let searchObject = {
        "id": req.query.id
    };
    myRepo.search(searchObject, function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "People retrieved",
            "data": data
        });
    }, function (err) {
        next(err);
    });
});

// Create GET/id to return a single person
router.get('/:id', function (req, res, next) {
    myRepo.getById(req.params.id, function (data) {
        if (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Single person retrieved.",
                "data": data
            });
        }
        else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "The person '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The person '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function(err) {
        next(err);
    });
});

router.post('/', function (req, res, next) {
    myRepo.insert(req.body, function(data) {
        res.status(201).json({
            "status": 201,
            "statusText": "Created",
            "message": "New Person Added.",
            "data": data
        });
    }, function(err){
        next(err);
    });
});


router.put('/:id', function (req, res, next) {
    myRepo.getById(req.params.id, function (data) {
        if (data) {
        // Attempt to update the data
            myRepo.update(req.body, req.params.id, function (data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Person '" + req.params.id + "' updated.",
                    "data": data
                 })
            });
        }
        else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found.",
                "message": "The person you entered could not be found",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The person you entered could not be found"
                }
            });
        }
    }, function (err){
        next(err);
    });
})


router.delete('/:id', function (req, res, next) {
    myRepo.getById(req.params.id, function (data) {
        if (data) {
            // Attempt to delete the data
            myRepo.delete(req.params.id, function (data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Person '" + req.params.id + "' Deleted.",
                    "data": data
                    })
                });
            }
            else {
                res.status(404).json({
                    "status": 404,
                    "statusText": "Not Found",
                    "message": "Person '" + req.params.id + "' could not be found.",
                    "error": {
                        "code": "NOT_FOUND",
                        "message": "Person '" + req.params.id + "' could not be found."
                    }
                });
            }
        }, function(err) {
            next(err);
    });
})


// Configure router so all routes are prefixed with /api/v1
app.use('/api/', router);

// Create server to listen on port 5000
var server = app.listen(5000, function() {
    console.log('Node server is running on http://localhost:5000..');
}); 