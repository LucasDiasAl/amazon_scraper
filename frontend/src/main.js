import { Header } from './components/Header.js';
import { SearchInput } from './components/SearchInput.js';
import Results from './components/Results.js';
import FetchData from './utility/FetchData.js';

class App {
    constructor() {
        this.rootElement = document.getElementById("app");
        this.header = new Header('Amazon Product Scraper');
        this.results = new Results();
        this.init();
    }

    async handleSearch(keyword) {
        const input = document.querySelector("#keyword");
        input.placeholder = "Enter search word.";
        input.classList.remove("invalid-input");
        if (!keyword) {
            input.placeholder = "Please enter a search!!";
            input.classList.add("invalid-input");
            return;
        }

        this.results.loading();

        FetchData.fetchAjax(keyword, this.results);
    }

    init() {
        const searchInput = new SearchInput(this.handleSearch.bind(this));

        this.rootElement.appendChild(this.header.render());
        this.rootElement.appendChild(searchInput.render());
        this.rootElement.appendChild(this.results.render());
    }
}

export default new App();