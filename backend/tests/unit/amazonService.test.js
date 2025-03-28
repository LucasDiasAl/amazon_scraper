import { describe, it, expect, vi, beforeEach } from "vitest";
import AmazonService from "../../src/service/AmazonService.js";
import mockHTML from "../mocks/htmlMock.js";
import mockArray from "../mocks/fetchResultsMock.js";
import Product from "../../src/model/Product.js";
import AmazonController from "../../src/controller/AmazonController.js";

const correctResult = mockArray.map(t => new Product(t.productTitle, t.rating, t.numOfReviews, t.imageUrl));

describe("AmazonService", () => {
    let service;
    let fetchHTMLSpy;

    beforeEach(() => {
        vi.restoreAllMocks();
        service = new AmazonService();
        fetchHTMLSpy = vi.spyOn(AmazonService.prototype, "fetchHTML");
    });
    it("Should return an array of DTOs with the scraped products, including any missing information about it.", async () => {
        fetchHTMLSpy.mockResolvedValue(mockHTML);
        const result = await service.scrapeAmazon("clothes");

        expect(result).toEqual(correctResult);
    });
    it("Should return null if no product was found.", async () =>{
        fetchHTMLSpy.mockResolvedValue("<html><body><h1></h1></h></body></html>");
        const result = await service.scrapeAmazon("cars");
        expect(result).toBe(null);
    })
});

describe("AmazonController", () => {
    let controller;
    let serviceMock;
    let res;
    beforeEach(() => {
        vi.restoreAllMocks();
        controller = new AmazonController();
        serviceMock = {
            scrapeAmazon: vi.fn(),
        }
        controller.service = serviceMock;

        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
    });

    it("Should return 200 and correct response for a valid query.", async () => {
        const req = ({query:{ q: "valid" }});

        serviceMock.scrapeAmazon.mockReturnValue(correctResult);

        await controller.scrapeAmazon(req, res);

        expect(serviceMock.scrapeAmazon).toHaveBeenCalledWith("valid");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(correctResult);
    });

    it("Should return 400 on an invalid query.", async () => {
        const req = ({query:{ }});

        await controller.scrapeAmazon(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Query is required." });
    });

    it("Should return 500 with message error.", async () => {
        const req = ({query:{ q: "somethingWillGoWtrong" }});

        serviceMock.scrapeAmazon.mockRejectedValueOnce(new Error("Something went wrong!"));

        await controller.scrapeAmazon(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Something went wrong!" });
    });

    it("Should return 404 with message error if no products were found.", async () => {
        const req = ({query:{ q: "somethingReallyCrazy." }});

        serviceMock.scrapeAmazon.mockReturnValue(null);

        await controller.scrapeAmazon(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "No products found!" });
    });
});
