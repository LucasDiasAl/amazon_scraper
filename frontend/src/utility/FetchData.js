class FetchData {
    static xhttp = new XMLHttpRequest();
    static Url = "http://localhost:3000/scrape/amazon?q=";
    static data = {status: null, response: {}};

    static fetchAjax(keyword, results) {
        const encodedUrl = this.Url.concat(encodeURI(keyword));
        this.xhttp.open("GET", encodedUrl, true);
        this.xhttp.onreadystatechange = () => {
            this.data.status = this.xhttp.status;
            this.data.response = JSON.parse(this.xhttp.responseText);
            if(this.xhttp.readyState === 4) results.update(this.data);
        }
        this.xhttp.send();
    }
}

export default FetchData;