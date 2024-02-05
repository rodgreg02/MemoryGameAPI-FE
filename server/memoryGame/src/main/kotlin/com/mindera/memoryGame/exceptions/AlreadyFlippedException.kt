package com.mindera.memoryGame.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(value = HttpStatus.FORBIDDEN)
class AlreadyFlippedException(message:String) : Exception(message) {
}