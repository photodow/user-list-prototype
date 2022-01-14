package lifeway

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.annotation.Id
import org.springframework.web.bind.annotation.RestController
import org.springframework.data.relational.core.mapping.Table
import org.springframework.data.jdbc.repository.query.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.CrossOrigin
import java.util.Optional

@SpringBootApplication
class LifewayChallenge

interface UserRepository : CrudRepository<User, String>{ }

fun main(args: Array<String>) {
    runApplication<LifewayChallenge>(*args)
}

@Service
class UserService(val db: UserRepository) {

    // TODO: Validate, and return clear error messages

    fun findUsers(): List<User> {
        var store = db.findAll();
        var users = ArrayList<User>();

        store.forEach { users.add(it) };

				return users;
		}

    fun findUser(id: String): Optional<User> {
				return db.findById(id);
		}

    fun createUpdateUser (user: User): User {
        return db.save(user);
    }

    fun deleteUser(id: String) {
				db.deleteById(id);
		}
}

@CrossOrigin("http://localhost:3000")
@RestController
class UserResource(val service: UserService) {
		@GetMapping("/api/users")
    fun users(): List<User> = service.findUsers()

    @PostMapping("/api/user")
    fun createUser(@RequestBody user: User): User {
        return service.createUpdateUser(user)
    }

		@GetMapping("/api/user/{id}")
    fun user(@PathVariable id: String): Optional<User> = service.findUser(id)

    @DeleteMapping("/api/user/{id}")
    fun deleteUser(@PathVariable id: String) {
			service.deleteUser(id)
		}
}

@Table("USERS")
data class User(
	@Id val id: String?,
	val name: String,
	val email: String,
	val phone: String
)
