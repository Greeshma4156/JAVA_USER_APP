package com.usermanagement.controller;

import com.usermanagement.dto.ApiResponse;
import com.usermanagement.model.User;
import com.usermanagement.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/user-api")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://localhost:5174",
                "https://user-management-app-nu-vert.vercel.app"
        },
        allowCredentials = "true"
)
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    // Test route
    @GetMapping("")
    public String testRoute() {
        return "API is running 🚀";
    }

    // Create User
    @PostMapping("/users")
    public ResponseEntity<ApiResponse<User>> createUser(@Valid @RequestBody User user) {
        // Enforce default status as true when creating
        if (user.getStatus() == null) {
            user.setStatus(true);
        }
        User savedUser = userRepository.save(user);
        ApiResponse<User> response = ApiResponse.<User>builder()
                .message("User Created")
                .payload(savedUser)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Read all Active Users
    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<User>>> getActiveUsers() {
        List<User> activeUsers = userRepository.findByStatusTrue();
        ApiResponse<List<User>> response = ApiResponse.<List<User>>builder()
                .message("Users")
                .payload(activeUsers)
                .build();
        return ResponseEntity.ok(response);
    }

    // Read an Active User by ID
    @GetMapping("/users/{id}")
    public ResponseEntity<ApiResponse<User>> getUserById(@PathVariable String id) {
        User user = userRepository.findByIdAndStatusTrue(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found"));
        ApiResponse<User> response = ApiResponse.<User>builder()
                .message("User found")
                .payload(user)
                .build();
        return ResponseEntity.ok(response);
    }

    // Soft Delete a User by ID (set status to false)
    @DeleteMapping("/users/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found"));
        user.setStatus(false);
        userRepository.save(user);
        ApiResponse<Void> response = ApiResponse.<Void>builder()
                .message("User removed")
                .build();
        return ResponseEntity.ok(response);
    }

    // Activate User by ID (set status to true)
    @PatchMapping("/users/{id}")
    public ResponseEntity<ApiResponse<User>> activateUser(@PathVariable String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found"));
        user.setStatus(true);
        User updatedUser = userRepository.save(user);
        ApiResponse<User> response = ApiResponse.<User>builder()
                .message("User activated")
                .payload(updatedUser)
                .build();
        return ResponseEntity.ok(response);
    }
}
