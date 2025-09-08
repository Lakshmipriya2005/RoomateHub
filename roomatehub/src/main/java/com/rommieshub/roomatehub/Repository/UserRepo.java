package com.rommieshub.roomatehub.Repository;




import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rommieshub.roomatehub.Entity.UserEntity;

//import loanapp.backend.Dtos.UserSecureDto;



public interface UserRepo extends JpaRepository<UserEntity, Long> {
    @Query(value = "SELECT * FROM users WHERE BINARY username = :username", nativeQuery = true)
    UserEntity findByUsername(@Param("username") String username);
    
    Optional<UserEntity> findByEmail(String email);


    @Query("SELECT u.id FROM UserEntity u WHERE u.username = :username")
    int getIdByName(String username);

}
