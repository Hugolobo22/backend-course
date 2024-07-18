import express from "express";
import { body, checkSchema, validationResult } from 'express-validator';
import { CriarUsuarioSchema } from "./criar-usuario.schema.mjs";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const usuarios = [
  { id: 1, nome: "João Silva", login: "joaosilva", senha: "senha123" },
  { id: 2, nome: "Maria Oliveira", login: "mariaoliveira", senha: "senha456" },
  { id: 3, nome: "Carlos Pereira", login: "carlospereira", senha: "senha789" },
  { id: 4, nome: "Ana Souza", login: "anasouza", senha: "senha012" },
  { id: 5, nome: "Paulo Santos", login: "paulosantos", senha: "senha345" },
  { id: 6, nome: "Fernanda Costa", login: "fernandacosta", senha: "senha678" },
  { id: 7, nome: "Ricardo Lima", login: "ricardolima", senha: "senha901" },
  { id: 8, nome: "Luciana Alves", login: "lucianaalves", senha: "senha234" },
  { id: 9, nome: "Marcos Silva", login: "marcossilva", senha: "senha567" },
  { id: 10, nome: "Juliana Rocha", login: "julianarocha", senha: "senha890" }
];

app.get('/', (request, response) => {
  response.send({ data: "Hello world" });
});

app.get('/usuarios', (request, response) => {
  response.send(usuarios);
});

app.get('/usuarios/:id', (request, response) => {
  const id = parseInt(request.params.id);

  if (isNaN(id)) {
    return response.status(400).send({ msg: 'ID inválido!'});
  }

  const usuarioSolicitada = usuarios.find( usuario => usuario.id === id );

  if (!usuarioSolicitada) {
    return response.status(404).send({ msg: 'usuario não encontrada' });
  }

  return response.send(usuarioSolicitada);
});

app.post('/usuarios', 
  // body('nome').notEmpty().withMessage('Campo de nome não pode ser vazio'), 
  // body('login').notEmpty().withMessage('Campo de login não pode ser vazio'), 
  // body('senha')
  //   .notEmpty()
  //   .withMessage('Campo de senha não pode ser vazio')
  //   .isLength({ min: 8, max: 32 })
  //   .withMessage('Senha tem que ter entre 8 e 32 caracteres'), 
  checkSchema(CriarUsuarioSchema),
  (request, response) => {
    
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  const novausuario = {
    id: usuarios[usuarios.length - 1].id + 1,
    ...request.body
  };

  usuarios.push(novausuario);

  return response.status(201).send(novausuario)
});

app.put('/usuarios/:id', (request, response) => {
  const id = parseInt(request.params.id);

  if (isNaN(id)) {
    return response.status(400).send({ msg: 'ID inválido!' });
  }

  const indexUsuarioBuscado = usuarios.findIndex((usuario) => usuario.id === id);

  if ( indexUsuarioBuscado === -1 ) {
    return response.status(404).send({ msg: 'ID não encontrado'});
  }

  usuarios[indexUsuarioBuscado] = {
    id: id,
    ...request.body,
  };

  return response.status(200).send(usuarios[indexUsuarioBuscado]);
});

app.patch('/usuarios/:id', (request, response) => {
  const id = parseInt(request.params.id);

  if (isNaN(id)) {
    return response.status(400).send({ msg: 'ID inválido!' });
  }

  const indexUsuarioBuscado = usuarios.findIndex((usuario) => usuario.id === id);

  if ( indexUsuarioBuscado === -1 ) {
    return response.status(404).send({ msg: 'ID não encontrado'});
  }

  usuarios[indexUsuarioBuscado] = {
    ...usuarios[indexUsuarioBuscado],
    ...request.body,
  }

  return response.status(200).send(usuarios[indexUsuarioBuscado]);
});

app.delete('/usuarios/:id', (request, response) => {
  const id = parseInt(request.params.id);

  if (isNaN(id)) {
    return response.status(400).send({ msg: 'ID inválido!' });
  }

  const indexUsuarioBuscado = usuarios.findIndex((usuario) => usuario.id === id);

  if ( indexUsuarioBuscado === -1 ) {
    return response.status(404).send({ msg: 'ID não encontrado'});
  }

  const usuarioExcluido = usuarios.splice(indexUsuarioBuscado, 1);

  return response.status(200).send(...usuarioExcluido);
});

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});