package com.leonfed.server.model;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;
import java.util.function.Supplier;

public class Response {
    private final HttpStatus status;
    private final Optional<JSONObject> json;

    public Response(HttpStatus status) {
        this.status = status;
        this.json = Optional.empty();
    }

    public Response(HttpStatus status, JSONObject json) {
        this.status = status;
        this.json = Optional.of(json);
    }

    public HttpStatus getStatus() {
        return status;
    }

    public Optional<JSONObject> getJson() {
        return json;
    }

    public ResponseEntity<?> toResponseEntity() {
        ResponseEntity.BodyBuilder responseBuilder = ResponseEntity.status(status);
        return json.map(JSONObject::toString).map(responseBuilder::body).orElseGet(responseBuilder::build);
    }

    @Override
    public String toString() {
        return "Response(" +
                "status = [" + status.toString() + "], " +
                "json = [" + json.toString() + "]" +
                ')';
    }
}
