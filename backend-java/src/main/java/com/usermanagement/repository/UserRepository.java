package com.usermanagement.repository;

import com.usermanagement.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    List<User> findByStatusTrue();

    Optional<User> findByIdAndStatusTrue(String id);
}
