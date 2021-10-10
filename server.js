const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/crud");
var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error : "));
db.once("open", function () {
  console.log(" ");
});

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const kittySchema = new mongoose.Schema({
  desc: String,
  comp: Boolean,
});

console.log("Press a to create tasks");
console.log("Press b to read tasks");
console.log("Press c to update tasks");
console.log("Press d to delete tasks");
readline.question("Option : ", (opt) => {
  const cont = mongoose.model("tasks", kittySchema);
  if (opt === "a") {
    const fluffy = new cont({ desc: "abc", comp: true });
    fluffy.save();
    console.log("tasks are saved.");
  } else if (opt === "b") {
    cont.find({ comp: false }, (err, res) => {
      console.log(res);
    });
  } else if (opt === "d") {
    cont.deleteOne(
      {
        desc: "abc",
      },
      () => {
        console.log("deleted");
      }
    );
  } else if (opt === "c") {
    cont.findOneAndUpdate(
      { desc: "abc" },
      { $set: { name: "123 home" } },
      function (err, doc) {
        if (err) {
          console.log("Something went wrong ");
        }

        console.log(Updated);
      }
    );
  }
});
