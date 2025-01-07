"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let notes = [];

app.post("/note", (req, res) => {
    const { title, content } = req.body;
    notes.push({ title, content });
    res.json({ message: "ノートを保存しました", notes });
});

app.post("/notes", (req, res) => {
    res.json({ notes });
});

app.post("/note/delete", (req, res) => {
    const index = req.body.index;
    if (index >= 0 && index < notes.length) {
        notes.splice(index, 1);
        res.json({ message: "ノートを削除しました", notes });
    } else {
        res.status(400).json({ message: "無効なインデックス" });
    }
});

app.post("/note", (req, res) => {
  const { title, content, color } = req.body;
  notes.push({ title, content, color });
  res.json({ message: "ノートを保存しました", notes });
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));
