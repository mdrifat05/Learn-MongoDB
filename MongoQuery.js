// ================== use database =================

use your_database_name

//======================= Create Collection ================

db.createCollection("Your collection name")


//=============== Insert Data ============

//========== insert one ===========
db.C_name.insertOne({ column_name: value })
db.C_name.insertOne({
    date: new Date("......")
})

//========== insert many ===========
db.query.insertMany([{},
    {},
    {}, ......
])



// ================  Rename Column Name =============
db.myCollection.updateMany({}, { $rename: { "oldField": "newField" } })
db.myCollection.updateOne({‘ condition / column name’: ‘condition / column value }, { $rename: { "oldField": "newField" } })

// =========== Drop Column Name ===============

db.query.updateMany({}, { $unset: { "column name": 1 } })


//============== add a new column===========

db.myCollection.updateMany({}, { $set: { "newField": "default_value" } })


//=========== update ==================

db.myCollection.updateOne({ condition / column name: "condition/column value" }, { $set: { columnname: value } })
db.myCollection.updateMany({}, { $inc: { column_name: 1 } })


//==================== delete=============

db.myCollection.deleteOne({ condition / column name: "condition/column value" })
db.query.deleteMany({ condition / column name: { condition } })


//================= Find / Read data ====================


db.myCollection.findOne({ name: "John" })
db.myCollection.find({ age: { $gte: 25 } })
db.myCollection.find({ age: { $gte: 25 } }, { name: 1, age: 1 }) //projection/select
db.myCollection.find({ posteddate: { $gte: new Date('2022-01-03') } })

// =================== Count ===============
// Count
db.myCollection.find({ age: { $gte: 25 } }).count()


//=================== sort ===============

db.myCollection.find().sort({ age: 1 })


// =============== distinct ====================
db.personal.distinct("education.ssc")

// ==============sub string================
//========substr===========
db.personal.find({
    "c_namec": "A+"
}, {
    _id: 0,
    name: {
        $substr: [{ $toUpper: "$name" }, 0, 2]
    }
});


//================ query operation =============

// Equality
db.myCollection.find({ column_name: column_value })
    // Not equal
db.myCollection.find({ column_name: { $ne: value } })
    // Greater than, Greater than or equal to, Less than, Less than or equal to
db.myCollection.find({ column_name: { $gt: value, $lte: value } })
    // In array
db.myCollection.find({ column_name: { $in: [value, value] } })
    // Logical AND, OR, NOT
db.myCollection.find({ $or: [{ column_name: value }, { column_name: "value" }] })
    // Regular expression regex
    // find just any place
db.myCollection.find({ column_name: /John/i })
db.Netflix.find({ column_name: { $regex: "john", $options: "i" } })
db.Netflix.find({ column_name: { $regex: "^Jo" } }) // start with jo
db.Netflix.find({ column_name: { $regex: "hn$" } }) // find hn any place
db.query.find({ column_name: { $regex: "^jo", $options: "i" } })
db.Netflix.find({ column_name: { $regex: "[aeiou]" } })
db.Netflix.find({ column_name: { $regex: "J.*n" } }) //start j end n
    // Where clause
db.myCollection.find({ $where: "this.age > 25" })
    // and or
db.myCollection.find({
        $and: [
            { column_name: { $gte: value } },
            {
                $or: [
                    { column_name: "value" },
                    { column_name: "value" }
                ]
            }
        ]
    })
    // and or in
db.company.find({
        $and: [
            { column_name: { $gte: value } },
            {
                $or: [
                    { column_name: "value" },
                    { column_name: "value" }
                ]
            }
        ],
        column_name: { $in: ["value", "value"] }
    }, {
        column_name: 1,
        column_name: 1,
        ...
    }

)


//================ SEARCH / FULLTEXT SEARCH ========================
// Create an index
db.query.createIndex({ fieldName: "text" })
    // Syntax to list indexes
db.collection.getIndexes()
    // Syntax to drop an index
db.collection.dropIndex("indexName")
    // Text search
db.myCollection.find({ $text: { $search: "John" } })


// ==============lIMIT / SKIP =================

// ===========Limit=========
db.myCollection.find().limit(5)

//============skip=========
db.personal.find().limit(5).skip(0).sort({ pid: -1 })


// ================ Pagination =================

const pageSize = 5; // Number of documents per page
const pageNumber = 1; // Page number you want to retrieve (1-indexed)

const skipCount = (pageNumber - 1) * pageSize;

db.personal.find()
    .sort({ column_value: 1 })
    .skip(skipCount)
    .limit(pageSize);


//==================== switch case =========================

db.personal.find({
    "c_name": "value"
}, {

    name: 1,
    sscValue: {
        $switch: {
            branches: [
                { case: { $eq: ["$c_name", "value"] }, then: 5 },
                { case: { $eq: ["$c_name", "value"] }, then: 3 },
                { case: { $eq: ["$c_name", "value"] }, then: 4 },
                { case: { $eq: ["$c_name", "value"] }, then: 2 },
            ],
            default: 0
        }
    }
});


