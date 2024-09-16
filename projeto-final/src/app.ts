import express from "express";
import { DesenvolvedorRouter } from "./routes/desenvolvedor/desenvolvedor.route";
import { GeneroRouter } from "./routes/genero/genero.route";
import { JogoRouter } from "./routes/jogo/jogo.route";
import { PlataformaRouter } from "./routes/plataforma/plataforma.route";
import { UsuarioRouter } from "./routes/usuario/usuario.route";
import { ValidarIdMiddleware } from "./shared/middlewares";

const app = express();

app.use(express.json());
app.use(ValidarIdMiddleware);
app.use('/desenvolvedores', DesenvolvedorRouter);
app.use('/generos', GeneroRouter);
app.use('/jogos', JogoRouter);
app.use('/plataformas', PlataformaRouter);
app.use('/usuarios', UsuarioRouter);
app.use('/teste', (req, res) => {
    res.send('oi');
});

export default app;