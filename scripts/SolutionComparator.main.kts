#!/usr/bin/env kotlin

@file:Repository("https://repo1.maven.org/maven2/")
@file:DependsOn("org.jetbrains.kotlinx:kotlinx-serialization-json:1.3.3")
@file:DependsOn("com.charleskorn.kaml:kaml-jvm:0.46.0")

import com.charleskorn.kaml.EmptyYamlDocumentException
import com.charleskorn.kaml.Yaml
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import java.io.File
import java.util.*
import kotlin.io.path.Path
import kotlin.system.exitProcess

SolutionComparator().compare()

/**
 * Compares the inserted solutions in the solution.yaml file with the solutions stored in the VALID_SOLUTION environment variable.
 */
class SolutionComparator {

    companion object {
        private const val VALID_SOLUTION_ENV_KEY = "VALID_SOLUTION"
        private const val SOLUTION_FILE = "solutions.yaml"
        private const val COMPARISON_FILE = "result.json"
    }

    private val environmentSolutions: Map<String, String>
        get() {
            return try {
                Yaml.default.decodeFromString(
                    MapSerializer(String.serializer(), String.serializer()),
                    String(
                        Base64.getDecoder().decode(
                            (System.getenv(VALID_SOLUTION_ENV_KEY) ?: "").encodeToByteArray()
                        )
                    )
                )
            } catch (ex: EmptyYamlDocumentException) {
                println("Environment file is empty.")
                println("::warning file=solutions.yaml::Environment file is empty.")
                emptyMap()
            }
        }

    private val fileSolutions = Yaml.default.decodeFromStream(
        MapSerializer(String.serializer(), String.serializer()),
        Path(SOLUTION_FILE).toFile().inputStream()
    )

    fun compare() {
        println("Solution Comparator")
        println("Detected riddle answers: $fileSolutions")

        val correctSolutions = mutableMapOf<String, Boolean>()
        environmentSolutions.forEach() { solution ->
            if (fileSolutions.containsKey(solution.key)) {
                correctSolutions[solution.key] = fileSolutions[solution.key] == solution.value
            }
        }
        File(COMPARISON_FILE).writeText(Json.encodeToString(correctSolutions))

        if(correctSolutions.map { it.value }.any { !it }) {
            correctSolutions.filter { !it.value }.forEach { (riddle, _) ->
                println("The solution of $riddle is incorrect!")
                println("::error file=solutions.yaml::The solution of $riddle is incorrect!")
            }
            exitProcess(2)
        }
    }
}

