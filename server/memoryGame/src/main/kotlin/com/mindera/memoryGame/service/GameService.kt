package com.mindera.memoryGame.service

import com.mindera.memoryGame.entity.CardEntity
import com.mindera.memoryGame.exceptions.AlreadyFlippedException
import com.mindera.memoryGame.repo.GameRepo
import org.springframework.stereotype.Service

@Service
class GameService(val gameRepo: GameRepo) {
    fun startGame() : Boolean{
        gameRepo.startGame()
        return true
    }

    fun getCard(indexOfCard : Int) : CardEntity? {
            gameRepo.getCard(indexOfCard)!!.setCardFlipped()

            return gameRepo.getCard(indexOfCard)

    }

    fun getAllCards() = gameRepo.getAllCards();

    fun restartGame() = gameRepo.restartGame();

}
