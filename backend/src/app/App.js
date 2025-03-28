import express from "express"
import router from "../routes/ProductRoutes.js"

class App {
    constructor() {
        this.app = express();
        this.router = router;
        this.app.use("/scrape", this.router);
        this.app.use(express.json());
        this.instance = null;
    }

    start() {
        try {
            this.instance = this.app.listen(3000, () => {
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
