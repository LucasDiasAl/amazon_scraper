import {describe, it, expect, beforeEach, afterEach, vi} from "vitest";
import { fetch } from "undici";
import App from "../../src/app/App.js";
import AmazonService from "../../src/service/AmazonService.js";
import mockHTML from "../mocks/htmlMock.js";
import mockArray from "../mocks/fetchResultsMock.js";
import Product from "../../src/model/Product.js";

describe("AmazonController E2E Tests", () => {

    let service;
    let fetchHTMLSpy;
    let server;

    const correctResult = mockArray.map(t => new Product(t.productTitle, t.rating, t.numOfReviews, t.imageUrl));

    beforeEach(() => {
        vi.restoreAllMocks();
        service = new AmazonService();
        fetchHTMLSpy = vi.spyOn(AmazonService.prototype, "fetchHTML");
        server = new App();
        server.start();
    });

    afterEach(() => {
        server.close();
    })

    it("Should return 200 and products for a valid query.", async () => {
        fetchHTMLSpy.mockResolvedValue(mockHTML);

        const response = await fetch("http://localhost:3000/scrape/amazon?q=clothes");

        expect(response.status).toBe(200);
        const json = await response.json();
        expect(json).toEqual(correctResult);
    });

    it("Should return 400 if query is missing.", async () => {
        const response = await fetch("http://localhost:3000/scrape/amazon?q=");

        expect(response.status).toBe(400);
        const json = await response.json();
        expect(json).toEqual({"error": "Query is required."}
        );
    });

    it("Should return 404 if any products are found.", async () => {
        fetchHTMLSpy.mockResolvedValue("<html><body><h1></h1></h></body></html>");

        const response = await fetch("http://localhost:3000/scrape/amazon?q=clothes");

        expect(response.status).toBe(404);
        const json = await response.json();
        expect(json).toEqual({"error": "No products found!"}
        );
    });

    it("Should return 500 if error occurs.", async () => {
        fetchHTMLSpy.mockRejectedValueOnce(new Error("Something went wrong!"));

        const response = await fetch("http://localhost:3000/scrape/amazon?q=clothes");

        expect(response.status).toBe(500);
        const json = await response.json();
        expect(json).toEqual({"error": "Something went wrong!"}
        );
    });
});
