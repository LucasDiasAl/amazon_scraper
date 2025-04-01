import express from "express"
import router from "../routes/ProductRoutes.js"
import cors from "cors";

class App {
    constructor() {
        this.port = process.env["PORT"] || 3000
        this.instance = null;
        this.app = express();
        this.router = router;
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use("/scrape", this.router);
    }

    start() {
        try {
            this.instance = this.app.listen(this.port, () => {
                console.log(`Servidor rodando na porta http://localhost:${this.port}`);
            });
        } catch (error) {
            console.error("Erro ao iniciar o servidor:", error.message);
        }
    }

    close() {
        if(this.instance) {
            this.instance.close();
        }
    }
}

export default App;
