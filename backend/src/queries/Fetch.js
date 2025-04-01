import axios from "axios";
import mockHTML from "../../tests/mocks/htmlMock.js";

class Fetch {
    static async data(url, headers = {}) {
        try {
            const response = await axios.get(url, {
                headers,
            });
            return response.data;
        } catch (e) {
            throw new Error(JSON.stringify({
                ERROR: e.message,
                STATUS_CODE: e.response?.status,
                HEADER: e.response?.headers,
                RESPONSE_DATA: e.response?.data
            }));

        }
    }
    static formatUrl(baseUrl, queryParam) {
        return `${baseUrl}?q=${encodeURIComponent(queryParam)}`;
    }

}

export default Fetch;
