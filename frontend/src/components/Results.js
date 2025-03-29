export class Results {
    constructor() {
        this.container = document.createElement('div');
        this.container.id = 'results';
    }

    render() {
        return this.container;
    }

    update(data) {
        this.container.innerHTML = '';
        if (data && data.length > 0) {
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');

                productDiv.innerHTML = `
          <img src="${product.imageUrl}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p class="details">Rating: ${product.rating} stars</p>
          <p class="details">Reviews: ${product.reviewCount}</p>
        `;
                this.container.appendChild(productDiv);
            });
        } else {
            this.container.innerHTML = '<p>No products found.</p>';
        }
    }
}