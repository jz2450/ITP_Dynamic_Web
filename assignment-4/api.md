# API Documentation

## Introduction
This api is used to CRUD the json file stored on the server which saves text notes.

## Authentication
No auth needed

## Endpoints

### Endpoint 1
- Method: GET
- Path: /api
- Request Parameters: None
- Response Format: JSON
- Description: This endpoint retrieves all notes

### Endpoint 2
- Method: POST
- Path: /api
- Request Parameters: JSON body
- Response Format: JSON
- Description: This endpoint creates a new note

### Endpoint 3
- Method: PUT
- Path: /api/:id
- Request Parameters: JSON body
- Response Format: JSON
- Description: This endpoint edits a note with id: id

### Endpoint 4
- Method: DELETE
- Path: /api/:id
- Request Parameters: JSON body
- Response Format: JSON
- Description: This endpoint deletes a note with id: id

## Response Format
```
[
    {id: 4487912368750969, text: "note"}, 
    {id: 6028650150144846, text: "hello"}, 
    {id: 4053233215951741, text: "ok cool"}, 
    {id: 4420810912353971, text: "ok"}, 
    {id: 3139664108110466, text: "slay"}
]
```