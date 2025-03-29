import { Router } from "express";
import AmazonController from "../controller/AmazonController.js";

class ProductRoutes {
    constructor() {
        this.router = Router();
        this.controller = new AmazonController();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/amazon", this.controller.scrapeAmazon);
    }

    getRouter() {
        return this.router;
    }
}

export default new ProductRoutes().getRouter();
