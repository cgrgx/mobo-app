var db;

function errorHandler(error) {

    console.error("sql error:" + error.message);
}
var DB = {
    createDatabase: function () {
        var shortName = "cgReviewDB";
        var version = "1.0";
        var displayName = "DB for cgReviewDB app";
        var dbSize = 2 * 1024 * 1024;

        //success message if database create
        function dbCreateSuccess() {
            console.info("Success: Database created successfully");
            //create tables after database is created
            DB.createTables();
        }

        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
        //drop state table if exists and then create database
        db.transaction(function (tx) {
            var sql = "DROP TABLE IF EXISTS state;";
            tx.executeSql(sql, [], function () {
                console.log("Success: Drop table 'state' successfully");
            }, errorHandler);
        });
    },
    createTables: function () {
        db.transaction(function (tx) {
            //create state table
            var sql1 = "CREATE TABLE IF NOT EXISTS state( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(20) NOT NULL);";

            var options = [];

            tx.executeSql(sql1, options, function () {
                console.log("Success: Create table 'state' successfully");
                // initialize with 5 records
                var sql2 = "INSERT INTO state (name) VALUES (?),(?),(?),(?),(?)";
                var options = ["Ontario", "British Columbia", "Alberta", "Nova Scotia", "Manitoba"];

                tx.executeSql(sql2, options, function () {
                    console.log("Success: Insert data into 'state' table successfully");
                }, errorHandler);
            }, errorHandler);

            //create review table
            var sql3 = "CREATE TABLE IF NOT EXISTS review( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "restaurantName VARCHAR(30) NOT NULL," +
                "restaurantId VARCHAR(20) NOT NULL," +
                "stateId INTEGER NOT NULL," +
                "reviewerEmail VARCHAR(30)," +
                "reviewerComments TEXT," +
                "hasRating VARCHAR(1)," +
                "rating1 INTEGER," +
                "rating2 INTEGER," +
                "rating3 INTEGER," +
                "FOREIGN KEY(stateId) REFERENCES state(id));";

            var options = [];

            function successCallBack() {
                console.info("Success: Create table 'review' successfully");
            }

            tx.executeSql(sql3, options, successCallBack, errorHandler);
        });
    },
    dropTables: function () {
        db.transaction(function (tx) {

            //drop both 'state' and 'review' tables
            var sql1 = "DROP TABLE IF EXISTS state;";
            var sql2 = "DROP TABLE IF EXISTS review;";
            var options = [];

            function successCallBack() {
                console.info("Success: Drop tables 'state' and 'review' successfully");
            }
            tx.executeSql(sql1, options, successCallBack, errorHandler);
            tx.executeSql(sql2, options, successCallBack, errorHandler);
        })
    }
}