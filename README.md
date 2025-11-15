# 🚀 Productivity Hub PWA v1.0

## Descrição

Este projeto implementa um PWA (Progressive Web App) focado em produtividade. Ele foi desenvolvido como entrega final do Bootcamp, integrando um frontend moderno com um backend próprio e o consumo de uma API pública.

O sistema consiste em uma API de backend desenvolvida em **Node.js (Express)** para gerenciar tarefas e uma interface frontend PWA desenvolvida com **React (Vite + TypeScript)**. O PWA permite ao usuário gerenciar uma lista de "Tarefas Foco" e também oferece uma "pausa" com o consumo da `TheCatAPI`.

Esta versão (v1.0) representa o Produto Mínimo Viável (MVP) do sistema, totalmente orquestrado com Docker.

## Funcionalidades Principais (v1.0)

* **Gerenciamento de Tarefas:**
    * Visualizar a lista de tarefas atuais (fornecida pela API própria).
    * Adicionar novas tarefas (com persistência no backend em memória).
* **Modo Pausa (API Pública):**
    * Consumir a `TheCatAPI` para buscar e exibir uma foto aleatória de um gato.
* **Recursos PWA:**
    * **Instalável:** O PWA é 100% instalável em dispositivos móveis e desktops (via `manifest.webmanifest`).
    * **Suporte Offline Básico:** O Service Worker armazena os assets principais em cache, permitindo que o aplicativo carregue mesmo sem internet.

## Arquitetura e Tecnologias

* **Backend:** Node.js com Express.js (e `cors`).
* **Frontend:** React 19 com Vite e TypeScript.
* **APIs:**
    * API RESTful própria para `GET /api/tasks` e `POST /api/tasks`.
    * Consumo de API pública (`TheCatAPI`).
* **Banco de Dados:** Simulado (Array em memória) para o MVP.
* **PWA:** Configuração completa com `manifest.webmanifest` e `Service Worker` (estratégia Cache-first para assets).
* **Testes:** Testes E2E com Playwright (configurados no projeto `web`).
* **Ambiente:** Docker e Docker Compose (orquestrando 2 serviços: `web` e `api`).

## Pré-requisitos

Para rodar este projeto em ambiente de desenvolvimento, você precisará ter instalado:

* [Node.js (v20+)](https://nodejs.org/) (para instalação das dependências)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Como Configurar e Rodar o Projeto

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/herethere04/bootcamp-final.git](https://github.com/herethere04/bootcamp-final.git)
    cd bootcamp-final
    ```

2.  **Instale as Dependências (API e Web):**
    É necessário instalar as dependências de ambos os projetos para que o Docker possa copiá-las corretamente.

    ```bash
    # Instalar dependências da API
    cd apps/api
    npm install
    
    # Instalar dependências do PWA
    cd ../web
    npm install
    ```

3.  **Construa e Inicie os Contêineres:**
    Volte para a pasta raiz (`bootcamp-final`) e execute o Docker Compose:
    ```bash
    cd ../..
    docker compose up --build
    ```
    O Docker irá construir as duas imagens (`api` e `web`) e iniciá-las.

## Acessando a Aplicação

* **PWA (Frontend):** Acesse `http://localhost:8080` no seu navegador.
* **Teste da API (Backend):** Acesse `http://localhost:3000/api/tasks` para ver o JSON das tarefas.
* **PWA Publicado (Online):** [https://herethere04.github.io/bootcamp-final/](https://herethere04.github.io/bootcamp-final/)

## Endpoints da API (v1.0)

* `GET /api/tasks`
    * Retorna a lista completa de tarefas.
* `POST /api/tasks`
    * Adiciona uma nova tarefa.
    * Corpo (JSON): `{ "text": "Minha nova tarefa" }`