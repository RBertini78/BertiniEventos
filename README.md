# BertiniEventos

**BertiniEventos** é uma aplicação fullstack desenvolvida em C# (.NET) no backend e Angular no frontend. O sistema foi criado como parte de um curso prático e tem como objetivo oferecer uma plataforma completa para gerenciamento de eventos.
(Sistema ficou incompleto devido ao curso publicado na Udemy não ter continuidade e atualização)

## 📌 Funcionalidades

- **Cadastro de Eventos**: Criação e edição de eventos com informações detalhadas.
- **Gestão de Palestrantes**: Adição, edição e exclusão de palestrantes associados aos eventos.
- **Inscrições**: Gerenciamento de inscrições de participantes nos eventos.
- **Dashboard Administrativo**: Painel para visualização e controle de eventos e usuários.
- **Responsividade**: Interface adaptável para diferentes dispositivos.

## 🛠️ Tecnologias Utilizadas

### Backend

- **Linguagem**: C#
- **Framework**: ASP.NET Core
- **Banco de Dados**: SQL Server
- **ORM**: Entity Framework Core
- **API RESTful**: Implementação de endpoints para comunicação com o frontend

### Frontend

- **Framework**: Angular
- **Linguagem**: TypeScript
- **Estilização**: SCSS, HTML
- **Bibliotecas**: Angular Material, ngx-bootstrap

## 🚀 Como Executar o Projeto

### Pré-requisitos

- [.NET SDK](https://dotnet.microsoft.com/download)
- [Node.js e npm](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- [SQL Server](https://www.microsoft.com/pt-br/sql-server)

### Backend

1. Navegue até a pasta `Back/src`.
2. Restaure as dependências:

   ```bash
   dotnet restore
   ```

3. Aplique as migrations e atualize o banco de dados:

   ```bash
   dotnet ef database update
   ```

4. Inicie a aplicação:

   ```bash
   dotnet run
   ```

### Frontend

1. Navegue até a pasta `Front/BertiniEventos-App`.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie a aplicação Angular:

   ```bash
   ng serve
   ```

4. Acesse a aplicação em `http://localhost:4200`.

## 📂 Estrutura do Projeto

```
BertiniEventos/
├── Back/
│   └── src/                # Código-fonte do backend
├── Front/
│   └── BertiniEventos-App/ # Código-fonte do frontend
├── docs/                   # Documentação do projeto
├── BertiniEventos.sln      # Solução do Visual Studio
└── .gitignore              # Arquivos ignorados pelo Git
```

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.
