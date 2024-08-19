function infoController(req,res) {
    return res.status(200).json({
        message: "API is live"
    });
}

module.exports=infoController