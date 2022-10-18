package solutions.doto
import com.agorapulse.gru.Gru
import io.micronaut.test.extensions.kotest.annotation.MicronautTest
import io.kotest.core.spec.style.StringSpec

@MicronautTest
class HelloWorldGruControllerTest(private val gru: Gru): StringSpec({

    "get hello message" {
        gru.verify { it
            .get("/gru")
            .expect { it.json("gruIndex.json") }
        }
    }
})