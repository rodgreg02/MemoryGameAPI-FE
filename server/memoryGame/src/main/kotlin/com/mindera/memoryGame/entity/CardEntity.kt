package com.mindera.memoryGame.entity



class CardEntity private constructor(builder : CardEntity.Builder){


    val value: Int?
    var flipped: Boolean = false

    init{
        this.value = builder.value
    }

    fun getCardValue() : Int? {
        return value
    }
    fun setCardFlipped(){
        this.flipped = !(this.flipped)
    }
    class Builder {

        var value : Int? = null
            private set
        fun value(value : Int) = apply {this.value = value}
        fun build() : CardEntity {return CardEntity(this)}
    }
}

