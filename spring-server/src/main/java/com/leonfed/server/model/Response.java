package com.leonfed.server.model;

import org.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Objects;
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
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Allow-Origin", "*");
        headers.add("Content-Type", "application/json");
        return json
                .map(jsonBody -> new ResponseEntity<>(jsonBody.toString(), headers, status))
                .orElseGet(() -> new ResponseEntity<>(headers, status));
    }

    @Override
    public String toString() {
        return "Response(" +
                "status = [" + status.toString() + "], " +
                "json = [" + json.toString() + "]" +
                ')';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Response response = (Response) o;
        return status == response.status && Objects.equals(json.toString(), response.json.toString());
    }
}