//============================== if condition ===============


db.personal.find({
    "c_name": "A+"
}, {
    _id: 1,
    name: 1,
    sscValue: {
        $cond: {
            if: { $eq: ["$c_name", "A+"] },
            then: 5,
            else: {
                $cond: {
                    if: { $eq: ["$c_name", "A-"] },
                    then: 3,
                    else: {
                        $cond: {
                            if: { $eq: ["$c_name", "A"] },
                            then: 4,
                            else: {
                                $cond: {
                                    if: { $eq: ["$c_name", "B"] },
                                    then: 2,
                                    else: 0 // Default value if none of the conditions match
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});

//=====================aggregate==================

// ==============Grouping========
db.myCollection.aggregate([
        { $group: { _id: "$column_name", count: { $sum: 1 } } }
    ])
    //==============multi grouping==========
db.myCollection.aggregate([{
    $group: {
        _id: {
            column1: "$column_name1", // Replace with your actual field name
            column2: "$column_name2" // Replace with your actual field name
        },
        count: { $sum: 1 }
    }
}])


// =============== Math operation ==============



db.numbers.aggregate([{
    $project: {
        addition: { $round: [{ $add: ["$num1", "$num2"] }, 2] },
        subtraction: { $round: [{ $subtract: ["$num1", "$num2"] }, 2] },
        division: { $round: [{ $divide: ["$num1", "$num2"] }, 2] },
        multiplication: { $round: [{ $multiply: ["$num1", "$num2"] }, 2] },
        remainder: { $round: [{ $mod: ["$num1", "$num2"] }, 2] }
    }
}]);


//================ concat ================
db.personal.aggregate([{
        $match: {
            "c_name": "A+"
        }
    },
    {
        $project: {
            _id: 0,
            concatenatedInfo: {
                $concat: [
                    "$name",
                    " ",
                    "$phone"
                ]
            }
        }
    }
]);



// ====================== count ==============


db.company.aggregate([{
    $count: "column_name"
}]);

//=============== sum ==========

db.company.aggregate([{
    $group: {
        _id: null,
        totalSum: { $sum: "$column_name" }
    }
}]);

//============ max/min/avg=============
db.company.aggregate([{
    $group: {
        _id: null,
        minPid: { $min / $max / $avg: "$column_name" }
    }
}]);



// =================== Date function ================

const currentDate = new Date(); // Get the current date

db.job_inbox.aggregate([{
        $addFields: {
            dateAsDate: { $toDate: "$date" }
        }
    },
    {
        $project: {
            date: "$dateAsDate",
            year: { $year: "$dateAsDate" },
            month: { $month: "$dateAsDate" },
            day: { $dayOfMonth: "$dateAsDate" },
            dayName: { $dayOfWeek: "$dateAsDate" },
            formattedDate: {
                $dateToString: {
                    format: "%d-%m-%Y",
                    date: "$dateAsDate"
                }
            }
        }
    },
    {
        $project: {
            date: 1,
            year: 1,
            month: 1,
            day: 1,
            dayName: {
                $switch: {
                    branches: [
                        { case: { $eq: ["$dayName", 1] }, then: "Sunday" },
                        { case: { $eq: ["$dayName", 2] }, then: "Monday" },
                        { case: { $eq: ["$dayName", 3] }, then: "Tuesday" },
                        { case: { $eq: ["$dayName", 4] }, then: "Wednesday" },
                        { case: { $eq: ["$dayName", 5] }, then: "Thursday" },
                        { case: { $eq: ["$dayName", 6] }, then: "Friday" },
                        { case: { $eq: ["$dayName", 7] }, then: "Saturday" }
                    ],
                    default: "Unknown"
                }
            },
            monthName: {
                $switch: {
                    branches: [
                        { case: { $eq: ["$month", 1] }, then: "January" },
                        { case: { $eq: ["$month", 2] }, then: "February" },
                        { case: { $eq: ["$month", 3] }, then: "March" },
                        { case: { $eq: ["$month", 4] }, then: "April" },
                        { case: { $eq: ["$month", 5] }, then: "May" },
                        { case: { $eq: ["$month", 6] }, then: "June" },
                        { case: { $eq: ["$month", 7] }, then: "July" },
                        { case: { $eq: ["$month", 8] }, then: "August" },
                        { case: { $eq: ["$month", 9] }, then: "September" },
                        { case: { $eq: ["$month", 10] }, then: "October" },
                        { case: { $eq: ["$month", 11] }, then: "November" },
                        { case: { $eq: ["$month", 12] }, then: "December" }
                    ],
                    default: "Unknown"
                }
            },
            formattedDate: 1,
            daysSinceCurrentDate: {
                $divide: [
                    { $subtract: [currentDate, "$date"] },
                    1000 * 60 * 60 * 24 // Convert milliseconds to days
                ]
            }
        }
    }
]);





// ======= grouping with data ============
db.personal.aggregate([{
        $group: {
            _id: {
                column1: "$column_name",
                column2: "$column_name"
            },
            count: { $sum: 1 },
            names: { $push: "$name" } // Collect names for each group
        }
    },
    {
        $project: {
            _id: 0, // Exclude the default _id field from the output
            data_name: "$_id", // Rename the _id field to "education"
            count: 1,
            names: 1
        }
    }
]);



// =========== select / projection ===============

// Project (Select specific fields)
db.myCollection.aggregate([
    { $project: { column_name: 1, column_name: 1 } }
])


// ================= match or find =================
// Match (Filter)
db.myCollection.aggregate([
    { $match: { age: { $gte: 25 } } }
])



// ======= sort with condition ==========



db.personal.aggregate([{
        $match: {
            "passYear.ssc": { $gte: 2005 },
            "education.ssc": { $ne: 'A+' },
            $or: [
                { "expSalary": { $gt: 80000 } }
            ]
        }
    },
    {
        $group: {
            _id: "$pid",
            count: { $sum: 1 }
        }
    },
    {
        $sort: {
            "_id": -1
        }
    }
])

//================ in ===========
db.job_inbox.aggregate([{
    $match: {
        cpid: 103,
        applyid: { $in: [201, 202, 210] }
    }
}])





// ==================== Join/ lookup ===============

// ===== join 1 table===========

// ========= left join ===========
db.job_inbox.aggregate([{
        $lookup: {
            from: "company",
            localField: "cpid",
            foreignField: "cpid",
            as: "company"
        }
    },

    {
        $project: {
            ...
        }
    }
])

// ============ Inner Join ==============


db.job_inbox.aggregate([{
        $lookup: {
            from: "company",
            localField: "cpid",
            foreignField: "cpid",
            as: "company"
        }
    },
    {
        $unwind: "$company"
    },
    {
        $project: {
            ...
        }
    }
]);



// ==========join 2 table ===============

db.job_inbox.aggregate([{
        $lookup: {
            from: "company",
            localField: "cpid",
            foreignField: "cpid",
            as: "company"
        }
    },
    {
        $unwind: "$company"
    },
    {
        $lookup: {
            from: "personal",
            localField: "applyid",
            foreignField: "pid",
            as: "applicant"
        }
    },
    {
        $unwind: "$applicant"
    },
    {
        $project: {
            ...
        }
    }
])

//=============== join with data puch ===========


db.job_inbox.aggregate([{
        $lookup: {
            from: "company",
            localField: "cpid",
            foreignField: "cpid",
            as: "company"
        }
    },
    {
        $unwind: "$company"
    },
    {
        $lookup: {
            from: "personal",
            localField: "applyid",
            foreignField: "pid",
            as: "applicant"
        }
    },
    {
        $unwind: "$applicant"
    },
    {
        $project: {
            ...
        }
    },
    {
        $group: {
            _id: null,
            total: { $sum: 1 },
            data: { $push: "$$ROOT" }
        }
    },
    {
        $project: {
            _id: 0,
            total: 1,
            data: 1
        }
    }
])




//======== pagination with slice=========

const pageSize = 5; // Number of documents per page
const pageNumber = 1; // Page number you want to retrieve (1-indexed)

const skipCount = (pageNumber - 1) * pageSize;

db.job_inbox.aggregate([{
        $lookup: {
            from: "company",
            localField: "cpid",
            foreignField: "cpid",
            as: "company"
        }
    },
    {
        $unwind: "$company"
    },
    {
        $lookup: {
            from: "personal",
            localField: "applyid",
            foreignField: "pid",
            as: "applicant"
        }
    },
    {
        $unwind: "$applicant"
    },
    {
        $project: {
            ...
        }
    },
    {
        $group: {
            _id: null,
            total: { $sum: 1 },
            data: { $push: "$$ROOT" }
        }
    },
    {
        $project: {
            _id: 0,
            total: 1,
            data: {
                $slice: ["$data", skipCount, pageSize]
            }
        }
    }
]);


//============== pagination with limit skip==========
use("bdj")

const pageSize = 5; // Number of documents per page
const pageNumber = 1; // Page number you want to retrieve (1-indexed)

const skipCount = (pageNumber - 1) * pageSize;

db.job_inbox.aggregate([{
        $lookup: {
            from: "company",
            localField: "cpid",
            foreignField: "cpid",
            as: "company"
        }
    },
    {
        $unwind: "$company"
    },
    {
        $lookup: {
            from: "personal",
            localField: "applyid",
            foreignField: "pid",
            as: "applicant"
        }
    },
    {
        $unwind: "$applicant"
    },
    {
        $project: {
            ...
        }
    },
    {
        $skip: skipCount
    },
    {
        $limit: pageSize
    }
]);