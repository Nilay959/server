const  shortid  = require('shortid');
const URL = require('../models/url');


async function generateShortURL(req,res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({
            error:"URL is required"
        })
    }
    // const longURL = body.url;
    // console.log("LONG URL:",longURL);
    // // console.log("CAME HERE IT");
    // const entry = await URL.findOne({longURL});
    // console.log("ENTRY:",entry);
    // if(entry){
    //     return res.status(200).json({
    //         message:"URL already exist"
    //     });
    // }
    const shortID =shortid();
    // console.log("AFTER HERE IT");
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        totalClicks : 0,
    })
    return res.status(201).json({
    shortURL:`http://localhost:8001/${shortID}`
})
}

async function redirectToOriginalURL(req, res) {
      const { shortId } = req.params;

  const entry = await URL.findOne({ shortId });
  if (!entry) {
    return res.status(404).json({ error: "URL not found" });
  }

  // ✅ increment clicks
  entry.totalClicks += 1;
  await entry.save();

  // ✅ return JSON instead of redirect
  return res.status(200).json({
    longURL: entry.redirectURL,
  });
}
async function getURLStats(req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOne({shortId});
    if(!entry){
        return res.status(404).json({error:"URL not found"});
    }
    // console.log("ENTRY:",entry);
    // console.log("particular entry:",entry);
    return res.status(200).json(entry);
};

async function deleteURL(req,res){
    const shortId = req.params.shortId;
    // console.log("shortId =>",shortId);
    const entry = await URL.findOne({shortId});
    // console.log("Entry => ",entry);
    if(!entry){
        return res.status(404).json({error:"URL not found"});
    }
    const deletedEntry = await URL.deleteOne({shortId});
    if(deletedEntry){
        return res.status(200).json({message:"URL deleted successfully"});
    }else{
        return res.status(500).json({error:"Error deleting URL"});
    }
}

async function updateURL(req, res) {
    try {
        const { shortId } = req.params;
        const { redirectURL } = req.body;

        const entry = await URL.findOne({ shortId });
        if (!entry) {
            return res.status(404).json({ error: "URL not found" });
        }

        entry.redirectURL = redirectURL;
        await entry.save();

        return res.status(200).json({ message: "URL updated successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
}

async function getAllURLStats(req,res){
    const entries = await URL.find({});
    // const arr = [entries];
    // console.log(typeof(arr));
    // console.log(entries);
    return res.status(200).json(entries);
}
module.exports = {
    generateShortURL,
    redirectToOriginalURL,
    getURLStats,
    deleteURL,
    updateURL,
    getAllURLStats
};