# ReMatter - API

## Description

The backend of this application, implemented with Next.js, PostgreSQL, and TypeORM, serves as the central hub for managing user data extracted from ID cards. Utilizing Next.js API routes, it efficiently handles incoming requests from the frontend, enabling essential functionalities such as storing, updating, and deleting records within the PostgreSQL database. Seamlessly integrated with Tesseract.js for streamlined optical character recognition, the backend swiftly processes ID card images submitted by users, extracting relevant information with precision. With a robust focus on data integrity and security, the backend ensures seamless communication between the database and frontend components, providing a reliable foundation for the application's operations.

## Installation

```bash
$ npm install
```

## Prerequisites

- Node: 16.18.0

## Running the app locally in development mode

setup `.env` file from `.env.example`

```
$ npm run start:dev
```
