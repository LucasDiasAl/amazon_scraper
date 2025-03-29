import { Header } from './components/Header.js';
import { SearchInput } from './components/SearchInput.js';
import { Results } from './components/Results.js';

class App {
    constructor() {
        this.rootElement = document.getElementById("app");
        this.header = new Header('Amazon Product Scraper');
        this.results = new Results();
        this.init();
    }

    async handleSearch(keyword) {
        if (!keyword) {
            alert('Please enter a search keyword.');
            return;
        }

        this.results.update([{ title: 'Loading...', imageUrl: '', rating: '', reviewCount: '' }]);

        try {
            const response = await fetch(`http://localhost:3000/scrape/amazon?q=${encodeURIComponent(keyword)}`);
            const data = await response.json();
            this.results.update(data);
        } catch (error) {
            this.results.update([{ title: 'Error: ' + error.message, imageUrl: '', rating: '', reviewCount: '' }]);
        }
    }

    init() {
        const searchInput = new SearchInput(this.handleSearch.bind(this));

        this.rootElement.appendChild(this.header.render());
        this.rootElement.appendChild(searchInput.render());
        this.rootElement.appendChild(this.results.render());
    }
}

export default new App();