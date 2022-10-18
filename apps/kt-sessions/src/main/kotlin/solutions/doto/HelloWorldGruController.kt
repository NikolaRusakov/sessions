package solutions.doto
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get

@Controller("/gru")
class HelloWorldGruController {
    @Get
    fun index(): Map<String, Any> {
        return mapOf("message" to "Hello World")
    }
}
