package com.mindera.memoryGame.controller

import com.mindera.memoryGame.entity.CardEntity
import com.mindera.memoryGame.service.GameService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/game")
class GameController(val gameService : GameService) {


    @PostMapping
    fun startGame() : ResponseEntity<Boolean>{ return ResponseEntity.ok().body(gameService.startGame())}

    @GetMapping("/{indexOfCard}/{valueOfCurrCard}")
    fun checkCard(@PathVariable indexOfCard: Int,
                  @PathVariable valueOfCurrCard: Int) : Boolean {
        return gameService.getCard(indexOfCard, valueOfCurrCard)
    }
    @GetMapping("/{indexOfCard}")
    fun getCard(@PathVariable indexOfCard: Int) : CardEntity? {
        return gameService.getCard(indexOfCard)
    }

    @GetMapping
    fun getAllCards() : List<CardEntity>? {
                       return null
    }

}