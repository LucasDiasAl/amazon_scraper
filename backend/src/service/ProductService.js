import axios from "axios";
import {JSDOM} from 'jsdom';
import Product from "../model/Product.js";
import Fetch from "../queries/Fetch.js";

class ProductService {
    constructor(keyword) {
        this.keyword = keyword;
        this.baseUrl = "https://www.amazon.com/s?k=";
        this.useAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }

    async #fetchHTML() {
        const formattedUrl = Fetch.formatUrl(this.baseUrl,  this.keyword);
        return await Fetch.data(formattedUrl, {
            "User-Agent": this.useAgent
        });
    }

    #parseHTML(html) {
        const dom = new JSDOM(html);
        const document = dom.window.document;

        const listItemsDiv = document.querySelector('[data-component-type="s-search-results"]');

        const products = Array.from(listItemsDiv.querySelectorAll('[cel_widget_id^="MAIN-SEARCH_RESULTS-"]')).map(item => {
            const title = item.querySelector('[data-cy="title-recipe"] h2 span')?.textContent || "N/A Title";
            const starRating = item.querySelector('[data-cy="reviews-ratings-slot"] span')?.textContent || "N/A Rating";
            const numberOfReviews = item.querySelector('[data-component-type="s-client-side-analytics"] span')?.textContent || "N/A Number of reviews"
            const imgUrl = item.querySelector('img.s-image')?.getAttribute("src") || "N/A Title";

            return new Product(title, starRating, numberOfReviews, imgUrl);
            });
        return products;
    }

    async scrape() {
        const html = await this.#fetchHTML();
        return this.#parseHTML(html);
    }
}
