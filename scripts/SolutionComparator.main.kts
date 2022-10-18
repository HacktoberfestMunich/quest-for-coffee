#!/usr/bin/env kotlin

@file:Repository("https://repo1.maven.org/maven2/")
@file:DependsOn("org.jetbrains.kotlinx:kotlinx-serialization-json:1.3.3")
@file:DependsOn("com.charleskorn.kaml:kaml-jvm:0.46.0")

import com.charleskorn.kaml.Yaml
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import java.io.File
import java.io.IOException
import java.nio.charset.Charset
import java.util.*
import kotlin.io.path.Path
import kotlin.system.exitProcess

SolutionComparator().compare()

/**
 * Compares the inserted solutions in the solution.yaml file with the solutions stored in the VALID_SOLUTION environment variable.
 */
class SolutionComparator {

    companion object {
        private const val VALID_SOLUTION_FILE = "riddles/valid-solutions.yaml"
        private const val SOLUTION_FILE = "solutions.yaml"
        private const val COMPARISON_FILE = "result.json"
    }

    private val validSolutions: Map<String, String>
        get() {
            return try {
                val solutions = Yaml.default.decodeFromString(
                    MapSerializer(String.serializer(), String.serializer()),
                    String(
                        Base64.getDecoder().decode(
                            File(VALID_SOLUTION_FILE)
                                .readText(Charset.forName("UTF-8")).replace("\n", "").trim().toByteArray(Charset.forName("UTF-8"))
                        )
                    )
                )
                println("Read solutions for ${solutions.keys}.")
                solutions
            } catch (ex: IOException) {
                println("No valid solutions found.")
                println("::warning file=solutions.yaml::No valid solutions found.")
                emptyMap()
            }
        }

    private val fileSolutions = Yaml.default.decodeFromStream(
        MapSerializer(String.serializer(), String.serializer()),
        Path(SOLUTION_FILE).toFile().inputStream()
    )

    fun compare() {
        println("Solution Comparator")
        println("Answers to check: $fileSolutions")

        val correctSolutions = mutableMapOf<String, Boolean>()
        validSolutions.forEach() { solution ->
            if (fileSolutions.containsKey(solution.key)) {
                val correctValue = solution.value.lowercase()
                val userInput = fileSolutions[solution.key]?.lowercase();
                if (correctValue.startsWith("[") && correctValue.endsWith("]")) {
                    val correctValues = correctValue.substring(1, correctValue.length - 1).split(",")
                    correctSolutions[solution.key] = correctValues.contains(userInput)
                } else {
                    correctSolutions[solution.key] = userInput == correctValue
                }
            }
        }
        File(COMPARISON_FILE).writeText(Json.encodeToString(correctSolutions))

        if (correctSolutions.map { it.value }.any { !it }) {
            correctSolutions.filter { !it.value }.forEach { (riddle, _) ->
                println("The solution of $riddle is incorrect!")
                println("::error file=solutions.yaml::The solution of $riddle is incorrect!")
            }
            exitProcess(2)
        }
        println("Compare result: $correctSolutions")
    }
}
