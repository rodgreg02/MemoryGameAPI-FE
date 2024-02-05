package com.mindera.memoryGame

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.RequestMapping

@SpringBootApplication
class MemoryGameApplication

fun main(args: Array<String>) {
	runApplication<MemoryGameApplication>(*args)
}
