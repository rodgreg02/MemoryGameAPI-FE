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

    fun getCard(indexOfCard : Int, valueOfCurrCard: Int) : Boolean{
        val checkCard = gameRepo.getCard(indexOfCard)
        if (checkCard != null) {
            return if(checkCard.getCardValue() == valueOfCurrCard){

                true
            }else{
                gameRepo.getCard(valueOfCurrCard)!!.setCardFlipped()
                false
            }
        }
        return false }

    fun getCard(indexOfCard : Int) : CardEntity? {
        if(!(gameRepo.getCard(indexOfCard)?.flipped)!!) {
            gameRepo.getCard(indexOfCard)!!.setCardFlipped()
            return gameRepo.getCard(indexOfCard)
        }
        else{
            throw AlreadyFlippedException("This card was already flipped!")
        }
    }

}