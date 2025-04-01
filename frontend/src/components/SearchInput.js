export class SearchInput {
    constructor(onSearchCallback) {
        this.onSearchCallback = onSearchCallback;
    }

    render() {
        const container = document.createElement('div');
        container.classList.add('search-container');

        const input = document.createElement('input');
        input.id = 'keyword';
        input.type = 'text';
        input.placeholder = 'Enter search word.';

        const button = document.createElement('button');
        button.textContent = 'Scrape';
        button.onclick = () => {
            const keyword = input.value.trim();
            this.onSearchCallback(keyword);
        };

        container.appendChild(input);
        container.appendChild(button);
        return container;
    }
}