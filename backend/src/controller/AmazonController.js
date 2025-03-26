import AmazonService from "../service/AmazonService.js";

class AmazonController {
    constructor() {
        this.service = new AmazonService()
    }
    scrapeAmazon = async (req, res) => {
        try{
            const keyword = req.query.q;
            if(!keyword) return res.status(400).json({error : "Query is required"});
            const products = await this.service.scrapeAmazon(keyword);
            res.status(200).json(products);

        }catch (e) {
        res.status(500).json({error: e.message});
        }
    }
}

export default AmazonController;
