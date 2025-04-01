export class Header {
    constructor(title) {
        this.title = title;
    }

    render() {
        const header = document.createElement('header');
        header.innerHTML = `<h1>${this.title}</h1>`;
        return header;
    }
}