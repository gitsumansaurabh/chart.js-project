const { Data } = require("../models/Data.model");

exports.createData = async (req, res) => {
  // this product we have to get from API body
  const data = new Data(req.body);
  try {
    const doc = await data.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllData = async (req, res) => {
  let condition = {};

  let query = Data.find(condition);
  let totalDataQuery = Data.find(condition);

  console.log(req.query);

  for (let key in req.query) {
    if (
      req.query[key] === "" ||
      req.query[key] === null ||
      req.query[key] === undefined
    ) {
      delete req.query[key];
    }
  }

  console.log(req.query);

  let Obj = {};

  for (let key in req.query) {
    let values = req.query[key].split(",");
    Obj[key] = values[values.length - 1];
  }

  console.log(Obj);

  if (Obj) {
    query = query.find(Obj);
    totalDataQuery = totalDataQuery.find(Obj);
  }

  const totalDocs = await totalDataQuery.count().exec();
  console.log({ totalDocs });

  try {
    const docs = await query.exec();
    res.set(totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};
