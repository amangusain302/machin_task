const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Library = require("../models/libraryModel");

exports.addNewBook = catchAsyncError(async(req, res, next) => {
 const {book_name , description} = req.body;
 const author = req.user._id;
 const newBook = await new Library({book_name , author , description}).save();
 res.status(201).json({
    success : true ,
    message : "New book created successfully",
    data : newBook
 })
})

exports.getBooks = catchAsyncError(async(req, res, next) => {
    const books = await Library.aggregate([
        {
            $lookup : {
                from : "authors",
                localField : "author",
                foreignField : "_id",
                pipeline : [
                    {
                        $project : {
                            password : 0
                        }
                    }
                ],
                as : "author"
            }
        },
        {
            $unwind : "$author"
        }
    ])
    res.status(200).json({
        success : true,
        books
    })
})


// javascript quesrion

let data = [{
    price : 18,
    quantity : 25,
    option : "yes"
},
{
    price : 20,
    quantity : 15,
    option : "no"
},
{
    price : 15,
    quantity : 20,
    option : "no"
},
{
    price : 23,
    quantity : 25,
    option : "yes"
},
{
    price : 23,
    quantity : 20,
    option : "yes"
},
{
    price : 12,
    quantity : 5,
    option : "yes"
},
{
    price : 20,
    quantity : 25,
    option : "no"
},
{
    price : 12,
    quantity : 5,
    option : "yes"
},
{
    price : 5,
    quantity : 10,
    option : "no"
}
];

exports.jsTask = catchAsyncError(async (req, res, next) => {
    const newData = data.filter(item =>  item.option === "yes")
    res.status(200).json({
        success : true,
        data : newData
    })
})