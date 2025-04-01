class Results {
    constructor() {
        this.container = document.createElement("div");
        this.container.id = "results";
    }

    render() {
        return this.container;
    }

    update({status, response}) {
        this.container.innerHTML = '';
        if (status === 200) {
            this.container.id = "result-div";
            response.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");

                productDiv.innerHTML = `
          <img src="${product.imageUrl}" alt="${product.productTitle}">
          <h3>${product.productTitle}</h3>
          <p class="details">Rating: ${product.rating} stars</p>
          <p class="details">Reviews: ${product.numOfReviews}</p>
        `;
                this.container.appendChild(productDiv);
            });
        } else {
            this.container.id = "error-div";
            const message = status < 500 ? `${response.error}` : `${status} : ${response.error}`;
            const errorSpan = document.createElement("span");
            errorSpan.textContent = message;
            this.container.appendChild(errorSpan);
        }
    }

    loading() {
        this.container.innerHTML = '';
        const loader = document.createElement("div");
        loader.classList.add("loader");
        this.container.id  = "loader-div";
        this.container.appendChild(loader);
    }

}

export default Results;
