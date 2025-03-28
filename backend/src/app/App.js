import express from "express"
import router from "../routes/ProductRoutes.js"
import "bun";

class App {
    constructor() {
        this.app = express();
        this.router = router;
        this.app.use("/scrape", this.router);
        this.app.use(express.json());
        this.instance = null;
        this.port = process.env["PORT "] || 3000
    }

    start() {
        try {
            this.instance = this.app.listen(this.port, () => {
                console.log(`Servidor rodando na porta http://localhost:${3000}`);
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
