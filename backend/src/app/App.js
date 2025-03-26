import express from "express"
import router from "../routes/ProductRoutes.js"

class App {
    constructor(port) {
        this.app = express();
        this.port = port;
        this.router = router;
        this.app.use("/scrape", this.router);
    }

    start() {
        try {
            this.app.listen(this.port, () => {
                console.log(`Servidor rodando na porta http://localhost:${this.port}`);
            });
        } catch (error) {
            console.error("Erro ao iniciar o servidor:", error.message);
        }
        console.log("server is running o port 3000")
    }
}

export default App;
