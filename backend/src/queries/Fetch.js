import axios from "axios";

class Fetch {
    static async data(url, headers = {}) {
        try {
            const response = await axios.get(url, {headers,
            });
            return response.data;
        } catch (e) {
            throw new Error(e)
        }
    }
    static formatUrl(baseUrl, queryParam) {
        return `${baseUrl}?q=${encodeURIComponent(queryParam)}`;
    }

}

export default Fetch;
